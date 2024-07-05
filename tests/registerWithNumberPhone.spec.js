const {
    test,
    expect
} = require('./setup');


test("register with number phone", async ({
    webApp
}) => {
    // click to link /masuk
    await webApp.locator("css=.nav-link.ddaccount").click()

    // Click input with number phone.
    await webApp.locator("xpath=//button[normalize-space()='Dengan Nomor Telepon']").click();

    // Expects page to have a heading with the name of coba masuk dengan cara lain.
    await expect(webApp.locator("xpath=//a[normalize-space()='coba masuk dengan cara lain']")).toBeVisible();


    await webApp
        .getByPlaceholder('ex: 081234567XXX')
        .fill(process.env.NUMBER_PHONE);

    await webApp.locator("xpath=//button[@class='btn btn-block btn-primary ']").click();

    await expect(webApp.getByRole("heading", {
        name: 'Masukan Kode OTP'
    })).toBeVisible({
        timeout: 5_000
    });

    //Waiting time to input OTP before hook next page
    await webApp.waitForTimeout(5000);

    await webApp.locator("xpath=//button[@class='btn btn-block first-bg-color text-white h-100']").click()
    // Create to handle autoclose

    await expect(webApp.locator("xpath=//p[@class='first-color text-uppercase text-center fs-18']")).toBeVisible({
        timeout: 15_000
    })

})