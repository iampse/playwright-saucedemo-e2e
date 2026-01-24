import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // 기본 파일은 테스트하지 않는다
  testIgnore: ['**/_legacy/**'],

  // 포트폴리오 #1은 "안정 + 재현성" 중심
  fullyParallel: true,
  workers: 2,
  retries: 1,

  // 실행 산출물 관리: 실패 증거만 남기고, 성공 실행은 정리
  preserveOutput: 'failures-only',

  // 리포트는 html로 만들되 자동 오픈은 하지 않음 (필요 시 show-report)
  reporter: [['html', { open: 'never' }]],

  // 공통 옵션: baseURL은 프로젝트별로 다르게 가져가므로 여기서는 제거
  use: {
    headless: true,

    // 실패 분석 "증거물" 세트
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',

    actionTimeout: 10_000,
    navigationTimeout: 20_000,
  },

  projects: [
    // =========================
    // UI Tests (Sauce Demo)
    // =========================
    {
      name: 'ui-chromium',
      testDir: './tests', // UI는 기존 tests 폴더
      testIgnore: ['**/_legacy/**', '**/api/**'], // API 테스트는 UI 프로젝트에서 제외
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
      },
    },

    // =========================
    // API Tests (Mock API)
    // =========================
    {
      name: 'api',
      testDir: './tests/api', // API는 여기만 실행
      use: {
        baseURL: process.env.MOCK_API_BASE_URL || 'http://localhost:3001',
      },
    },
  ],

  // Mock API 서버는 테스트 전에 자동 기동
  webServer: {
    command: 'npm --prefix mock-api run dev',
    url: 'http://localhost:3001/health',
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000,
  },
});
