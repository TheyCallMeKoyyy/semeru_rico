// @ts-check
const exp = require('constants');
const { test, expect } = require('../setup');

// Helper function to navigate to the login page
async function navigateToLoginPage(webApp) {
    await webApp.locator("xpath=//a[normalize-space()='Daftar/Masuk']").click();
    await webApp.locator("xpath=//div[contains(text(),'Login dengan Nomor Telepon')]").click();
    await expect(webApp.locator("//a[normalize-space()='coba masuk dengan cara lain']")).toBeVisible();
}

// Helper function to input phone number and click login
async function inputPhoneNumberAndLogin(webApp, phoneNumber) {
    await webApp.getByPlaceholder('ex: 081234567XXX').fill(phoneNumber);
    await webApp.locator("xpath=//button[normalize-space()='Masuk']").click();
}

// Helper function to handle OTP input
async function inputOTP(webApp) {
    await expect(webApp.getByRole("heading", { name: 'Masukan Kode OTP' })).toBeVisible({ timeout: 5_000 });
    // await webApp.getByPlaceholder('Masukan 6 Digit Kode OTP').fill(otp);
    await webApp.locator("xpath=//button[normalize-space()='Lanjutkan']").
    click()
}


async function toInputDataOldUser(webApp, gender) {
    await webApp.locator("id=login").
    click()
    await webApp.locator("xpath=//a[normalize-space()='Profile']").
    click()
    await expect(webApp.locator("xpath=//a[normalize-space()='Lengkapi Data']")).toBeVisible({timeout: 5000})
    await webApp.locator("xpath=//img[@class='img-fluid logo-navbar']").
    click()

    // Input user data
    await webApp.locator("xpath=//a[normalize-space()='Lengkapi Data']").
    click()
    if( gender == "pria"){
        await webApp.locator("xpath=//div[@class='d-flex gender pria']").click()
    }else{
        await webApp.locator("xpath=//div[@class='d-flex gender wanita']").click()
    }
    await webApp.locator("xpath=//input[@class='form-control tanggal form-control input']").
    click()
    await webApp.locator("xpath=//span[@aria-label='September 1, 2024']").
    click()
    await webApp.locator("xpath=//textarea[@placeholder='Masukkan alamat']").
    fill("p")
    await webApp.locator("xpath=//textarea[@placeholder='Masukkan alamat']").
    click()
}

async function toInputDataNewUser(webApp, nama, email) {
    await webApp.locator("id=nama").
    fill(nama)
    await webApp.locator("id=email").
    fill(email)
    await webApp.locator("xpath=//input[@class='form-control tanggal form-control input']").
    click()
    await webApp.locator("xpath=//span[@aria-label='September 1, 2024']").
    click()
    await webApp.locator("xpath=//div[@class='d-flex gender pria']").
    click()
    await webApp.locator("xpath=//textarea[@placeholder='Masukkan alamat']").
    fill("p")
    await webApp.locator("id=submit").
    click()
}

// Test case: Invalid OTP
test('Birthday New User', async ({ webApp }) => {
    await navigateToLoginPage(webApp);
    await inputPhoneNumberAndLogin(webApp, process.env.NUMBER_PHONE);
    await inputOTP(webApp);
    await webApp.waitForTimeout(5000);
    await toInputDataNewUser(webApp, "shugoy", "qcshugi@gmail.com")
    await webApp.locator("xpath=.fa.fa-times-circle.text-danger.fs-18.close-pop-info").
    click()
    await expect(webApp.locator("xpath=//p[contains(text(),'Rayakan hari spesialmu bersama kami dan nikmati di')]")).toBeVisible({timeout: 5000})
});