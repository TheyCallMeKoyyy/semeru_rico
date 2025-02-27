const { config } = require('../../config');
const { test, expect } = require('../setup');



async function accessAboutUs(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Blog Page',
    });

    expect (webApp.locator("css=div[id='navbar'] li:nth-child(2) a:nth-child(1)")).toBeVisible()
    await webApp.locator("css=div[id='navbar'] li:nth-child(2) a:nth-child(1)").click()
    
    //Expect the page to have text tentang
    await expect(webApp.locator('h1:text("Blog")')).toBeVisible();
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