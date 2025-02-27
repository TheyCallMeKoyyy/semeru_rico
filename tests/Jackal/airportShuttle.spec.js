const { config } = require('../../config');
const { test, expect } = require('../setup');

// Helper function to check booking
async function accessAirportShuttle(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to airport shuttle page',
    });
    await webApp.locator("id=dropdown-toggle-1").click();
    await webApp.locator("css=div[id='dropdown-menu-1'] a:nth-child(1)").click();

     //Expect the page to have text Antar Jemput bandara
    await expect(webApp.locator('h1:text("Antar Jemput Bandara") >> nth=0')).toBeVisible();

}


// Main test
test('Access Airport Shuttle page', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: airport shuttle page',
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
    await accessAirportShuttle(webApp);
});
