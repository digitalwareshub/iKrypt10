import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';
import {
  checkRateLimit,
  createSecretLimiter,
  emailNotifyLimiter,
  getClientIp,
} from '@/lib/rateLimit';
import { isDisposableEmail, isValidEmail } from '@/lib/email';
import { generateSecretId } from '@/lib/crypto';
import { isValidCiphertext, isValidIv } from '@/lib/secretFormat';
import { recordUsage } from '@/lib/usageStats';

// Expiry options in milliseconds
const EXPIRY_MS: Record<string, number> = {
  '10m': 10 * 60 * 1000,
  '1h': 60 * 60 * 1000,
  '24h': 24 * 60 * 60 * 1000,
};

const ALLOWED_MAX_VIEWS = [1, 3, 5];

async function badRequest(error: string) {
  await recordUsage('rejectedInvalid');
  return NextResponse.json({ error }, { status: 400 });
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);

    const createLimit = await checkRateLimit(createSecretLimiter, ip);
    if (!createLimit.success) {
      await recordUsage('rejectedRateLimited');
      return NextResponse.json(
        { error: 'Too many secrets created. Please try again later.' },
        { status: 429 }
      );
    }

    let body: Record<string, unknown>;
    try {
      const parsed = await request.json();
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return await badRequest('Invalid request body');
      }
      body = parsed as Record<string, unknown>;
    } catch {
      return await badRequest('Invalid request body');
    }

    const { ciphertext, iv, expiry, maxViews, notifyEmail } = body;

    if (!isValidCiphertext(ciphertext) || !isValidIv(iv)) {
      return await badRequest('Missing, malformed or oversized encrypted content');
    }

    if (typeof expiry !== 'string' || !EXPIRY_MS[expiry]) {
      return await badRequest('Invalid expiry option');
    }

    if (typeof maxViews !== 'number' || !ALLOWED_MAX_VIEWS.includes(maxViews)) {
      return await badRequest('Invalid view limit');
    }

    let email: string | null = null;
    if (notifyEmail !== undefined && notifyEmail !== null && notifyEmail !== '') {
      const emailLimit = await checkRateLimit(emailNotifyLimiter, ip);
      if (!emailLimit.success) {
        await recordUsage('rejectedRateLimited');
        return NextResponse.json(
          { error: 'Too many notification requests. Please try again later.' },
          { status: 429 }
        );
      }
      if (!isValidEmail(notifyEmail)) {
        return await badRequest('Invalid email address');
      }
      if (isDisposableEmail(notifyEmail)) {
        return await badRequest('Disposable email addresses are not allowed');
      }
      email = notifyEmail;
    }

    const secretId = generateSecretId();
    const expiresAt = Timestamp.fromDate(new Date(Date.now() + EXPIRY_MS[expiry]));

    // Only ciphertext and the minimum metadata needed to enforce limits are
    // stored. The decryption key never reaches this server.
    await getAdminDb().collection('secrets').doc(secretId).set({
      ciphertext,
      iv,
      expiresAt,
      maxViews,
      viewCount: 0,
      firstAccessedAt: null,
      notifyEmail: email,
      notifiedAt: null,
      createdAt: Timestamp.now(),
    });

    await recordUsage(
      'created',
      `createdExpiry${expiry}` as 'createdExpiry10m' | 'createdExpiry1h' | 'createdExpiry24h',
      `createdViews${maxViews}` as 'createdViews1' | 'createdViews3' | 'createdViews5',
      ...(email ? (['createdWithNotify'] as const) : [])
    );

    return NextResponse.json({ secretId }, { status: 201 });
  } catch (error) {
    console.error('Error creating secret:', error);
    return NextResponse.json(
      { error: 'Failed to create secret. Please try again.' },
      { status: 500 }
    );
  }
}
