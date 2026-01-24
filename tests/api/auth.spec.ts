import { test, expect } from '@playwright/test';

test.describe('API - Auth (Mock API)', () => {
  test('@smoke POST /auth/login succeeds with valid credentials', async ({ request }) => {
    const res = await request.post('/auth/login', {
      data: { username: 'standard_user', password: 'secret_sauce' },
    });

    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toEqual({
      token: 'mock-token',
      user: { username: 'standard_user' },
    });
  });

  test('POST /auth/login fails with invalid credentials', async ({ request }) => {
    const res = await request.post('/auth/login', {
      data: { username: 'standard_user', password: 'wrong_password' },
    });

    expect(res.status()).toBe(401);

    const body = await res.json();
    expect(body.error.code).toBe('INVALID_CREDENTIALS');
    expect(body.error.message).toContain('Username and password');
  });

  test('POST /auth/login returns 400 on invalid payload', async ({ request }) => {
    const res = await request.post('/auth/login', {
      data: { username: 123, password: true },
    });

    expect(res.status()).toBe(400);

    const body = await res.json();
    expect(body.error.code).toBe('VALIDATION_ERROR');
  });
});
