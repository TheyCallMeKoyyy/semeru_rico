const {
    test,
    expect
} = require('../setup');


async function navigateToCheckingTicket(webApp) {
    await webApp.locator("xpath=//a[normalize-space()='Cek Tiket']").click();
    await expect(webApp.locator("xpath=//p[@class='fs-11 text-muted mb-0']")).toBeVisible({ timeout: 5000});
}

async function inputCodeBooking(webApp, codeBooking){
    await webApp.getByPlaceholder("Masukan Kode Disini").
    fill(codeBooking);
    await webApp.waitForTimeout(3000)
    await webApp.locator("xpath=//button[normalize-space()='Cek Pesanan']").click()
}


// Test case: Check code booking without value
test('Code booking without value', async ({ webApp }) => {
    await navigateToCheckingTicket(webApp);
    await inputCodeBooking(webApp, "");
    await webApp.waitForTimeout(3000)
    await expect(webApp.locator("xpath=//div[@class='invalid-feedback']")).toBeVisible({ timeout: 3000})
});

// Test case: Check invalid code booking
test('Invalid code booking', async ({ webApp }) => {
    await navigateToCheckingTicket(webApp);
    await inputCodeBooking(webApp, "asdfasdfasdf");
    await expect(webApp.locator("xpath=//p[@class='mb-0']")).toBeVisible({ timeout: 7000})
});

// Test case: Check valid code booking
// test('Valid code booking', async ({ webApp }) => {
//     await navigateToCheckingTicket(webApp);
//     await inputCodeBooking(webApp, "asdfasdfasdf");
//     await expect(webApp.locator("xpath=//p[@class='mb-0']")).toBeVisible({ timeout: 7000})
// });
