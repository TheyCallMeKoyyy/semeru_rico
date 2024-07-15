const {
    test,
    expect
} = require('./setup');


 // Helper function to pick departures
 async function pickDeparture(webApp, departure) {
    await webApp.locator("xpath=//span[normalize-space()='Pilih Keberangkatan']").click()
    await webApp.locator("xpath=//div[@class='ss-option'][normalize-space()='"+ departure +"']").click();
}

async function pickDepartures(webApp, arrival) {
    await webApp.locator("xpath=//span[normalize-space()='Pilih Keberangkatan']")
    await webApp.locator("xpath=//div[@class='ss-option'][normalize-space()='"+ departure +"']").click();
}

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

test('pick departure', async ({ webApp,  }) => {
    await pickDeparture(webApp, "SERANG");
    await pageWaitUntil
});