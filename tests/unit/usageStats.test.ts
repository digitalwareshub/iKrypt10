import { test } from 'node:test';
import assert from 'node:assert/strict';

// No Firebase credentials and no emulator in this process: getAdminDb()
// throws. recordUsage must swallow that and resolve, so a metrics outage
// can never break secret creation or reveal.
delete process.env.FIRESTORE_EMULATOR_HOST;
delete process.env.FIREBASE_ADMIN_PROJECT_ID;
delete process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
delete process.env.FIREBASE_ADMIN_PRIVATE_KEY;

test('recordUsage never throws when the database is unavailable', async () => {
  const { recordUsage } = await import('../../src/lib/usageStats');
  const originalError = console.error;
  let logged = 0;
  console.error = () => {
    logged++;
  };
  try {
    await assert.doesNotReject(recordUsage('created', 'createdViews1'));
    await assert.doesNotReject(recordUsage());
  } finally {
    console.error = originalError;
  }
  assert.equal(logged, 1, 'the failure is logged once, not silently ignored');
});

test('usage fields are fixed names with no room for identifiers', async () => {
  const { USAGE_FIELDS } = await import('../../src/lib/usageStats');
  for (const field of USAGE_FIELDS) {
    assert.match(field, /^[a-zA-Z0-9]+$/);
  }
  assert.equal(new Set(USAGE_FIELDS).size, USAGE_FIELDS.length);
});
