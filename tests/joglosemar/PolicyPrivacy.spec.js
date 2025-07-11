const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * @description Mengakses halaman Syarat & Ketentuan tiket melalui tautan di website.
 * @param {import('@playwright/test').Page} webApp - Instance halaman web Playwright.
 */

// Helper function to check booking
async function accessPrivacyPolicy(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Privacy and Policy',
    });
    await webApp.locator("xpath=(//a[normalize-space()='Syarat & Ketentuan Tiket'])[1]").click();
}

/**
 * @description Pengujian untuk mengakses halaman Kebijakan Privasi & Syarat Ketentuan.Tiket
 */

// Main test
test('to Access Privacy Policy Page', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Privacy and Policy',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'severity: normal',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'platform: web',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'status: pass',
    });

    // Start the Change Payment Method process
    await accessPrivacyPolicy(webApp);
});
