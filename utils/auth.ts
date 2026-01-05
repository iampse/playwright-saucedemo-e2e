import { expect, type Page } from '@playwright/test';

export async function loginAsStandardUser(page: Page) {
  await page.goto('/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // 로그인 성공을 공통 헬퍼에서 한 번만 보장
  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
}