const {
    test,
    expect
} = require('./setup');


test("reservation", async ({
    webApp
}) => {

    // pick form to select
    await expect(webApp.locator("xpath=//p[normalize-space()='99 Transline']")).toBeVisible({timeout: 3000})
})