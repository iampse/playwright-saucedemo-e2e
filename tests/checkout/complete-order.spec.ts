import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from '../../utils/auth';

test.describe('Checkout - Complete Order (Sauce Demo)', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('Complete checkout flow with a single item (Backpack)', async ({ page }) => {
    const itemName = 'Sauce Labs Backpack';

    // 1) Inventory에서 Backpack 추가
    const item = page.locator('.inventory_item').filter({
      has: page.locator('.inventory_item_name', { hasText: itemName }),
    });
    await item.locator('button:has-text("Add to cart")').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // 2) Cart로 이동
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(page.locator('.inventory_item_name', { hasText: itemName })).toBeVisible();

    // 3) Checkout 시작
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);

    // 4) 사용자 정보 입력 (고정 테스트 데이터)
    await page.locator('[data-test="firstName"]').fill('Test');
    await page.locator('[data-test="lastName"]').fill('User');
    await page.locator('[data-test="postalCode"]').fill('10101');
    await page.locator('[data-test="continue"]').click();

    // 5) Overview 확인
    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(page.locator('.inventory_item_name', { hasText: itemName })).toBeVisible();

    // (선택) 총액/세금 영역이 표시되는지 정도만 확인 (금액 고정 검증은 불안정할 수 있어 최소화)
    await expect(page.locator('.summary_info')).toBeVisible();

    // 6) Finish → 완료 확인
    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(/\/checkout-complete\.html$/);

    await expect(page.locator('.complete-header')).toContainText(/Thank you for your order/i);
  });
});
