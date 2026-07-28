import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4173';

export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: process.env.CI
        ? [['line'], ['html', { open: 'never', outputFolder: 'output/playwright/report' }]]
        : 'line',
    timeout: 90_000,
    expect: {
        timeout: 15_000,
    },
    outputDir: 'output/playwright/test-results',
    use: {
        baseURL,
        serviceWorkers: 'block',
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
    },
    webServer: {
        command:
            'yarn build:e2e && cross-env NODE_PORT=4173 NODE_ENV=production node server.js',
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
    ],
});
