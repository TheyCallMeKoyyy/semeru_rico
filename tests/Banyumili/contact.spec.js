
/**
 * @description Test script untuk mengakses halaman Contact Us pada website.
 * Menggunakan Playwright dan Allure untuk dokumentasi langkah-langkah otomatisasi.
 */

const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * @description Fungsi untuk membuka halaman Contact Us.
 * @param {object} webApp - Objek dari Playwright yang merepresentasikan aplikasi web.
 */

// Helper function to check booking
async function accessContactUs(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to contact us page',
    });

    const contactPath = webApp.locator("xpath=(//a[@class='nav-link '][normalize-space()='Kontak'])[1]")

    await contactPath.click();
    await contactPath.click();

}

/**
 * @description Pengujian utama untuk memastikan halaman Contact Us dapat diakses.
 */

// Main test
test('Access contact page', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: contact us page',
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

    // Start the access airpot shuttle
    await accessContactUs(webApp);
});
