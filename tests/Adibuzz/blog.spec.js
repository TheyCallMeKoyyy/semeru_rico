const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * @description Mengakses halaman "Blog" dari menu navigasi.
 * @param {import('@playwright/test').Page} webApp - Instance halaman web Playwright.
 */

async function accessAboutUs(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Blog Page',
    });

    const blogPath = webApp.locator("xpath=(//a[@class='nav-link '][normalize-space()='Blog'])[1]")
    await blogPath.isVisible()
    await blogPath.click()
    
}

/**
 * @description Pengujian akses ke halaman Blog menggunakan Playwright.
 */

test('to access Blog Page', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Access to blog',
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