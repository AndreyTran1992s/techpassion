import { test, expect } from '@playwright/test';

test.describe('Tech Passion E2E Suite (Multi-Language, Features & Security)', () => {
  test('1. Multi-Language Synchronization (EN -> VI -> ZH), Full-Width Single-Row Menu & Zero RSS', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    const mainNav = page.locator('header nav').nth(1);

    // Verify default language is English (EN) & Nav spans 100% on 1 single row
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByText('BREAKING NEWS').first()).toBeVisible();
    const enNavBox = await mainNav.boundingBox();
    expect(enNavBox).not.toBeNull();
    expect(enNavBox!.height).toBeLessThanOrEqual(52);

    // Verify RSS has been completely removed
    await expect(page.locator('a[href="/rss.xml"]')).toHaveCount(0);

    // Switch to Vietnamese (VI) & verify single-row full-width Menu (no wrapping or right-side gap)
    await page.getByRole('button', { name: 'VI', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
    await expect(page.getByText('TIN NÓNG IT').first()).toBeVisible();
    await expect(page.getByText('Thiết Kế & Phát Triển Web').first()).toBeVisible();
    const viNavBox = await mainNav.boundingBox();
    expect(viNavBox!.height).toBeLessThanOrEqual(52);
    expect(viNavBox!.width).toBeGreaterThanOrEqual(1170);

    // Switch to Chinese (ZH - 中文) & verify single-row full-width Menu (no right-side gap)
    await page.getByRole('button', { name: '中文', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh');
    await expect(page.getByText('科技头条').first()).toBeVisible();
    const zhNavBox = await mainNav.boundingBox();
    expect(zhNavBox!.height).toBeLessThanOrEqual(52);
    expect(zhNavBox!.width).toBeGreaterThanOrEqual(1170);

    // Switch back to English (EN)
    await page.getByRole('button', { name: 'EN', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('2. Navigation across Tricks, Tips, E-Books & Multi-Language Persistence', async ({ page }) => {
    await page.goto('/tricks');

    // Switch to Vietnamese on /tricks and verify localized header
    await page.getByRole('button', { name: 'VI', exact: true }).click();
    await expect(page.locator('h1')).toContainText('Thủ Thuật');

    // Navigate to E-Books and verify Vietnamese language persists automatically
    await page.goto('/ebooks');
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
    await expect(page.locator('h1')).toContainText('Thư Viện');
  });

  test('3. HTTP Security Headers, Anti-Bot Honeypot & Admin CMS Gatekeeper', async ({ page }) => {
    const response = await page.goto('/product-services');
    expect(response).not.toBeNull();

    // Verify Security Headers configured in next.config.ts
    const headers = response!.headers();
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['content-security-policy']).toBeDefined();

    // Verify Honeypot hidden field exists in Service Booking Form
    const honeypotInput = page.locator('input[name="company_website_url_check"]');
    await expect(honeypotInput).toHaveCount(1);

    // Verify Admin CMS Login Gatekeeper protects /admin
    await page.goto('/admin');
    const mainArea = page.getByRole('main');
    await expect(mainArea.locator('input[type="email"]')).toBeVisible();
    await expect(mainArea.locator('input[type="password"]')).toBeVisible();

    // Authenticate as Admin and verify access to CMS Dashboard
    await mainArea.locator('input[type="email"]').fill('admin@techpassion.dev');
    await mainArea.locator('input[type="password"]').fill('Admin@TechPassion2026');
    await mainArea.locator('button[type="submit"]').click();

    await expect(page.getByText('admin@techpassion.dev').first()).toBeVisible();
  });
});
