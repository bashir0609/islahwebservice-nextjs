import { dev } from 'astro';
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
// Developer-tool shadow DOM is not site content and contaminates screenshots/heading audits.
const server = await dev({ root: process.cwd(), devToolbar: { enabled: false }, server: { host: '127.0.0.1', port: 4329 } });
let browser;
const deadline = setTimeout(() => { console.error('Browser check exceeded 80 seconds'); process.exit(1); }, 80000);
try {
  // Use the full Chromium download, not the optional headless-shell artifact.
  browser = await chromium.launch({ executablePath: chromium.executablePath(), headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    return url.hostname === '127.0.0.1' ? route.continue() : route.abort();
  });
  const origin = 'http://127.0.0.1:4329';
  const routes = ['/', '/services', '/pricing', '/request-sample', '/cold-email-marketing', '/industries/saas', '/privacy-policy'];
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of routes) {
      const res = await page.goto(origin + path);
      assert.equal(res.status(), 200, path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      assert.equal(overflow, false, `${path} overflows at ${width}px`);
      assert.equal(await page.locator('h1').count(), 1, `${path} at ${width}px: ${JSON.stringify(await page.locator('h1').allTextContents())}`);
    }
  }
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto(origin);
  await page.locator('.mobile-nav summary').click();
  assert.ok(await page.locator('.mobile-nav nav a').first().isVisible());
  await page.locator('.mobile-nav summary').click();
  for (const path of ['/', '/request-sample', '/pricing', '/cold-email-marketing']) {
    await page.goto(origin + path);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    assert.deepEqual(results.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), [], `${path}: accessibility violations`);
  }
  await page.goto(origin);
  await page.locator('.faq summary').first().click();
  assert.ok(await page.locator('.faq details').first().getAttribute('open') !== null);
  await page.goto(origin + '/request-sample');
  await page.waitForFunction(() => !document.querySelector('astro-island[ssr]'));
  await page.getByRole('textbox', { name: 'Name', exact: false }).fill('Preview Example');
  await page.getByRole('textbox', { name: 'Business email' }).fill('preview@example.test');
  await page.getByRole('textbox', { name: 'Tell us about your project' }).fill('Fictional local research request for validation only.');
  await page.getByRole('checkbox').check();
  const reply = page.waitForResponse(r => r.url().endsWith('/api/research') && r.request().method() === 'POST');
  await page.getByRole('button', { name: 'Submit preview enquiry' }).click();
  assert.equal((await reply).status(), 200);
  await page.getByRole('status').filter({ hasText: 'Mock validation complete' }).waitFor();
  const missing = await page.goto(origin + '/definitely-missing-preview-route');
  assert.equal(missing.status(), 404);
  assert.deepEqual(errors, []);
  await mkdir('artifacts', { recursive: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(origin);
  await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await page.locator('.hero-copy').evaluate(el => getComputedStyle(el).animationName), 'none');
    assert.equal(await page.locator('.dashboard-shell').evaluate(el => getComputedStyle(el).transform), 'none');
  await page.screenshot({ path: 'artifacts/home-desktop.png', fullPage: true });
  await page.locator('.hero-frame').screenshot({ path: 'artifacts/hero-desktop.png' });
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.screenshot({ path: 'artifacts/home-tablet.png', fullPage: true });
  await page.locator('.hero-frame').screenshot({ path: 'artifacts/hero-tablet.png' });
  await page.setViewportSize({ width: 375, height: 900 });
  await page.screenshot({ path: 'artifacts/home-mobile.png', fullPage: true });
  await page.locator('.hero-frame').screenshot({ path: 'artifacts/hero-mobile.png' });
  console.log('PASS: 35 route/viewport checks; menu, FAQ, local mock form, missing-route 404; zero browser exceptions; axe WCAG A/AA checks on four routes. External requests blocked.');
} finally {
  clearTimeout(deadline);
  await browser?.close();
  await server.stop();
}
