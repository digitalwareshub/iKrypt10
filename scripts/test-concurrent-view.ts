/**
 * Concurrency test for one-time secret delivery.
 *
 * Fires multiple simultaneous requests against a 1-view secret using the
 * exact same consumeSecretView() transaction the API route calls, and
 * asserts that exactly one request receives the ciphertext while all
 * others are rejected. Also verifies the document is deleted after the
 * final view and that a 3-view secret is consumed the correct number of
 * times under concurrency.
 *
 * Runs against the Firestore emulator only — never touches production.
 *
 * Usage: npm run test:concurrency
 * (spins up the emulator via `firebase emulators:exec`)
 *
 * Requires a JDK on PATH (the Firestore emulator runs on the JVM). If you
 * see "Unable to locate a Java Runtime", install one (e.g. `brew install
 * openjdk`) and either symlink it per brew's instructions or run:
 *   PATH="/opt/homebrew/opt/openjdk/bin:$PATH" npm run test:concurrency
 */
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { consumeSecretView } from '../src/lib/consumeSecretView';

if (!process.env.FIRESTORE_EMULATOR_HOST) {
  console.error(
    'FIRESTORE_EMULATOR_HOST is not set. Run this via `npm run test:concurrency`, ' +
      'which starts the emulator first.'
  );
  process.exit(1);
}

const app = initializeApp({ projectId: 'ikrypt-concurrency-test' });
const db = getFirestore(app);

async function seedSecret(id: string, maxViews: number) {
  await db
    .collection('secrets')
    .doc(id)
    .set({
      ciphertext: 'test-ciphertext',
      iv: 'test-iv',
      expiresAt: Timestamp.fromDate(new Date(Date.now() + 60_000)),
      maxViews,
      viewCount: 0,
      firstAccessedAt: null,
      notifyEmail: null,
      notifiedAt: null,
      createdAt: Timestamp.now(),
      creatorIpHash: 'test',
    });
}

async function testOneViewSecretUnderConcurrency() {
  const id = 'one-view-secret';
  await seedSecret(id, 1);

  const CONCURRENT_REQUESTS = 20;
  const results = await Promise.all(
    Array.from({ length: CONCURRENT_REQUESTS }, () =>
      consumeSecretView(db, id, new Date())
    )
  );

  const successes = results.filter((r) => r.ok);
  const failures = results.filter((r) => !r.ok);

  console.log(
    `[1-view secret] ${successes.length} succeeded, ${failures.length} failed ` +
      `out of ${CONCURRENT_REQUESTS} concurrent requests`
  );

  if (successes.length !== 1) {
    throw new Error(
      `Expected exactly 1 successful view of a 1-view secret, got ${successes.length}. ` +
        'The one-time-view guarantee is broken.'
    );
  }

  const finalDoc = await db.collection('secrets').doc(id).get();
  if (finalDoc.exists) {
    throw new Error(
      'Expected the secret document to be deleted after its final view, but it still exists.'
    );
  }

  console.log('[1-view secret] PASS — exactly one request succeeded, document deleted after final view.');
}

async function testThreeViewSecretUnderConcurrency() {
  const id = 'three-view-secret';
  const maxViews = 3;
  await seedSecret(id, maxViews);

  const CONCURRENT_REQUESTS = 20;
  const results = await Promise.all(
    Array.from({ length: CONCURRENT_REQUESTS }, () =>
      consumeSecretView(db, id, new Date())
    )
  );

  const successes = results.filter((r) => r.ok);

  console.log(
    `[3-view secret] ${successes.length} succeeded out of ${CONCURRENT_REQUESTS} concurrent requests ` +
      `(maxViews=${maxViews})`
  );

  if (successes.length !== maxViews) {
    throw new Error(
      `Expected exactly ${maxViews} successful views, got ${successes.length}. ` +
        'The view-limit guarantee is broken under concurrency.'
    );
  }

  const finalDoc = await db.collection('secrets').doc(id).get();
  if (finalDoc.exists) {
    throw new Error(
      'Expected the secret document to be deleted after its final (3rd) view, but it still exists.'
    );
  }

  console.log('[3-view secret] PASS — exactly 3 requests succeeded, document deleted after final view.');
}

async function testExpiredSecretIsRejected() {
  const id = 'expired-secret';
  await db
    .collection('secrets')
    .doc(id)
    .set({
      ciphertext: 'test-ciphertext',
      iv: 'test-iv',
      expiresAt: Timestamp.fromDate(new Date(Date.now() - 60_000)), // already expired
      maxViews: 1,
      viewCount: 0,
      firstAccessedAt: null,
      notifyEmail: null,
      notifiedAt: null,
      createdAt: Timestamp.now(),
      creatorIpHash: 'test',
    });

  const result = await consumeSecretView(db, id, new Date());

  if (result.ok) {
    throw new Error('Expected an expired secret to be rejected, but it was returned successfully.');
  }
  if (result.reason !== 'expired') {
    throw new Error(`Expected reason "expired", got "${result.reason}".`);
  }

  const finalDoc = await db.collection('secrets').doc(id).get();
  if (finalDoc.exists) {
    throw new Error('Expected the expired secret document to be deleted, but it still exists.');
  }

  console.log('[expired secret] PASS — rejected with reason "expired" and deleted.');
}

async function main() {
  await testOneViewSecretUnderConcurrency();
  await testThreeViewSecretUnderConcurrency();
  await testExpiredSecretIsRejected();
  console.log('\nAll concurrency tests passed.');
  process.exit(0);
}

main().catch((err) => {
  console.error('\nCONCURRENCY TEST FAILED:', err.message);
  process.exit(1);
});
