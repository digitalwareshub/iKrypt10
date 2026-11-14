import { expect, type Page, type Request } from '@playwright/test';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export const PLAINTEXT_MARKER = 'sk_test_IKRYPT_E2E_marker_51HxYz';

/** Direct emulator access for assertions and for simulating expiry. */
export function emulatorDb() {
  if (!process.env.FIRESTORE_EMULATOR_HOST) {
    throw new Error('E2E tests must run against the Firestore emulator (npm run test:e2e).');
  }
  const app = getApps()[0] ?? initializeApp({ projectId: 'demo-ikrypt' });
  return getFirestore(app);
}

/**
 * Records every request a page makes so tests can assert that nothing
 * leaves the origin and nothing carries the key or plaintext.
 */
export function recordRequests(page: Page) {
  const requests: Request[] = [];
  page.on('request', (r) => requests.push(r));
  return requests;
}

export function cspViolations(page: Page) {
  const violations: string[] = [];
  page.on('console', (msg) => {
    const text = msg.text();
    // Only genuine CSP violations. (Locally, `next start` does not serve
    // Vercel's /_vercel/* scripts, which produces unrelated MIME-type errors.)
    if (/Content Security Policy/i.test(text)) violations.push(text);
  });
  return violations;
}

/** Creates a secret through the real UI and returns the full share link. */
export async function createSecretViaUi(
  page: Page,
  { text = PLAINTEXT_MARKER, views = 1 }: { text?: string; views?: 1 | 3 | 5 } = {}
): Promise<string> {
  await page.goto('/');
  await page.getByPlaceholder(/paste a password/i).fill(text);
  if (views !== 1) {
    await page.getByRole('radio', { name: `${views} times` }).check();
  }
  await page.getByRole('button', { name: /create link/i }).click();
  await page.waitForURL('**/sent');
  const link = (await page.locator('code').first().textContent())?.trim() ?? '';
  expect(link).toMatch(/\/s\/[A-Za-z0-9_-]{16}#k=[A-Za-z0-9_-]{43}$/);
  return link;
}

export function splitLink(link: string) {
  const url = new URL(link);
  const id = url.pathname.split('/').pop()!;
  const key = new URLSearchParams(url.hash.slice(1)).get('k')!;
  return { url, id, key, path: url.pathname + url.hash };
}

/** Asserts no request went off-origin or contained the key or plaintext. */
export function assertNoLeaks(requests: Request[], origin: string, secrets: string[]) {
  for (const r of requests) {
    const u = r.url();
    expect.soft(new URL(u).origin, `off-origin request: ${u}`).toBe(origin);
    expect.soft(u, 'analytics request on a secret page').not.toContain('/_vercel/');
    const body = r.postData() ?? '';
    for (const s of secrets) {
      expect.soft(u.includes(s), `request URL contains sensitive value: ${u}`).toBe(false);
      expect.soft(body.includes(s), `request body contains sensitive value: ${u}`).toBe(false);
    }
  }
}
