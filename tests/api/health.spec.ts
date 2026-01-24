import { test, expect } from '@playwright/test';

test.describe('API - Mock Server', () => {
  test('@smoke GET /health returns ok', async ({ request }) => {
    const res = await request.get('/health');
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toEqual({ status: 'ok' });
  });
});
