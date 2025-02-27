const { config } = require('../../config');
const { test, expect } = require('../setup');

// Helper function to check booking
async function cekTracking(webApp, codeBooking) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Lacak Paket and Check booking code packet',
    });
    await webApp.locator("id=dropdown-toggle-2").click();
    await webApp.locator("xpath=//div[@id='dropdown-menu-2']//a[@class='font-dm-sans block px-4 py-2 text-sm text-primary hover:bg-gray-100 rounded-md'][normalize-space()='Lacak Paket']").click();
    await webApp.locator("id=text-cek-paket").fill(codeBooking);
    await webApp.locator("xpath=//button[normalize-space()='Lacak Paket']").click();
}

// Helper function to change payment method
async function dataTracking(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Get Information Packet, while information packet is visible, checked ',
    });
    await expect(webApp.locator("xpath=//h5[normalize-space()='Detail Paket']")).toBeVisible();
}

// Main test
test('Tracking Packet', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Tracking Packet',
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
    await cekTracking(webApp, config.booking_code.packet);
    await dataTracking(webApp);
});
