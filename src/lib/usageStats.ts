import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/lib/firebaseAdmin';

/**
 * Privacy-safe product metrics: one Firestore document per UTC day
 * (`usageStats/{YYYY-MM-DD}`) holding aggregate counters only.
 * No secret IDs, IP addresses, emails, user agents or content are recorded.
 *
 * Counter failures are logged and swallowed; metrics must never break the
 * product.
 */
export type UsageEvent =
  | 'created'
  | 'createdExpiry10m'
  | 'createdExpiry1h'
  | 'createdExpiry24h'
  | 'createdViews1'
  | 'createdViews3'
  | 'createdViews5'
  | 'createdWithNotify'
  | 'rejectedInvalid'
  | 'rejectedRateLimited'
  | 'revealed'
  | 'finalViewDeleted'
  | 'unavailableExpired'
  | 'unavailableMaxViews'
  | 'unavailableNotFound';

export const USAGE_FIELDS: readonly UsageEvent[] = [
  'created',
  'createdExpiry10m',
  'createdExpiry1h',
  'createdExpiry24h',
  'createdViews1',
  'createdViews3',
  'createdViews5',
  'createdWithNotify',
  'rejectedInvalid',
  'rejectedRateLimited',
  'revealed',
  'finalViewDeleted',
  'unavailableExpired',
  'unavailableMaxViews',
  'unavailableNotFound',
];

/** Increments one or more daily counters in a single write. */
export async function recordUsage(...events: UsageEvent[]): Promise<void> {
  if (events.length === 0) return;
  try {
    const day = new Date().toISOString().slice(0, 10);
    const update: Record<string, unknown> = { day };
    for (const event of events) update[event] = FieldValue.increment(1);
    await getAdminDb().collection('usageStats').doc(day).set(update, { merge: true });
  } catch (error) {
    console.error('Failed to record usage metric:', error);
  }
}
