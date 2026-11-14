import { expect, test } from '@playwright/test';

/**
 * Verifies analytics redaction against Vercel's REAL client scripts.
 *
 * `next start` does not serve /_vercel/* (only Vercel's edge does), so this
 * test downloads the current scripts from the live site and serves them
 * locally, then captures the beacons they send. Skipped when offline.
 */
const LIVE = 'https://ikrypt.com';
const SENSITIVE = 'SHOULD_NOT_LEAK_k3y';

let insightsJs: string | null = null;
let speedJs: string | null = null;

test.beforeAll(async () => {
  try {
    const [a, b] = await Promise.all([
      fetch(`${LIVE}/_vercel/insights/script.js`),
      fetch(`${LIVE}/_vercel/speed-insights/script.js`),
    ]);
    if (a.ok && b.ok) [insightsJs, speedJs] = await Promise.all([a.text(), b.text()]);
  } catch {
    // offline
  }
});

test('analytics events never carry fragments, query strings, or secret routes', async ({ page }) => {
  test.skip(!insightsJs || !speedJs, 'Could not download Vercel analytics scripts (offline?)');

  // Vercel's script skips automated browsers (navigator.webdriver). Mask it so
  // the real beacon logic runs.
  await page.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, 'webdriver', { get: () => false });
  });

  const beacons: { url: string; body: string }[] = [];
  const scriptLoads: string[] = [];

  // Playwright tries the most recently registered route first, so the
  // catch-all beacon collector is registered before the script routes.
  await page.route('**/_vercel/**', async (route) => {
    const req = route.request();
    if (req.method() === 'POST') beacons.push({ url: req.url(), body: req.postData() ?? '' });
    await route.fulfill({ status: 200, body: '' });
  });
  await page.route('**/_vercel/insights/script.js', (route) => {
    scriptLoads.push(page.url());
    return route.fulfill({ contentType: 'application/javascript', body: insightsJs! });
  });
  await page.route('**/_vercel/speed-insights/script.js', (route) =>
    route.fulfill({ contentType: 'application/javascript', body: speedJs! })
  );

  // 1. Marketing page with a fragment and query string: event must be redacted.
  await page.goto(`/about?token=${SENSITIVE}#k=${SENSITIVE}`);
  await expect.poll(() => beacons.length, { timeout: 10_000 }).toBeGreaterThan(0);
  expect(scriptLoads.length).toBe(1);

  // 2. Client-side navigation from a marketing page to the homepage (where
  //    secrets are typed): the already-loaded script must drop the event.
  const before = beacons.length;
  await page.evaluate(() => window.history.pushState({}, '', '/#k=SHOULD_NOT_LEAK_k3y'));
  await page.evaluate(() => window.history.pushState({}, '', '/s/AAAAAAAAAAAAAAAA#k=SHOULD_NOT_LEAK_k3y'));
  await page.waitForTimeout(1500);
  const afterNav = beacons.slice(before);

  for (const b of beacons) {
    expect(b.body, `beacon to ${b.url}`).not.toContain(SENSITIVE);
    expect(b.body).not.toContain('#k=');
  }
  for (const b of afterNav) {
    const payload = JSON.parse(b.body || '{}');
    const urls = [payload.o, payload.href, ...(Array.isArray(payload) ? payload.map((p: { href?: string }) => p.href) : [])];
    for (const u of urls.filter(Boolean)) {
      expect(new URL(u).pathname).not.toMatch(/^\/($|s\/|sent)/);
    }
  }

  // 3. Direct load of a secret page: the analytics script is never requested.
  const loadsBefore = scriptLoads.length;
  await page.goto(`/s/AAAAAAAAAAAAAAAA#k=${SENSITIVE}`);
  await page.waitForLoadState('networkidle');
  expect(scriptLoads.length).toBe(loadsBefore);
});
