const { config } = require('../../config');
const { test, expect } = require('../setup');

// Helper function to check booking
async function cekBooking(webApp, codeBooking) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Shuttle and Check Booking page',
    });
    await webApp.locator("id=dropdown-toggle-1").click();
    await webApp.locator("xpath=//a[normalize-space()='Cek Booking']").click();
    await webApp.locator("input[name=kode_booking]").fill(codeBooking);
    await webApp.locator("xpath=//button[normalize-space()='KIRIM']").click();
}

// Helper function to change payment method
async function changePayment(webApp, paymentMethod) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Change payment method',
    });
    await webApp.locator("xpath=//button[contains(@class,'btn btn-md btn-success waves-effect waves-light mb-0 btn-block')]").click();
    await webApp.locator(`xpath=//label[@for='${paymentMethod}']`).click();
    await webApp.locator(`xpath=//button[@type='submit']`).click();
}

// Main test
test('Change Payment Method', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Change Payment Method',
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
    await cekBooking(webApp, config.booking_code.ticket);
    await changePayment(webApp, config.change_payment);
});
