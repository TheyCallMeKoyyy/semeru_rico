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

// Test case: Invalid OTP
test('OTP invalid', async ({ webApp }) => {
    await navigateToLoginPage(webApp);
    await inputPhoneNumberAndLogin(webApp, "081234567890");
    await inputOTP(webApp, '000000');
});

// Test case: Resend OTP
test('Resend OTP', async ({ webApp }) => {
    await navigateToLoginPage(webApp);
    await inputPhoneNumberAndLogin(webApp, "081234567890");

    await webApp.waitForTimeout(125000);
    await webApp.locator("xpath=//span[@id='btn-resend']").click();
    await expect(webApp.locator("xpath=//span[@id='btn-resend']")).toBeHidden({ timeout: 3_000 });
});

// Test case: Attempt to login without entering OTP
test('Countdown OTP', async ({ webApp }) => {
    await navigateToLoginPage(webApp);
    await inputPhoneNumberAndLogin(webApp, "081234567890");
    await expect(webApp.locator("xpath=//small[1]")).toBeVisible({timeout: 3000})
});

// Test case: Attempt to login without entering OTP
test('Without OTP', async ({ webApp }) => {
    await navigateToLoginPage(webApp);
    await inputPhoneNumberAndLogin(webApp, "081234567890");
    await inputOTP(webApp, '');
    await invalidAuthentication(webApp)
});

// Test case: Attempt to login with non-numeric OTP
test('Char OTP', async ({ webApp }) => {
    await navigateToLoginPage(webApp);
    await inputPhoneNumberAndLogin(webApp, "081234567890");
    await inputOTP(webApp, 'test');
    await invalidAuthentication(webApp)
});


// Test case: Attempt to login with non-numeric OTP
test('Maximal input OTP', async ({ webApp }) => {
    await navigateToLoginPage(webApp);
    await inputPhoneNumberAndLogin(webApp, "081234567890");
    const maxlength= await webApp.locator('id=code').getAttribute("maxlength");

    if (maxlength !== null) {
        console.log(`The element has a maxlength with value: ${maxlength}`);
    } else {
        console.log('The element does not have a maxlength');
    }
});