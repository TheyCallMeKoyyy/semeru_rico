const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * @description Mengakses halaman "Cara Bayar" dari navigasi utama.
 * @param {import('@playwright/test').Page} webApp - Instance halaman web Playwright.
 * @param {string} codeBooking - Kode booking (parameter tidak digunakan dalam fungsi).
 */

// Helper function to check booking
async function accessHowToPay(webApp, codeBooking) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to how to pay page',
    });
    await webApp.locator("xpath=(//a[normalize-space()='Cara Bayar'])[1]").click();

}

/**
 * @description Pengujian akses halaman "Cara Bayar" pada platform web.
 */

// Main test
test('Access How to Pay page', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: how to pay page',
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
    await accessHowToPay(webApp);
});
