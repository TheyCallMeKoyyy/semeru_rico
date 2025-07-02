const { config } = require('../../config');
const { test, expect } = require('../setup');

// Helper function to check booking with try-catch
async function cekTracking(webApp, codeBooking) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Lacak Paket and Check booking code packet',
    });

    try {
        await webApp.locator("xpath=//body/nav[contains(@class,'navbar navbar-expand-xl sticky-top navbar-light')]/div[contains(@class,'container-fluid')]/div[@id='navbarNav']/ul[contains(@class,'navbar-nav mx-auto')]/li[8]/div[1]/a[1]").click();
        await webApp.locator("xpath=(//a[normalize-space()='Cek Paket'])[1]").click();
        await webApp.locator("xpath=(//input[contains(@placeholder,'Kode Resi')])[1]").fill(codeBooking);
        await webApp.locator("xpath=(//button[normalize-space()='Cek Paket'])[1]").click();
    } catch (error) {
        test.fail(`Error in cekTracking: ${error.message}`);
        throw error; // Re-throw the error after logging
    }
}

// Helper function to check tracking info with try-catch
async function dataTracking(webApp, codeBooking) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Get Information Packet, while information packet is visible, checked',
    });

    try {
        await expect(webApp.locator(`p:text("${codeBooking}")`)).toBeVisible();
    } catch (error) {
        test.fail(`Error in dataTracking: ${error.message}`);
        throw error; // Re-throw the error after logging
    }
}

// Main test with try-catch
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

    try {
        // Start the Tracking process
        await cekTracking(webApp, config.booking_code.packet);
        await dataTracking(webApp, config.booking_code.packet);
    } catch (error) {
        // Handle any error that might occur during the test
        test.fail(`Test failed: ${error.message}`);
        throw error; // Re-throw the error to mark the test as failed
    }
});
