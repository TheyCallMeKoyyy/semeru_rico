const { config } = require('../../config');
const { test, expect } = require('../setup');


// Helper function to check booking
async function accessPrivacyPolicy(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Privacy and Policy',
    });
    await webApp.locator("xpath=//a[normalize-space()='Kebijakan Privasi']").click();

     //Expect the page to have text Metode Pembayaran
    await expect(webApp.locator('h3:text("kebijakan privasi") >> nth=0')).toBeVisible();

}


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
