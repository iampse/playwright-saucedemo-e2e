import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // 포트폴리오 #1은 "안정 + 재현성" 중심
  fullyParallel: true,
  workers: 2,
  retries: 1,

  // 실행 산출물 관리: 실패 증거만 남기고, 성공 실행은 정리
  preserveOutput: 'failures-only',

  // 리포트는 html로 만들되 자동 오픈은 하지 않음 (필요 시 show-report)
  reporter: [['html', { open: 'never' }]],

  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,

    // 실패 분석 "증거물" 세트
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',

    actionTimeout: 10_000,
    navigationTimeout: 20_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
