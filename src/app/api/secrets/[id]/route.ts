import { after, NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';
import { consumeSecretView, type SecretData } from '@/lib/consumeSecretView';
import { checkRateLimit, viewSecretLimiter, getClientIp } from '@/lib/rateLimit';
import { sendSecretViewedEmail } from '@/lib/email';
import { isValidSecretId } from '@/lib/secretFormat';
import { recordUsage } from '@/lib/usageStats';

const NO_STORE = { 'Cache-Control': 'no-store, max-age=0' };

type RouteContext = { params: Promise<{ id: string }> };

function notFound() {
  return NextResponse.json(
    { error: 'This secret does not exist or is no longer available', reason: 'expired_or_viewed' },
    { status: 404, headers: NO_STORE }
  );
}

async function rateLimited(request: NextRequest) {
  const ip = getClientIp(request.headers);
  const limit = await checkRateLimit(viewSecretLimiter, ip);
  return !limit.success;
}

/**
 * GET — non-consuming status check.
 *
 * Tells the recipient's page whether the secret can still be revealed,
 * WITHOUT using up a view and without returning ciphertext. Link scanners and
 * prefetchers that load the page therefore cannot burn a one-time secret.
 */
export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    if (await rateLimited(request)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: NO_STORE }
      );
    }

    const { id: secretId } = await params;
    if (!isValidSecretId(secretId)) return notFound();

    const snap = await getAdminDb().collection('secrets').doc(secretId).get();
    if (!snap.exists) return notFound();

    const data = snap.data() as SecretData;
    const expiresAt = data.expiresAt.toDate();
    if (new Date() > expiresAt || data.viewCount >= data.maxViews) {
      return NextResponse.json(
        { error: 'This secret is no longer available', reason: 'expired' },
        { status: 410, headers: NO_STORE }
      );
    }

    return NextResponse.json(
      {
        status: 'available',
        viewsRemaining: data.maxViews - data.viewCount,
        maxViews: data.maxViews,
        expiresAt: expiresAt.toISOString(),
      },
      { headers: NO_STORE }
    );
  } catch (error) {
    console.error('Error checking secret status:', error);
    return NextResponse.json(
      { error: 'Failed to check secret' },
      { status: 500, headers: NO_STORE }
    );
  }
}

/**
 * POST — reveal. Atomically consumes one view and returns the ciphertext.
 * Only called after the recipient explicitly presses "Reveal".
 */
export async function POST(request: NextRequest, { params }: RouteContext) {
  try {
    if (await rateLimited(request)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: NO_STORE }
      );
    }

    const { id: secretId } = await params;
    if (!isValidSecretId(secretId)) {
      await recordUsage('unavailableNotFound');
      return notFound();
    }

    const accessedAt = new Date();
    const adminDb = getAdminDb();
    const result = await consumeSecretView(adminDb, secretId, accessedAt);

    if (!result.ok) {
      await recordUsage(
        result.reason === 'expired'
          ? 'unavailableExpired'
          : result.reason === 'max_views_reached'
            ? 'unavailableMaxViews'
            : 'unavailableNotFound'
      );
      return NextResponse.json(
        { error: result.error, reason: result.reason },
        { status: result.status, headers: NO_STORE }
      );
    }

    const { data, newViewCount, isFirstAccess } = result;
    const viewsRemaining = data.maxViews - newViewCount;

    await recordUsage('revealed', ...(viewsRemaining === 0 ? (['finalViewDeleted'] as const) : []));

    // Notification runs after the response via `after()`, which keeps the
    // serverless invocation alive until it completes (unlike a bare promise).
    if (isFirstAccess && data.notifyEmail && !data.notifiedAt) {
      const to = data.notifyEmail;
      after(async () => {
        const sent = await sendSecretViewedEmail({ to, secretId, accessedAt, viewsRemaining });
        if (sent.success && viewsRemaining > 0) {
          await adminDb
            .collection('secrets')
            .doc(secretId)
            .update({ notifiedAt: Timestamp.fromDate(new Date()) })
            .catch((err) => console.error('Failed to record notifiedAt:', err));
        }
      });
    }

    return NextResponse.json(
      {
        ciphertext: data.ciphertext,
        iv: data.iv,
        viewCount: newViewCount,
        maxViews: data.maxViews,
        expiresAt: data.expiresAt.toDate().toISOString(),
      },
      { headers: NO_STORE }
    );
  } catch (error) {
    console.error('Error revealing secret:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve secret' },
      { status: 500, headers: NO_STORE }
    );
  }
}
