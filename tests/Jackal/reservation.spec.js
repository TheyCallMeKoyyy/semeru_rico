const { config } = require('../../config');
const { test, expect } = require('../setup');


// Helper function to close popup
async function closePopup(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Close initial popup',
    });

    // Locate all close buttons
    const closeButtons = webApp.locator("xpath=//i[@class='fa fa-times-circle text-danger fs-18 close-pop-info']");

    // Get the count of close buttons
    const count = await closeButtons.count();

    // If no buttons are found, log a message and exit the function
    if (count === 0) {
        console.log('No close buttons found. Exiting function.');
        return; // Exit the function early
    }

    // Iterate over each close button and click it if visible
    for (let i = 0; i < count; i++) {
        const closeButton = closeButtons.nth(i);
        if (await closeButton.isVisible()) {
            await closeButton.click();
        } else {
            console.log(`Close button at index ${i} is not visible.`);
        }
    }
}

// Helper function to pick departure
async function pickDeparture(webApp, departure) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick departure',
    });
    await expect(webApp.locator("id=//span[normalize-space()='BUAH BATU ( POOL TRANSIT )']")).toBeVisible();
    await webApp.locator("xpath=//span[normalize-space()='BUAH BATU ( POOL TRANSIT )']").click();
    await webApp.locator(`xpath=//div[normalize-space()='${departure}']`).click();
}

// Helper function to pick arrival
async function pickArrival(webApp, arrival) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick arrival',
    });
    await expect(webApp.locator("xpath=//span[normalize-space()='BEKASI MEGA HYPERMALL']")).toBeVisible();
    await webApp.locator("xpath=//span[normalize-space()='BEKASI MEGA HYPERMALL']").click();
    await webApp.locator(`xpath=//div[@class='ss-content ss-open']//div[normalize-space()='${arrival}']`).click();
}

// Helper function to select date
async function selectDate(webApp, date) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select travel date',
    });
    const dateField = webApp.locator("xpath=//input[@class='tgl_berangkat flatpickr-input form-control input']");
    await expect(dateField).toBeVisible();
    await dateField.click();
    
    // Next month
    await webApp.locator("xpath=//span[@class='flatpickr-next-month']").click();
    await webApp.locator(`xpath=//span[@aria-label='${date}']`).click();
}

// Helper function to select passenger count
async function selectPassenger(webApp, totalPassenger) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select passenger count',
    });
    await webApp.locator("xpath=//div[@class='ss-85870 ss-main']//div[@class='ss-single-selected']").click();
    await webApp.locator(`xpath=//div[normalize-space()='${totalPassenger} Orang']`).click();
}

// Helper function to select schedule
async function selectSchedule(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select travel schedule',
    });
    const scheduleButton = webApp.locator("xpath=(//a[contains(text(),'Pilih')])[1]");
    await scheduleButton.click();
}

// Helper function to input passenger data
async function inputPassengerData(webApp, name, email, phoneNumber, address) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Input passenger details',
    });
    await webApp.locator("id=pemesan").fill(name);
    await webApp.locator("id=email").fill(email);
    await webApp.locator("id=nohp").fill(phoneNumber);
    await webApp.locator("id=alamat").fill(address);
    await webApp.locator("id=penumpang1").fill(name);

    //click button "Selanjutnya"
    await webApp.locator("css=button[onclick='kirim()']").click();
}

// Helper function to select seat
async function selectSeat(webApp, numSeat) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select seat',
    });
    const seat = webApp.locator(`xpath=//div[@id='${numSeat}']//p`);
    await seat.click();
    await webApp.locator("css=button[onclick='send()']").click();
}

// Helper function to use voucher
async function usingVoucher(webApp, voucherCode) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Use voucher',
    });
    await expect(webApp.locator("id=btnListVoucher")).toBeVisible();
    await webApp.locator("id=kodeVouchers").fill(voucherCode);
    await webApp.locator("id=btnCekVoucher").click();
}

// Helper function to select payment method
async function selectPayment(webApp, paymentMethod) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select payment method',
    });
    await webApp.locator(`xpath=//label[@for='#collapse${paymentMethod}']`).click();
}

// Main test
test('reservation', async ({ webApp }) => {
    // Add Allure Labels for better categorization in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Reservation',
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
        value: 'Start reservation process',
    });

    // Close initial popup
    await closePopup(webApp);

    // Pick departure and arrival
    await pickDeparture(webApp, config.journey.departure);
    await webApp.waitForTimeout(1000); // Replace pageWaitUntil with explicit timeout
    await pickArrival(webApp, config.journey.arrival);
    
    // Select date and passenger count if needed
    await selectDate(webApp, config.journey.date);
    if (config.journey.passengerCount > 1) {
        await selectPassenger(webApp, config.journey.passengerCount);
    }
    
    // Search for available schedules
    await webApp.locator("xpath=//button[@type='submit']").click();
    
    // Select a schedule
    await selectSchedule(webApp);
    
    // Input passenger details
    await inputPassengerData(
        webApp,
        config.passengerData.name,
        config.passengerData.email,
        config.passengerData.phoneNumber,
        config.passengerData.address
    );
    
    // Select seat
    await selectSeat(webApp, config.passengerData.seat_number);
    
    // Select payment method
    await selectPayment(webApp, config.payment.gopay);
    
    // Accept terms and submit
    await webApp.locator("xpath=//label[@for='ketentuan']").click();
    await webApp.locator("id=submit").click();
    await webApp.locator("id=submit-konfirmasi").click();
});

