
const { channel } = require('diagnostics_channel');
const { config } = require('../../config');
const { test, expect } = require('../setup');

async function pickDeparture(webApp, departure) {
    test.info().annotations.push({ type: 'allure.step', value: 'Pick departure' });
    await expect(webApp.locator("id=label-asal")).toBeVisible();
    await webApp.locator("id=label-asal").click();
    await webApp.locator(`xpath=(//span[normalize-space()='${departure}'])[1]`).click();
}

async function pickArrival(webApp, arrival) {
    test.info().annotations.push({ type: 'allure.step', value: 'Pick arrival' });
    await expect(webApp.locator("id=label-tujuan")).toBeVisible();
    await webApp.locator("id=label-tujuan").click();
    await webApp.locator(`xpath=(//span[contains(text(),'${arrival}')])[2]`).click();
}

async function activatePP(webApp, returnDate) {
    test.info().annotations.push({ type: 'allure.step', value: 'Slide PP' });
    await webApp.locator("id=sw").click()
    const dateField = webApp.locator("id=label-tglpulnag");
    await expect(dateField).toBeVisible();
    await dateField.click();
    await webApp.locator("xpath=//span[@class='flatpickr-next-month']").click();
    await webApp.locator(`xpath=//span[@aria-label='${returnDate}']`).click();
}

async function selectDate(webApp, date) {
    test.info().annotations.push({ type: 'allure.step', value: 'Select travel date' });
    const dateField = webApp.locator("id=label-tglpergi");
    await expect(dateField).toBeVisible();
    await dateField.click();
    await webApp.locator("xpath=//span[@class='flatpickr-next-month']").click();
    await webApp.locator(`xpath=//span[@aria-label='${date}']`).click();
}

async function selectPassenger(webApp, totalPassenger) {
    test.info().annotations.push({ type: 'allure.step', value: 'Select passenger count' });
    await webApp.locator("xpath=//div[@class='ss-single-selected']").click();
    await webApp.locator(`xpath=//div[normalize-space()='${totalPassenger} Orang']`).click();
}

async function selectSchedule(webApp) {
    test.info().annotations.push({ type: 'allure.step', value: 'Select departure schedule' });
    const scheduleButton = webApp.locator("xpath=//div[@id='pergi']//li[2]//div[1]//div[1]//div[2]//button[1]");
    await scheduleButton.click();
}

async function selectReturnSchedule(webApp) {
    test.info().annotations.push({ type: 'allure.step', value: 'Select return schedule' });
    const scheduleButton = webApp.locator("xpath=//div[@id='pulang']//li[2]//div[1]//div[1]//div[2]//button[1]");
    await scheduleButton.click();
}

async function inputPassengerData(webApp, name, email, phoneNumber) {
    test.info().annotations.push({ type: 'allure.step', value: 'Input passenger details' });
    await webApp.locator("id=pemesan").fill(name);
    await webApp.locator(`[name="email"]`).fill(email);
    await webApp.locator(`[name="telepon"]`).fill(phoneNumber);
    await webApp.locator("id=submit").click();
}

async function selectSeat(webApp, passengers, custName) {
    test.info().annotations.push({ type: 'allure.step', value: 'Select seat' });
    for (const [index, passenger] of passengers.entries()) {
        const seat = webApp.locator(`xpath=//div[@id='${passenger.seat_number}']//p`);
        await seat.click();
        if(index === 0 && config.passenger_data.cust_name_same != 0){
            await webApp.locator("xpath=//label[@for='samacheck']").click()
        } else if(index === 0) {
            await webApp.locator("id=penumpang1").fill(custName);
        }
    }
    await webApp.locator("css=button[onclick='kirimdata()']").click();
}

async function usingVoucher(webApp, voucherCode) {
    test.info().annotations.push({ type: 'allure.step', value: 'Use voucher' });
    if(voucherCode != ''){
        const buttonVoucher = webApp.locator("id=btnListVoucher")
        await expect(buttonVoucher).toBeVisible({timeout: 1000})
        await buttonVoucher.click()
        await webApp.locator("id=KodeVouchers").fill(voucherCode)
        await webApp.locator("id=btnCekVoucher").click()
    }
}

async function checkingTnc(webApp) {
    const tncButton = webApp.locator("id=tandaiCheck")
    await tncButton.click()
    await webApp.locator("id=submit").click();
}

async function selectPayment(webApp, channel, paymentMethod) {
    test.info().annotations.push({ type: 'allure.step', value: 'Select payment method' });
    await webApp.locator(`[data-target="#collapse${channel}"]`).click();
    await webApp.locator(`xpath=//label[@for='${paymentMethod}']`).click();
}

test('reservation', async ({ webApp }) => {
    test.info().annotations.push({ type: 'allure.label', value: 'feature: Reservation' });
    test.info().annotations.push({ type: 'allure.label', value: 'severity: critical' });
    test.info().annotations.push({ type: 'allure.label', value: 'platform: web' });
    test.info().annotations.push({ type: 'allure.label', value: 'status: pass' });
    test.info().annotations.push({ type: 'allure.step', value: 'Start reservation process' });

    await pickDeparture(webApp, config.journey.departure);
    await webApp.waitForTimeout(1000);
    await pickArrival(webApp, config.journey.arrival);
    await selectDate(webApp, config.journey.date);
    if (config.journey.passenger_count > 1) {
        await selectPassenger(webApp, config.journey.passenger_count);
    }
    await webApp.locator("xpath=//button[@class='btn btn-cari btn-block h-100 br-16']").click();
    await selectSchedule(webApp);
    await inputPassengerData(webApp,
        config.passenger_data.custName,
        config.passenger_data.booker.email,
        config.passenger_data.booker.phone_number,
    );
    await selectSeat(webApp, config.passenger_data.passengers, config.passenger_data.custName);
    if(config.voucher.freepass != ''){
        await usingVoucher(webApp, config.voucher.freepass)
    } else if(config.voucher.harga != ''){
        await usingVoucher(webApp, config.voucher.harga)
    } else if(config.voucher.diskon != ''){
        await usingVoucher(webApp, config.voucher.diskon)
    }
    await checkingTnc(webApp)
    await selectPayment(webApp, config.payment.collapse1.collapse, config.payment.collapse1.gopay);
});
