const {
    test,
    expect
} = require('./setup');


test.only("reservation", async ({
    webApp
}) => {

    // pick form to select
    await webApp.locator("xpath=//span[normalize-space()='Pilih Keberangkatan']").click()
})