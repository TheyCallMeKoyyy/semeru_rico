const {
    test,
    expect
} = require('./setup');


test.only("reservation", async ({
    webApp
}) => {

    // pick form to select
    await expect(webApp.locator("xpath=//p[normalize-space()='Keberangkatan']")).toBeVisible({timeout: 3000})
})