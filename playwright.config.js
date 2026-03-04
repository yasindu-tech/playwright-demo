const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    timeout: 30000,
    reporter: [
        ['html', { open: 'never' }],
        ['list'],
        ['json', { outputFile: 'test-results/results.json' }]
    ],
    use: {
        baseURL: 'http://localhost:3000',
        headless: !!process.env.CI,        // Set true for CI
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    webServer: {
        command: 'node app.js',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
    },
});
