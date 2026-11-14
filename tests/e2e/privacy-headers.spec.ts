import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { cspViolations } from './helpers';

const SECRET_PAGES = ['/', '/sent', '/s/AAAAAAAAAAAAAAAA'];
const MARKETING_PAGES = [
  '/about',
  '/security',
  '/privacy',
  '/terms',
  '/contact',
  '/blog',
  '/blog/password-sharing-mistakes',
  '/share-password-securely',
  '/send-api-key-securely',
  '/share-env-file-securely',
  '/one-time-secret-link',
];

test.describe('secret pages', () => {
  for (const path of SECRET_PAGES) {
    test(`${path} uses a strict nonce CSP, no-store, and loads no analytics`, async ({ page }) => {
      const violations = cspViolations(page);
      const scripts: string[] = [];
      page.on('request', (r) => {
        if (r.resourceType() === 'script' || r.url().includes('/_vercel/')) scripts.push(r.url());
      });
      const res = await page.goto(path);
      const csp = res!.headers()['content-security-policy'];
      expect(csp).toMatch(/script-src 'self' 'nonce-[A-Za-z0-9+/=]+' 'strict-dynamic'/);
      expect(csp.split(';').find((d) => d.trim().startsWith('script-src'))).not.toContain(
        'unsafe-inline'
      );
      expect(res!.headers()['cache-control']).toContain('no-store');
      await page.waitForLoadState('networkidle');
      expect(scripts.filter((s) => s.includes('/_vercel/'))).toEqual([]);
      expect(scripts.every((s) => new URL(s).origin === new URL(page.url()).origin)).toBe(true);
      expect(violations).toEqual([]);
    });
  }
});

test.describe('marketing pages', () => {
  for (const path of MARKETING_PAGES) {
    test(`${path} renders without CSP violations or serious a11y issues`, async ({ page }) => {
      const violations = cspViolations(page);
      const res = await page.goto(path);
      expect(res!.status()).toBe(200);
      await page.waitForLoadState('networkidle');
      expect(violations).toEqual([]);
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
      const serious = axe.violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''));
      expect(
        serious.map((v) => `${v.id}: ${v.nodes.length} node(s) — ${v.help}`),
        `axe serious/critical on ${path}`
      ).toEqual([]);
    });
  }
});

test('contact form can reach Formspree (not blocked by CSP)', async ({ page }) => {
  let submitted = false;
  await page.route('https://formspree.io/**', async (route) => {
    submitted = true;
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  const violations = cspViolations(page);
  await page.goto('/contact');
  await page.getByLabel(/name/i).first().fill('E2E Test');
  await page.getByLabel(/email/i).first().fill('e2e@example.com');
  await page.locator('select#subject').selectOption('general');
  await page.getByLabel(/message/i).first().fill('Automated test message — please ignore.');
  await page.getByRole('button', { name: /send/i }).click();
  await expect.poll(() => submitted).toBe(true);
  expect(violations).toEqual([]);
});
