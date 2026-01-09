import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import {
  checkRateLimit,
  createSecretLimiter,
  emailNotifyLimiter,
  getClientIp,
  hashIp,
} from '@/lib/rateLimit';
import { isDisposableEmail, isValidEmail } from '@/lib/email';
import { generateSecretId } from '@/lib/crypto';

// Expiry options in milliseconds
const EXPIRY_MS: Record<string, number> = {
  '10m': 10 * 60 * 1000,
  '1h': 60 * 60 * 1000,
  '24h': 24 * 60 * 60 * 1000,
};

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);

    // Rate limit check for secret creation
    const createLimit = await checkRateLimit(createSecretLimiter, ip);
    if (!createLimit.success) {
      return NextResponse.json(
        { error: 'Too many secrets created. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { ciphertext, iv, expiry, maxViews, notifyEmail } = body;

    // Validate required fields
    if (!ciphertext || !iv) {
      return NextResponse.json(
        { error: 'Missing encrypted content' },
        { status: 400 }
      );
    }

    // Validate expiry
    if (!expiry || !EXPIRY_MS[expiry]) {
      return NextResponse.json(
        { error: 'Invalid expiry option' },
        { status: 400 }
      );
    }

    // Validate maxViews
    if (!maxViews || ![1, 3, 5].includes(maxViews)) {
      return NextResponse.json(
        { error: 'Invalid view limit' },
        { status: 400 }
      );
    }

    // Validate email if provided
    if (notifyEmail) {
      // Rate limit check for email notifications
      const emailLimit = await checkRateLimit(emailNotifyLimiter, ip);
      if (!emailLimit.success) {
        return NextResponse.json(
          { error: 'Too many notification requests. Please try again later.' },
          { status: 429 }
        );
      }

      if (!isValidEmail(notifyEmail)) {
        return NextResponse.json(
          { error: 'Invalid email address' },
          { status: 400 }
        );
      }

      if (isDisposableEmail(notifyEmail)) {
        return NextResponse.json(
          { error: 'Disposable email addresses are not allowed' },
          { status: 400 }
        );
      }
    }

    // Generate secret ID
    const secretId = generateSecretId();

    // Calculate expiry timestamp
    const expiresAt = Timestamp.fromDate(
      new Date(Date.now() + EXPIRY_MS[expiry])
    );

    // Hash IP for storage (privacy)
    const hashedIp = await hashIp(ip);

    // Store secret in Firestore
    // NOTE: We store ONLY the ciphertext, never the key
    const secretRef = doc(collection(db, 'secrets'), secretId);
    await setDoc(secretRef, {
      ciphertext,
      iv,
      expiresAt,
      maxViews,
      viewCount: 0,
      firstAccessedAt: null,
      notifyEmail: notifyEmail || null,
      notifiedAt: null,
      createdAt: Timestamp.now(),
      creatorIpHash: hashedIp,
    });

    return NextResponse.json({ secretId }, { status: 201 });
  } catch (error) {
    console.error('Error creating secret:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to create secret: ${message}` },
      { status: 500 }
    );
  }
}
