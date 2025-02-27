const { channel } = require('diagnostics_channel');
const { config } = require('../../config');
const { test, expect } = require('../setup');


// Helper function to pick departure
async function pickDeparture(webApp, departure) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick departure',
    });
    await expect(webApp.locator("id=label-asal")).toBeVisible();
    await webApp.locator("id=label-asal").click();
    await webApp.locator(`xpath=(//span[normalize-space()='${departure}'])[1]`).click();
}

// Helper function to pick arrival
async function pickArrival(webApp, arrival) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick arrival',
    });
    await expect(webApp.locator("id=label-tujuan")).toBeVisible();
    await webApp.locator("id=label-tujuan").click();
    await webApp.locator(`xpath=(//span[contains(text(),'${arrival}')])[2]`).click();
}

// Helper function to select date
async function activatePP(webApp, returnDate) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Slide PP',
    });
    

    //activating PP
    await webApp.locator("id=sw").click()


    const dateField = webApp.locator("id=label-tglpulnag");
    await expect(dateField).toBeVisible();
    await dateField.click();
    
    // Next month
    await webApp.locator("xpath=//span[@class='flatpickr-next-month']").click();
    await webApp.locator(`xpath=//span[@aria-label='${returnDate}']`).click();
}

// Helper function to select date
async function selectDate(webApp, date) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select travel date',
    });
    const dateField = webApp.locator("id=label-tglpergi");
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
    await webApp.locator("xpath=//div[@class='ss-single-selected']").click();
    await webApp.locator(`xpath=//div[normalize-space()='${totalPassenger} Orang']`).click();
}

// Helper function to select schedule
async function selectSchedule(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select departure schedule',
    });
    const scheduleButton = webApp.locator("xpath=//div[@id='pergi']//li[2]//div[1]//div[1]//div[2]//button[1]");
    await scheduleButton.click();
}

// Helper function to select schedule
async function selectReturnSchedule(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select return schedule',
    });
    const scheduleButton = webApp.locator("xpath=//div[@id='pulang']//li[2]//div[1]//div[1]//div[2]//button[1]");
    await scheduleButton.click();
}

// Helper function to input passenger data
async function inputPassengerData(webApp, name, email, phoneNumber) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Input passenger details',
    });
    await webApp.locator("id=pemesan").fill(name);
    await webApp.locator(`[name="email"]`).fill(email);
    await webApp.locator(`[name="telepon"]`).fill(phoneNumber);

    //click button "Selanjutnya"
    await webApp.locator("id=submit").click();
}

// Helper function to select seat
async function selectSeat(webApp, numSeat, custName) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select seat',
    });
    const seat = webApp.locator(`xpath=//div[@id='${numSeat}']//p`);
    await seat.click();

    if(config.passenger_data.cust_name_same != 0){
        await webApp.locator("xpath=//label[@for='samacheck']").click()
    } else{
         //Input cust name
        await webApp.locator("id=penumpang1").
        fill(config.passengerData.custName)
    }

    await webApp.locator("css=button[onclick='kirimdata()']").click();
    
}

// Helper function to use voucher
async function usingVoucher(webApp, voucherCode) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Use voucher',
    });

    if(voucherCode != ''){
        const buttonVoucher = webApp.locator("id=btnListVoucher")
        await expect(buttonVoucher).toBeVisible({timeout: 1000})
        await buttonVoucher.click()
        await webApp.locator("id=KodeVouchers").
        fill(voucherCode)
        await webApp.locator("id=btnCekVoucher").click()
    } else{
        return
    }
    
}

// Helper function to checking button syarat n ketentuan
async function checkingTnc(webApp) {
    const tncButton = webApp.locator("id=tandaiCheck")
    await tncButton.click()

    await webApp.locator("id=submit").click();
}

// Helper function to select payment method
async function selectPayment(webApp, channel, paymentMethod) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select payment method',
    });

    await webApp.locator(`[data-target="#collapse${channel}"]`).click();
    await webApp.locator(`xpath=//label[@for='${paymentMethod}']`)
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
    await webApp.locator("xpath=//button[@class='btn btn-cari btn-block h-100 br-16']").click();
    
    // Select a schedule
    await selectSchedule(webApp);
    
    // Input passenger details
    await inputPassengerData(
        webApp,
        config.passengerData.name,
        config.passengerData.email,
        config.passengerData.phoneNumber,
    );
    
    // Select seat
    await selectSeat(webApp, config.passengerData.seat_number);

    if(config.voucher.freepass != ''){
        await usingVoucher(webApp, config.voucher.freepass)
    }
    else if(config.voucher.harga != ''){
        await usingVoucher(webApp, config.voucher.harga)
    }
    else if(config.voucher.diskon != ''){
        await usingVoucher(webApp, config.voucher.diskon)
    }
    
    // Accept terms and submit
    await checkingTnc(webApp)

    // Select payment method
    await selectPayment(webApp, config.payment.collapse1.collapse, config.payment.collapse1.ovo);
});

