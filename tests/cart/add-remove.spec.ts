import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from '../../utils/auth';

test.describe('Cart - Add & Remove (Sauce Demo)', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('Add "Sauce Labs Backpack" to cart and then remove it', async ({ page }) => {
    const itemName = 'Sauce Labs Backpack';

    // Inventory에서 특정 아이템 카드 찾기 (이름 기반)
    const item = page.locator('.inventory_item').filter({
      has: page.locator('.inventory_item_name', { hasText: itemName }),
    });

    // Add to cart 클릭
    await item.locator('button:has-text("Add to cart")').click();

    // 장바구니 배지(숫자) 확인: 1
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');

    // Cart 페이지로 이동
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/\/cart\.html$/);

    // Cart에 해당 아이템이 존재하는지 확인
    await expect(page.locator('.inventory_item_name', { hasText: itemName })).toBeVisible();

    // Remove 클릭 (Cart 화면에서)
    await page.locator('button:has-text("Remove")').click();

    // 배지가 사라져야 함(0이면 배지 자체가 없어지는 UI)
    await expect(cartBadge).toHaveCount(0);

    // 아이템도 사라져야 함
    await expect(page.locator('.inventory_item_name', { hasText: itemName })).toHaveCount(0);
  });
});
