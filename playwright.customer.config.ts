import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/Customer-Web',
  timeout: 30 * 1000,
  use: {
    headless: false,
    baseURL: 'https://customer-qa.deliverit.net.in',
    trace: 'on-first-retry',
    viewport: { width: 1366, height: 768 },
    ignoreHTTPSErrors: true,
  },
  reporter: [['html', { open: 'never' }]],

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
