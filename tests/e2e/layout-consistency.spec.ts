import { expect, test, type Page } from '@playwright/test';

/**
 * The site header must be identical on every page (same height, same links
 * in the same positions), be the only sticky bar at the top, and stay put
 * while scrolling and navigating. Regression test for the "dancing" header.
 */
const PAGES = [
  '/',
  '/security',
  '/about',
  '/privacy',
  '/terms',
  '/contact',
  '/blog',
  '/blog/password-sharing-mistakes',
  '/share-password-securely',
  '/send-api-key-securely',
  '/share-env-file-securely',
  '/one-time-secret-link',
  '/healthcare',
  '/this-page-does-not-exist',
];

async function headerGeometry(page: Page) {
  return page.evaluate(() => {
    // The site header is a direct child of <body>; <article> headers inside
    // blog posts are legitimate and not counted.
    const headers = document.querySelectorAll('body > header');
    const h = headers[0];
    const r = h.getBoundingClientRect();
    const links = [...h.querySelectorAll('a, button')]
      .filter((el) => (el as HTMLElement).offsetParent !== null)
      .map((el) => `${el.textContent?.trim()}@${Math.round(el.getBoundingClientRect().left)}`);
    const stickyTopBars = [...document.querySelectorAll('body *')].filter((el) => {
      const cs = getComputedStyle(el);
      return (cs.position === 'sticky' || cs.position === 'fixed') && el.getBoundingClientRect().top < 120 && el.tagName !== 'ASIDE';
    }).length;
    // Position of the breadcrumb's first link (visible text), not its box.
    const crumb = document.querySelector('nav[aria-label="Breadcrumb"] a');
    return {
      count: headers.length,
      height: Math.round(r.height),
      links: links.join(' '),
      stickyTopBars,
      breadcrumbY: crumb ? Math.round(crumb.getBoundingClientRect().top + window.scrollY) : null,
      breadcrumbX: crumb ? Math.round(crumb.getBoundingClientRect().left) : null,
      logoX: Math.round(h.querySelector('a')!.getBoundingClientRect().left),
    };
  });
}

test('header is identical on every page and is the only sticky top bar', async ({ page }) => {
  let reference: Awaited<ReturnType<typeof headerGeometry>> | null = null;
  const breadcrumbYs = new Set<number>();
  for (const path of PAGES) {
    await page.goto(path);
    const g = await headerGeometry(page);
    expect(g.count, `${path}: exactly one header`).toBe(1);
    expect(g.stickyTopBars, `${path}: only the header is sticky at the top`).toBe(1);
    if (g.breadcrumbY !== null) breadcrumbYs.add(g.breadcrumbY);
    if (g.breadcrumbX !== null) expect(g.breadcrumbX, `${path}: breadcrumb aligned with logo`).toBe(g.logoX);
    if (!reference) reference = g;
    expect({ height: g.height, links: g.links }, `${path} header differs from ${PAGES[0]}`).toEqual({
      height: reference.height,
      links: reference.links,
    });
  }
  const ys = [...breadcrumbYs];
  expect(Math.max(...ys) - Math.min(...ys), `breadcrumbs sit at different heights: ${ys}`).toBeLessThanOrEqual(2);
});

test('header stays at the top while scrolling and across client-side navigation', async ({ page }) => {
  await page.goto('/about');
  const before = await headerGeometry(page);
  await page.mouse.wheel(0, 1500);
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => Math.round(document.querySelector('body > header')!.getBoundingClientRect().top))).toBe(0);
  for (const label of ['Security', 'Blog', 'How it works']) {
    const nav = page.getByRole('navigation', { name: 'Main' }).first();
    if (await nav.isVisible()) {
      await nav.getByRole('link', { name: label }).click();
    } else {
      await page.getByRole('button', { name: /open menu/i }).click();
      await page.locator('#mobile-menu').getByRole('link', { name: label }).click();
    }
    await page.waitForLoadState('networkidle');
    const g = await headerGeometry(page);
    expect({ height: g.height, links: g.links }, `after clicking ${label}`).toEqual({
      height: before.height,
      links: before.links,
    });
  }
});

test('"On this page" side menus stay visible below the header while scrolling', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'mobile-chrome', 'Side menus are desktop-only');
  for (const path of ['/security', '/privacy', '/terms']) {
    await page.goto(path);
    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.waitForTimeout(300);
    const r = await page.evaluate(() => {
      const aside = [...document.querySelectorAll('aside')].find((a) => getComputedStyle(a).position === 'sticky');
      const hdr = document.querySelector('body > header')!.getBoundingClientRect();
      return { asideTop: aside ? Math.round(aside.getBoundingClientRect().top) : null, headerBottom: Math.round(hdr.bottom) };
    });
    expect(r.asideTop, `${path}: sticky side menu exists`).not.toBeNull();
    expect(r.asideTop!, `${path}: side menu stuck below the header`).toBeGreaterThanOrEqual(r.headerBottom);
  }
});

test('secret-flow pages use their focused layout without the site header', async ({ page }) => {
  for (const path of ['/sent', '/s/AAAAAAAAAAAAAAAA']) {
    await page.goto(path);
    expect(await page.locator('header nav[aria-label="Main"]').count(), path).toBe(0);
  }
});
