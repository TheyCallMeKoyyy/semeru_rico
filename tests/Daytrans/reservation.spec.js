const { channel } = require('diagnostics_channel');
const { config } = require('../../config');
const { test, expect } = require('../setup');


// Helper function to pick departure
async function pickDeparture(webApp, departure) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick departure',
    });
    await expect(webApp.locator("id=berangkat")).toBeVisible();
    await webApp.locator("id=berangkat").click();
    await webApp.locator(`xpath=(//span[normalize-space()='${departure}'])`).click();
}

// Helper function to pick arrival
async function pickArrival(webApp, arrival) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick arrival',
    });
    await expect(webApp.locator("id=tujuan")).toBeVisible();
    await webApp.locator("id=tujuan").click();
    await webApp.locator(`xpath=//div[@id='dropdown-outlet2']//div//div[@class='dropdown-item drpdwn-item'][normalize-space()='Bekasi']`).click();
}

// Helper function to select date
async function selectDate(webApp, date) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select travel date',
    });
    const dateField = webApp.locator("id=tgl_berangkat");
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
        value: 'Select travel schedule',
    });
    const scheduleButton = webApp.locator("xpath=//div[@id='jadwal-list']//div[1]//div[4]//div[3]//div[1]//button[1]");
    await scheduleButton.click();
}

// Helper function to input passenger data
async function inputPassengerData(webApp, name, email, phoneNumber) {
  test.info().annotations.push({
    type: 'allure.step',
    value: 'Input passenger details',
  });

  // Fill passenger and contact information
  await webApp.locator("#pemesan").fill(name);
  await webApp.locator('[name="email"]').fill(email);
  await webApp.locator('[name="telepon"]').fill(phoneNumber);
  await webApp.locator("#penumpang1").fill(name);

  // Wait for the submit button to be enabled and click
  const submitButton = webApp.locator("#submitModal");
  await submitButton.waitFor({ state: 'visible', timeout: 5000 });
  await submitButton.click();

  // Wait for the confirm button and click
  const confirmButton = webApp.locator("#confirmSubmit");
  await confirmButton.waitFor({ state: 'visible', timeout: 5000 });
  await confirmButton.click();
}


// Helper function to select seat
async function selectSeat(webApp, numSeat) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select seat',
    });
    const seat = webApp.locator(`xpath=//p[normalize-space()='${numSeat}']`);
    await seat.click();

    // if(config.passenger_data.cust_name_same != 0){
    //     await webApp.locator("xpath=//label[@for='samacheck']").click()
    // } else{
    //      //Input cust name
    //     await webApp.locator("id=penumpang1").
    //     fill(config.passengerData.custName)
    // }
    await webApp.waitForTimeout(1000);

    await webApp.locator("id=submit").click();
    
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

// Helper function to select payment method
async function selectPayment(webApp, channel, paymentMethod) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select payment method',
    });

    await webApp.locator(`xpath=//p[normalize-space()='Pembayaran Instan']`).click();
    await webApp.locator(`xpath=//img[contains(@alt,'GOPAY')]`).click()
}


// Helper function to checking button syarat n ketentuan
async function checkingTnc(webApp) {
    const tncButton = webApp.locator("css=label[for='tandaicheck']")
    await tncButton.click()

    await webApp.locator("id=submit").click();
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
    if (config.journey.passenger_count > 1) {
        await selectPassenger(webApp, config.journey.passenger_count);
    }
    
    // Search for available schedules
    await webApp.locator("css=button[type='submit']").click();
    
    // Select a schedule
    await selectSchedule(webApp);
    
    // Input passenger details
    await inputPassengerData(
        webApp,
        config.passenger_data.name,
        config.passenger_data.email,
        config.passenger_data.phone_number,
    );
    
    // Select seat
    await selectSeat(webApp, config.passenger_data.seat_number);

    if(config.voucher.freepass != ''){
        await usingVoucher(webApp, config.voucher.freepass)
    }
    else if(config.voucher.harga != ''){
        await usingVoucher(webApp, config.voucher.harga)
    }
    else if(config.voucher.diskon != ''){
        await usingVoucher(webApp, config.voucher.diskon)
    }

    // Select payment method
    await selectPayment(webApp, config.payment.collapse1.collapse, config.payment.collapse1.ovo);
    
    // Accept terms and submit
    await checkingTnc(webApp)

    
});

