const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * @description Mengakses halaman "Tentang Kami" dari menu navigasi.
 * @param {import('@playwright/test').Page} webApp - Instance halaman web Playwright.
 */

async function accessAboutUs(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to About Us Page',
    });

    expect (webApp.locator("xpath=(//a[@class='nav-link '][normalize-space()='Tentang Kami'])[1]")).toBeVisible()
    await webApp.locator("xpath=(//a[@class='nav-link '][normalize-space()='Tentang Kami'])[1]").click()
    
}

/**
 * @description Pengujian akses ke halaman Tentang Kami menggunakan Playwright.
 */

test('to access About Us Page', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Access to about us',
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

    // Start to access about us
    await accessAboutUs(webApp);
});