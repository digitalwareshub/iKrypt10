import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end tests run against a production build (`next start`) backed by
 * the Firestore emulator. Run via `npm run test:e2e`, which starts the
 * emulator and sets FIRESTORE_EMULATOR_HOST; the app then uses a `demo-`
 * project and skips Upstash/Resend (see src/lib/runtimeEnv.ts).
 *
 * Uses the locally installed Google Chrome (`channel: 'chrome'`) so no
 * browser download is needed. In CI, `npx playwright install chromium`
 * and set PW_CHANNEL=chromium.
 */
const PORT = 3100;
const channel = process.env.PW_CHANNEL === 'chromium' ? undefined : 'chrome';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  timeout: 45_000,
  use: {
    baseURL: `http://localhost:${PORT}`,
    channel,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop-chrome', use: { ...devices['Desktop Chrome'], channel } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'], channel } },
  ],
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}/about`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
