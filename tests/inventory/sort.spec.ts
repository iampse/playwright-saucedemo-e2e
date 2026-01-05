import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from '../../utils/auth';

test.describe('Inventory - Sorting (Sauce Demo)', () => {
  test.beforeEach(async ({ page }) => {
    // 로그인 (SUT: https://www.saucedemo.com)
    await loginAsStandardUser(page);
  });

  test('Sort by Price (low to high) changes the first and last item price correctly', async ({ page }) => {
    const sortDropdown = page.locator('[data-test="product-sort-container"]');

    // 정렬: 가격 낮은순
    await sortDropdown.selectOption('lohi');

    // 아이템 가격 목록 수집
    const pricesText = await page.locator('.inventory_item_price').allTextContents();
    const prices = pricesText.map((t) => Number(t.replace('$', '').trim()));
    expect(prices.every(Number.isFinite)).toBeTruthy();

    // 최소한 2개 이상 있어야 정렬 검증 의미가 있음
    expect(prices.length).toBeGreaterThan(1);

    // 정렬 검증: 오름차순
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }

    // 추가 검증: 첫 값은 최소, 마지막 값은 최대
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    expect(prices[0]).toBe(min);
    expect(prices[prices.length - 1]).toBe(max);
  });

  test('Sort by Name (Z to A) results in a descending lexicographical order', async ({ page }) => {
    const sortDropdown = page.locator('[data-test="product-sort-container"]');

    // 정렬: 이름 Z->A
    await sortDropdown.selectOption('za');
    await expect(sortDropdown).toHaveValue('za'); //드롭다운 값이 실제로 바뀌었는지 검증   

    // 상품명 목록 수집
    const names = await page.locator('.inventory_item_name').allTextContents();
    expect(names.length).toBeGreaterThan(1);

    // 정렬 검증: 내림차순(사전 역순)
    for (let i = 1; i < names.length; i++) {
      // localeCompare: a.compare(b) > 0 이면 a가 b보다 뒤(=더 큼)
      expect(names[i - 1].localeCompare(names[i])).toBeGreaterThanOrEqual(0);
    }
  });
});
