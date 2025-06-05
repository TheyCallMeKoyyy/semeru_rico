const { config } = require('../../config');
const { test, expect } = require('../setup');



// Helper function to check booking
async function accessContactUs(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to contact us page',
    });

    const contactPath = webApp.locator("xpath=//a[normalize-space()='Kontak']")

    await contactPath.click();
    await contactPath.click();

     //Expect the page to have text Antar Jemput bandara
    await expect(webApp.locator('h3:text("Kontak") >> nth=0')).toBeVisible();

}


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
