const { channel } = require('diagnostics_channel');
const { config } = require('../../config');
const { test, expect } = require('../setup');

// Helper function to pick departure
async function pickDeparture(webApp, departure) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick departure',
    });
    await expect(webApp.locator(`xpath=//span[normalize-space()='AGEN JATIWARNA']`)).toBeVisible();
    await webApp.locator(`xpath=//span[normalize-space()='AGEN JATIWARNA']`).click();
    await webApp.locator(`xpath=//div[@class='ss-content ss-open']//div[@class='ss-option'][normalize-space()='KOPI KENANGAN PARUNG']`).click();
}

// Helper function to pick arrival
async function pickArrival(webApp, arrival) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick arrival',
    });
    await expect(webApp.locator(`xpath=//span[normalize-space()='BEKASI']`)).toBeVisible();
    await webApp.locator(`xpath=//span[normalize-space()='BEKASI']`).click();
    await webApp.locator(`xpath=//div[@class='ss-content ss-open']//div[@class='ss-option'][normalize-space()='INDOMARET HYBRID-CIKARANG']`).click();
}

// Helper function to select date
async function selectDate(webApp, date) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select travel date',
    });
    const dateField = webApp.locator(`//input[@name='tglberangkat']`);
    await expect(dateField).toBeVisible();
    await dateField.click();

    // Next month
    await webApp.locator(`xpath=//span[@class='flatpickr-next-month']//*[name()='svg']`).click();
    await webApp.locator(`xpath=//span[@aria-label='${date}']`).click();
}

// Helper function to input passenger data for multiple passengers
async function inputAllPassengerData(webApp) {
    const passengers = config.passenger_data.passengers;

    for (let i = 0; i < passengers.length; i++) {
        const passenger = passengers[i];

        if (i === 0) {
            await inputPassengerData(
                webApp,
                passenger.name,
                config.passenger_data.booker.email,
                config.passenger_data.booker.phone_number,
                config.passenger_data.custName
            );
        } else {
            const addBtn = webApp.locator(`xpath=//button[contains(., 'Tambah Penumpang')]`);
            if (await addBtn.isVisible()) {
                await addBtn.click();
                await webApp.waitForTimeout(500);
            }
            await webApp.locator(`(//input[@id='penumpang2'])[1]`).fill(passenger.name);
            await webApp.locator('//div[6]//div[2]//div[1]//div[1]//label[2]').click();
        }
    }
}

// Helper function to select passenger count
async function selectPassenger(webApp, totalPassenger) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select passenger count',
    });
    await webApp.locator(`xpath=//span[normalize-space()='1 Orang']`).click();
    const passengerCountOption = webApp.locator(`xpath=//div[normalize-space()='2 Orang']`);
    await expect(passengerCountOption).toBeVisible({ timeout: 3000 });
    await passengerCountOption.click();
}

// Helper function to select schedule
async function selectSchedule(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select travel schedule',
    });
    const scheduleButton = webApp.locator(`xpath=(//button[normalize-space()='Pilih'])[1]`);
    await scheduleButton.click();
}

// Helper function to input passenger data
async function inputPassengerData(webApp, name, email, phoneNumber, custName, seatNumber) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Input passenger details',
    });
    console.log(config.passenger_data.passengers.name)
    await webApp.locator(`xpath=//input[@id='pemesan']`).fill(config.passenger_data.custName);
    console.log(config.passenger_data.booker.email)
    await webApp.locator(`xpath=//input[@placeholder='Masukkan Email']`).fill(config.passenger_data.booker.email);
    console.log(config.passenger_data.booker.phone_number)
    await webApp.locator(`xpath=//input[@placeholder='Masukkan No. Telpon']`).fill(config.passenger_data.booker.phone_number);

    if(config.passenger_data.cust_name_same != 2){
        await webApp.locator("xpath=//label[@for='samacheck']").click()
    } else{
        await webApp.locator("id=penumpang1").fill(config.passenger_data.custName)
    }

    await webApp.locator(`//div[4]//div[2]//div[1]//div[1]//label[1]`).click();
    await webApp.locator(`//div[6]//div[2]//div[1]//div[1]//label[2]`).click();
    await webApp.locator(`//button[@id='submit']`).click();
}

// Helper function to select seat
async function selectSeat(webApp, seatNumber) {
    test.info().annotations.push({
        type: 'allure.step',
        value: `Pilih kursi ${seatNumber}`,
    });
    const seatLocator = webApp.locator(`xpath=//button[normalize-space()='Selanjutnya']`);
    await expect(seatLocator).toBeVisible({ timeout: 5000 });
    await seatLocator.click();
}

// Helper function to select payment method
async function selectPayment(webApp, paymentMethod) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select payment method',
    });
    const section = webApp.locator(`xpath=//img[@alt='Mandiri Virtual Account']`);
    await section.click();
    const payment = webApp.locator(`xpath=//img[@alt='${paymentMethod}']`);
    await payment.click(config.payment.collapse1);
}

// Helper function to checking button syarat n ketentuan
async function checkingTnc(webApp) {
    const tncButton = webApp.locator(`xpath=//label[contains(text(),'Silahkan tandai kotak ini sebagai bukti bahwa anda')]`);
    await tncButton.click()
    await webApp.locator(`xpath=//button[@id='submit']`).click();
}

// Main test
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
    await selectPassenger(webApp, config.journey.passenger_count);
    await webApp.locator("xpath=//button[normalize-space()='Cari']").click();
    await selectSchedule(webApp);
    await inputAllPassengerData(webApp);
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

    await selectPayment(webApp, config.payment.collapse1.gopay);
    await checkingTnc(webApp);

    // ===== Tambahan untuk Reservasi Pulang =====
    if (config.journey.return_date) {
        test.info().annotations.push({ type: 'allure.step', value: 'Start return reservation process' });
        await webApp.goto(config.returnPageURL);
        await pickDeparture(webApp, config.journey.arrival);
        await webApp.waitForTimeout(1000);
        await pickArrival(webApp, config.journey.departure);
        await selectDate(webApp, config.journey.return_date);
        await selectPassenger(webApp, config.journey.passenger_count);
        await webApp.locator("xpath=//button[normalize-space()='Cari']").click();
        await selectSchedule(webApp);
        await inputAllPassengerData(webApp);
        await selectSeat(webApp, config.passenger_data.return_seat_number);

        if(config.voucher.freepass != ''){
            await usingVoucher(webApp, config.voucher.freepass)
        }
        else if(config.voucher.harga != ''){
            await usingVoucher(webApp, config.voucher.harga)
        }
        else if(config.voucher.diskon != ''){
            await usingVoucher(webApp, config.voucher.diskon)
        }

        await selectPayment(webApp, config.payment.collapse1.gopay);
        await checkingTnc(webApp);
    }
});
