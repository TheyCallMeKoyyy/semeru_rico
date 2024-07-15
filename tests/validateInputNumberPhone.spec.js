// @ts-check
const { test, expect } = require('./setup');

// Helper function to navigate to the login page
async function navigateToLoginPage(webApp) {
    await webApp.locator(".nav-link.ddaccount").click();
    await webApp.locator("xpath=//div[contains(text(),'Login dengan Nomor Telepon')]").click();
    await expect(webApp.locator("//a[normalize-space()='coba masuk dengan cara lain']")).toBeVisible();
}

// Helper function to handle Invalid authentication
async function invalidAuthentication(webApp){
    webApp.on('dialog', async dialog => {
        expect(dialog.type()).toContain('confirm');
        expect(dialog.message()).toContain('Gagal Authentifikasi Login');
        await dialog.accept();
    });
}

// Helper function to input phone number and click login
async function inputPhoneNumberAndLogin(webApp, phoneNumber) {
    await webApp.getByPlaceholder('ex: 081234567XXX').fill(phoneNumber);
    await webApp.locator("xpath=//button[normalize-space()='Masuk']").click();
}

// Helper function to handle OTP input
async function inputOTP(webApp, otp) {
    await expect(webApp.getByRole("heading", { name: 'Masukan Kode OTP' })).toBeVisible({ timeout: 5_000 });
    await webApp.getByPlaceholder('Masukan 6 Digit Kode OTP').fill(otp);
}

// Test case: Load website and verify title
test('load website', async ({ webApp }) => {
    const element = webApp.locator("//p[normalize-space()='Keberangkatan']");
    await expect(element).toBeVisible({ timeout: 5_000 });
});

// Test case: Login without input a phone number
test('login without input number phone', async ({ webApp }) => {
    await navigateToLoginPage(webApp);
    await webApp.locator("xpath=//button[normalize-space()='Masuk']").click();
    await expect(webApp.locator("xpath=//div[@class='invalid-feedback mt-1 mb-0 d-block']")).toBeVisible();
});

// Test case: Login with symbol in number phone
test('login with input symbol in number phone box', async ({ webApp }) => {
    await navigateToLoginPage(webApp);
    await webApp.getByPlaceholder('ex: 081234567XXX').fill("@awkekh");
    await webApp.locator("xpath=//button[normalize-space()='Masuk']").click();
    await invalidAuthentication(webApp)
});

// Test case: Login with symbol in number phone
test('login with input white space', async ({ webApp }) => {
    await navigateToLoginPage(webApp);
    await webApp.getByPlaceholder('ex: 081234567XXX').fill("  ");
    await webApp.locator("xpath=//button[normalize-space()='Masuk']").click();
    await invalidAuthentication(webApp)
});

// Test case: Login with a phone number less than nine digits
test('login with input number phone less than nine digit', async ({ webApp }) => {
    await navigateToLoginPage(webApp);
    await inputPhoneNumberAndLogin(webApp, "08123");
    await expect(webApp.locator("xpath=//div[@class='invalid-feedback mt-1 mb-0 d-block']")).toBeVisible();
});

// Test case: Login with a valid phone number and input OTP
test('login with input number phone', async ({ webApp }) => {
    await navigateToLoginPage(webApp);
    await inputPhoneNumberAndLogin(webApp, process.env.NUMBER_PHONE);
    await inputOTP(webApp, process.env.OTP);
    await expect(webApp.locator("xpath=//button[normalize-space()='Lanjutkan']")).toBeVisible({ timeout: 15_000 });
});
