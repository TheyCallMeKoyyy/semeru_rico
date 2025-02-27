const { channel } = require('diagnostics_channel');
const { config } = require('../../config');
const { test, expect } = require('../setup');

// Helper function to use voucher
async function checkBookingCode(webApp, codeBooking) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Check Booking Code',
    });

    const codeBookingPath = webApp.locator("xpath=//a[normalize-space()='Cek Reservasi']")
    await expect(codeBookingPath).toBeVisible({timeout: 1000})

    if(codeBooking != ''){
        await codeBookingPath.click()
        await webApp.locator("xpath=//input[@placeholder='Kode Booking']").
        fill(codeBooking)
        await webApp.locator("xpath=//button[normalize-space()='Cek Reservasi']").click()
    } else{
        await codeBookingPath.click()
        await webApp.locator("xpath=//input[@placeholder='Kode Booking']").
        fill("codeBooking")
        await webApp.locator("xpath=//button[normalize-space()='Cek Reservasi']").click()
        console.log("Kode booking tidak ditemukan!")

        return
    }
    
}

// Main test
test('Check booking code', async ({ webApp }) => {
    // Add Allure Labels for better categorization in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: check booking',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'severity: critical',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'platform: web',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'status: pass',
    });

    // Start the reservation process
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Start to checking code booking process',
    });

    await checkBookingCode(webApp, config.booking_code.ticket)    
});

