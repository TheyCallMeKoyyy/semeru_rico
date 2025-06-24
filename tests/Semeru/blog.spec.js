const { config } = require('../../config');
const { test, expect } = require('../setup');

async function accessAboutUs(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Blog Page',
    });

    const blogPath = webApp.locator("xpath=//a[normalize-space()='Blog']")

    await blogPath.isVisible()
    await blogPath.click()
    
    //Expect the page to have text tentang
    await expect(webApp.locator('h3:text("Berita")')).toBeVisible();
}

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