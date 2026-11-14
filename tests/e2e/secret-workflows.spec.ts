import { expect, test } from '@playwright/test';
import { Timestamp } from 'firebase-admin/firestore';
import { USAGE_FIELDS } from '../../src/lib/usageStats';
import {
  PLAINTEXT_MARKER,
  assertNoLeaks,
  createSecretViaUi,
  cspViolations,
  emulatorDb,
  recordRequests,
  splitLink,
} from './helpers';

test.describe('create → share → reveal', () => {
  test('one-time secret: opening does not consume, Reveal does, second open is unavailable', async ({
    page,
    context,
    baseURL,
  }) => {
    const csp = cspViolations(page);
    const createRequests = recordRequests(page);
    const link = await createSecretViaUi(page);
    const { id, key, path } = splitLink(link);

    // Sender side: nothing sensitive left the browser.
    assertNoLeaks(createRequests, baseURL!, [key, PLAINTEXT_MARKER]);
    const stored = await emulatorDb().collection('secrets').doc(id).get();
    expect(stored.exists).toBe(true);
    expect(JSON.stringify(stored.data())).not.toContain(PLAINTEXT_MARKER);
    expect(stored.data()).not.toHaveProperty('creatorIpHash');

    // A "link scanner" loads the page but never clicks Reveal.
    const scanner = await context.newPage();
    await scanner.goto(path);
    await expect(scanner.getByRole('button', { name: /reveal secret/i })).toBeVisible();
    await scanner.close();
    expect((await emulatorDb().collection('secrets').doc(id).get()).data()?.viewCount).toBe(0);

    // The real recipient.
    const recipient = await context.newPage();
    const recipientCsp = cspViolations(recipient);
    const recipientRequests = recordRequests(recipient);
    await recipient.goto(path);
    await expect(recipient.getByRole('button', { name: /reveal secret/i })).toBeVisible();
    // Key removed from the address bar and history entry.
    expect(new URL(recipient.url()).hash).toBe('');
    await recipient.getByRole('button', { name: /reveal secret/i }).click();
    await expect(recipient.locator('pre')).toHaveText(PLAINTEXT_MARKER);
    await expect(recipient.getByText(/final view/i)).toBeVisible();
    assertNoLeaks(recipientRequests, baseURL!, [key, PLAINTEXT_MARKER]);

    // Document deleted on the final view.
    expect((await emulatorDb().collection('secrets').doc(id).get()).exists).toBe(false);

    // Re-opening the same link.
    const again = await context.newPage();
    await again.goto(path);
    await expect(again.getByRole('heading', { name: /no longer available/i })).toBeVisible();

    expect(csp, 'CSP violations on create/sent pages').toEqual([]);
    expect(recipientCsp, 'CSP violations on reveal page').toEqual([]);
  });

  test('three-view secret allows exactly three reveals', async ({ page, context }) => {
    const link = await createSecretViaUi(page, { views: 3 });
    const { path } = splitLink(link);

    for (let i = 1; i <= 3; i++) {
      const p = await context.newPage();
      await p.goto(path);
      await p.getByRole('button', { name: /reveal secret/i }).click();
      await expect(p.locator('pre')).toHaveText(PLAINTEXT_MARKER);
      await expect(
        p.getByText(i === 3 ? /final view/i : new RegExp(`View ${i} of 3`))
      ).toBeVisible();
      await p.close();
    }

    const fourth = await context.newPage();
    await fourth.goto(path);
    await expect(fourth.getByRole('heading', { name: /no longer available/i })).toBeVisible();
  });

  test('truncated key is rejected before anything is consumed', async ({ page, context }) => {
    const link = await createSecretViaUi(page);
    const { id, url } = splitLink(link);
    const truncated = `${url.pathname}#k=${url.hash.slice(3, 30)}`;

    const p = await context.newPage();
    const requests = recordRequests(p);
    await p.goto(truncated);
    await expect(p.getByRole('heading', { name: /incomplete link/i })).toBeVisible();
    expect(requests.filter((r) => r.url().includes('/api/secrets'))).toHaveLength(0);
    expect((await emulatorDb().collection('secrets').doc(id).get()).data()?.viewCount).toBe(0);
  });

  test('missing key shows guidance and consumes nothing', async ({ page, context }) => {
    const link = await createSecretViaUi(page);
    const { id, url } = splitLink(link);
    const p = await context.newPage();
    await p.goto(url.pathname);
    await expect(p.getByRole('heading', { name: /missing decryption key/i })).toBeVisible();
    expect((await emulatorDb().collection('secrets').doc(id).get()).data()?.viewCount).toBe(0);
  });

  test('expired secret is unavailable and cannot be revealed', async ({ page, context, request }) => {
    const link = await createSecretViaUi(page);
    const { id, path } = splitLink(link);
    await emulatorDb()
      .collection('secrets')
      .doc(id)
      .update({ expiresAt: Timestamp.fromDate(new Date(Date.now() - 1000)) });

    const p = await context.newPage();
    await p.goto(path);
    await expect(p.getByRole('heading', { name: /no longer available/i })).toBeVisible();

    const reveal = await request.post(`/api/secrets/${id}`);
    expect(reveal.status()).toBe(410);
    expect(await reveal.text()).not.toContain('ciphertext');
  });

  test('a tampered key fails to decrypt with a clear message', async ({ page, context }) => {
    const link = await createSecretViaUi(page);
    const { url, key } = splitLink(link);
    const tamperedKey = (key[0] === 'A' ? 'B' : 'A') + key.slice(1);
    const p = await context.newPage();
    await p.goto(`${url.pathname}#k=${tamperedKey}`);
    await p.getByRole('button', { name: /reveal secret/i }).click();
    await expect(p.getByText(/could not be decrypted/i)).toBeVisible();
  });
});

test.describe('API hardening', () => {
  test('status check (GET) never consumes a view or returns ciphertext', async ({ page, request }) => {
    const link = await createSecretViaUi(page);
    const { id } = splitLink(link);
    for (let i = 0; i < 3; i++) {
      const res = await request.get(`/api/secrets/${id}`);
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body).not.toHaveProperty('ciphertext');
      expect(res.headers()['cache-control']).toContain('no-store');
    }
    expect((await emulatorDb().collection('secrets').doc(id).get()).data()?.viewCount).toBe(0);
  });

  test('rejects malformed, oversized and mistyped payloads', async ({ request }) => {
    const valid = { ciphertext: 'AAAA', iv: 'AAAAAAAAAAAAAAAA', expiry: '1h', maxViews: 1 };
    const cases: [string, unknown][] = [
      ['not json', 'not-json'],
      ['array body', [1, 2]],
      ['object ciphertext', { ...valid, ciphertext: { a: 1 } }],
      ['oversized ciphertext', { ...valid, ciphertext: 'A'.repeat(100_000) }],
      ['bad iv', { ...valid, iv: 'short' }],
      ['bad expiry', { ...valid, expiry: '7d' }],
      ['string views', { ...valid, maxViews: '1' }],
      ['bad email', { ...valid, notifyEmail: 'nope' }],
      ['object email', { ...valid, notifyEmail: { x: 1 } }],
    ];
    for (const [name, body] of cases) {
      const res = await request.post('/api/secrets', {
        data: typeof body === 'string' ? body : JSON.stringify(body),
        headers: { 'content-type': 'application/json' },
      });
      expect(res.status(), name).toBe(400);
      expect(await res.text(), name).not.toMatch(/firebase|credential|stack/i);
    }
  });

  test('invalid IDs return 404 without touching the database', async ({ request }) => {
    for (const id of ['short', '../../etc', 'x'.repeat(200)]) {
      expect((await request.get(`/api/secrets/${encodeURIComponent(id)}`)).status()).toBe(404);
      expect((await request.post(`/api/secrets/${encodeURIComponent(id)}`)).status()).toBe(404);
    }
  });

  test('usage counters are aggregate only', async ({ page }) => {
    await createSecretViaUi(page);
    const day = new Date().toISOString().slice(0, 10);
    const stats = (await emulatorDb().collection('usageStats').doc(day).get()).data()!;
    expect(stats.created).toBeGreaterThan(0);
    expect(stats.createdExpiry24h).toBeGreaterThan(0);
    expect(stats.createdViews1).toBeGreaterThan(0);
    const allowed = new Set<string>(['day', ...USAGE_FIELDS]);
    for (const field of Object.keys(stats)) expect(allowed.has(field), field).toBe(true);
  });
});
