const {
    test,
    expect
} = require('../setup');


async function closePopup(webApp) {
    await expect(webApp.locator("xpath=//i[@class='fa fa-times-circle text-danger fs-18 close-pop-info']")).toBeVisible()
    await webApp.locator("xpath=//i[@class='fa fa-times-circle text-danger fs-18 close-pop-info']").click()
}


 // Helper function to pick departures
 async function pickDeparture(webApp, departure) {
    await webApp.locator("xpath=//span[normalize-space()='Pilih Keberangkatan']").click()
    await webApp.locator("xpath=//div[@class='ss-option'][normalize-space()='"+ departure +"']").click();
}

async function pickArrival(webApp, arrival) {
    await webApp.locator("xpath=//span[normalize-space()='Pilih Keberangkatan']")
    await webApp.locator("xpath=//div[@class='ss-option'][normalize-space()='"+ arrival +"']").click();
}


async function selectDate(date) {
    
}


// This to create function PP

async function inputPassengerDatas(webApp, name, email, phoneNumber, address){
    await webApp.locator("id=pemesan").
    fill(name)
    await webApp.locator("id=email").
    fill(email)
    await webApp.locator("id=telepon").
    fill(phoneNumber)
    await webApp.locator("id=alamat").
    fill(address)
}

async function selectSeat(numSeat) {
    const seat = await webApp.locator(`#${numSeat}`);
    await seat.click(); // Perform a click on the seat
    await webApp.locator("id=submit").
    click()
}


async function usingVoucher(voucherCode) {
    await webApp.locator("id=btnListVoucher")
    await webApp.locator("id=kodeVouchers").
    fill(voucherCode)
    await webApp.locator("id=btnCekVoucher").
    click()
}


async function selectPayment(paymentMethod, groupPayment) {
    await webApp.locator("xpath=//p[normalize-space()='"+ groupPayment +"']").
    click()
    await webApp.locator("xpath=//img[contains(@alt,'"+ paymentMethod +"')]").
    click()
}

test('reservation', async ({ webApp,  }) => {
    await closePopup(webApp)
    await pickDeparture(webApp, "SERANG");
    await pageWaitUntil
    await pickArrival(webApp, "")
    await selectDate()
    // buttonSearch
    // select schedule
    // ButtonToSelectSeat
    await selectSeat()
    // with Voucher?
    await selectPayment()
    await webApp.locator("css=label[for='tandaicheck']").
    click()
    await webApp.locator("id=submit"). //
    click()
    await webApp.locator("css=//button[@type='button'][normalize-space()='Konfirmasi']").
    click()
});