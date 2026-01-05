import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from '../../utils/auth';

test.describe('Auth - Sauce Demo', () => {
  test('Login succeeds with valid credentials (standard_user)', async ({ page }) => {
    // baseURL이 config에 있으므로 '/'만으로 충분함
    // Target application: https://www.saucedemo.com => Defined "playwright.config.ts"
    await loginAsStandardUser(page);

    // 검증: inventory 화면의 핵심 요소가 보여야 함
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
  });

  test('Login fails with invalid credentials', async ({ page }) => {
    await page.goto('/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('wrong_password');
    await page.locator('[data-test="login-button"]').click();

    // 검증: 에러 메시지 노출
    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText(/Username and password do not match|Epic sadface/i);

    // 검증: 실패 시 여전히 로그인 페이지에 머무름
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });
});
