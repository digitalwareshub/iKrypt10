import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';
import { consumeSecretView } from '@/lib/consumeSecretView';
import {
  checkRateLimit,
  viewSecretLimiter,
  getClientIp,
} from '@/lib/rateLimit';
import { sendSecretViewedEmail } from '@/lib/email';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ip = getClientIp(request.headers);
    const { id: secretId } = await params;

    // Rate limit check
    const viewLimit = await checkRateLimit(viewSecretLimiter, ip);
    if (!viewLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const accessedAt = new Date();
    const adminDb = getAdminDb();
    const result = await consumeSecretView(adminDb, secretId, accessedAt);

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error, reason: result.reason },
        { status: result.status }
      );
    }

    const { data, newViewCount, isFirstAccess } = result;

    // Send notification email if configured and this is first access
    if (isFirstAccess && data.notifyEmail && !data.notifiedAt) {
      // Send email asynchronously (don't block response)
      sendSecretViewedEmail({
        to: data.notifyEmail,
        secretId: secretId,
        accessedAt,
      })
        .then(() => {
          // Only update notifiedAt if the document still exists (it won't,
          // if this was also the final view and got deleted above).
          if (newViewCount < data.maxViews) {
            adminDb
              .collection('secrets')
              .doc(secretId)
              .update({ notifiedAt: Timestamp.fromDate(new Date()) })
              .catch(console.error);
          }
        })
        .catch(console.error);
    }

    // Return ciphertext and IV (client will decrypt with key from URL fragment)
    return NextResponse.json({
      ciphertext: data.ciphertext,
      iv: data.iv,
      viewCount: newViewCount,
      maxViews: data.maxViews,
      expiresAt: data.expiresAt.toDate().toISOString(),
    });
  } catch (error) {
    console.error('Error retrieving secret:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve secret' },
      { status: 500 }
    );
  }
}
