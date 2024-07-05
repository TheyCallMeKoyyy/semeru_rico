const { 
    chromium, 
    expect
} = require('@playwright/test');

async function globalSetup() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://tbk:development@kiatrans-web.asmat.app');

    // click to link /masuk
    await page.locator("css=.nav-link.ddaccount").click()

    // Click input with number phone.
    await page.locator("xpath=//div[contains(text(),'Login dengan Nomor Telepon')]").click();

    // Expects page to have a heading with the name of coba masuk dengan cara lain.
    await expect(page.locator("//a[normalize-space()='coba masuk dengan cara lain']")).toBeVisible();


    await page
        .getByPlaceholder('ex: 081234567XXX')
        .fill('081234567890');

    await page.locator("xpath=//button[normalize-space()='Masuk']").click();

    await expect(page.getByRole("heading", {
        name: 'Masukan Kode OTP'
    })).toBeVisible({
        timeout: 5_000
    });

    await page
    .locator("[id='code']")
    .fill('123456');

    await page.waitForTimeout(3000);

    await page.locator("xpath=//button[normalize-space()='Lanjutkan']").click();

    await expect(page.locator("css=.btn.btn-reservasi.color-primary2.f0kom9")).toBeVisible({ timeout: 10_000 });

    await page.context().storageState({ path: "./LoginAuth.json" });

    await browser.close();
}

export default globalSetup;
