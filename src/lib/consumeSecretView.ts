import type { Firestore, Transaction } from 'firebase-admin/firestore';
import { Timestamp } from 'firebase-admin/firestore';

export interface SecretData {
  ciphertext: string;
  iv: string;
  expiresAt: Timestamp;
  maxViews: number;
  viewCount: number;
  firstAccessedAt: Timestamp | null;
  notifyEmail: string | null;
  notifiedAt: Timestamp | null;
}

export type ConsumeSecretViewResult =
  | { ok: true; data: SecretData; newViewCount: number; isFirstAccess: boolean }
  | { ok: false; status: number; error: string; reason: string };

/**
 * Atomically reads, validates, and reserves/consumes a single view of a
 * one-time secret. Runs inside a Firestore transaction so concurrent
 * requests cannot both receive a one-view secret: Firestore aborts and
 * retries a transaction if the document was modified since it was read,
 * so only one of two racing requests can ever win the final `tx.update`
 * or `tx.delete` on the same document version.
 */
export async function consumeSecretView(
  db: Firestore,
  secretId: string,
  accessedAt: Date
): Promise<ConsumeSecretViewResult> {
  const secretRef = db.collection('secrets').doc(secretId);

  return db.runTransaction(async (tx: Transaction) => {
    const secretSnap = await tx.get(secretRef);

    if (!secretSnap.exists) {
      return {
        ok: false,
        status: 404,
        error: 'Secret not found',
        reason: 'expired_or_viewed',
      };
    }

    const data = secretSnap.data() as SecretData;
    const now = new Date();
    const expiresAt = data.expiresAt.toDate();

    if (now > expiresAt) {
      tx.delete(secretRef);
      return {
        ok: false,
        status: 410,
        error: 'This secret has expired',
        reason: 'expired',
      };
    }

    if (data.viewCount >= data.maxViews) {
      tx.delete(secretRef);
      return {
        ok: false,
        status: 410,
        error: 'This secret has already been viewed the maximum number of times',
        reason: 'max_views_reached',
      };
    }

    const newViewCount = data.viewCount + 1;
    const isFirstAccess = data.firstAccessedAt === null;

    if (newViewCount >= data.maxViews) {
      // Final allowed view — delete inside the same transaction instead of
      // relying on a post-response setTimeout, which is not guaranteed to
      // run on a serverless platform.
      tx.delete(secretRef);
    } else {
      tx.update(secretRef, {
        viewCount: newViewCount,
        ...(isFirstAccess && { firstAccessedAt: Timestamp.fromDate(accessedAt) }),
      });
    }

    return { ok: true, data, newViewCount, isFirstAccess };
  });
}
