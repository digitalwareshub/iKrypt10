import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';
import {
  checkRateLimit,
  viewSecretLimiter,
  getClientIp,
} from '@/lib/rateLimit';
import { sendSecretViewedEmail } from '@/lib/email';

interface SecretData {
  ciphertext: string;
  iv: string;
  expiresAt: Timestamp;
  maxViews: number;
  viewCount: number;
  firstAccessedAt: Timestamp | null;
  notifyEmail: string | null;
  notifiedAt: Timestamp | null;
}

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

    // Get secret from Firestore
    const secretRef = doc(db, 'secrets', secretId);
    const secretSnap = await getDoc(secretRef);

    if (!secretSnap.exists()) {
      return NextResponse.json(
        {
          error: 'Secret not found',
          reason: 'expired_or_viewed',
        },
        { status: 404 }
      );
    }

    const data = secretSnap.data() as SecretData;

    // Check if expired
    const now = new Date();
    const expiresAt = data.expiresAt.toDate();

    if (now > expiresAt) {
      // Delete expired secret
      await deleteDoc(secretRef);
      return NextResponse.json(
        {
          error: 'This secret has expired',
          reason: 'expired',
        },
        { status: 410 }
      );
    }

    // Check if max views reached
    if (data.viewCount >= data.maxViews) {
      // Delete viewed secret
      await deleteDoc(secretRef);
      return NextResponse.json(
        {
          error: 'This secret has already been viewed the maximum number of times',
          reason: 'max_views_reached',
        },
        { status: 410 }
      );
    }

    // Increment view count
    const newViewCount = data.viewCount + 1;
    const isFirstAccess = data.firstAccessedAt === null;
    const accessedAt = new Date();

    // Update document
    await updateDoc(secretRef, {
      viewCount: newViewCount,
      ...(isFirstAccess && { firstAccessedAt: Timestamp.fromDate(accessedAt) }),
    });

    // Send notification email if configured and this is first access
    if (isFirstAccess && data.notifyEmail && !data.notifiedAt) {
      // Send email asynchronously (don't block response)
      sendSecretViewedEmail({
        to: data.notifyEmail,
        secretId: secretId,
        accessedAt: accessedAt,
      })
        .then(() => {
          // Update notifiedAt timestamp
          updateDoc(secretRef, {
            notifiedAt: Timestamp.fromDate(new Date()),
          }).catch(console.error);
        })
        .catch(console.error);
    }

    // If this was the last allowed view, delete after returning
    if (newViewCount >= data.maxViews) {
      // Use setTimeout to delete after response is sent
      setTimeout(async () => {
        try {
          await deleteDoc(secretRef);
        } catch (err) {
          console.error('Error deleting secret after final view:', err);
        }
      }, 1000);
    }

    // Return ciphertext and IV (client will decrypt with key from URL fragment)
    return NextResponse.json({
      ciphertext: data.ciphertext,
      iv: data.iv,
      viewCount: newViewCount,
      maxViews: data.maxViews,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    console.error('Error retrieving secret:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve secret' },
      { status: 500 }
    );
  }
}
