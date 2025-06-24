const { config } = require('../../config');
const { test, expect } = require('../setup');
const axios = require('axios');

// Helper function to login
async function login(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to login page',
    });
    // Click button to login page
    await webApp.locator("xpath=(//a[@class='btn-login'][normalize-space()='Login'])[1]").click();

    test.info().annotations.push({
        type: 'allure.step',
        value: 'Click to show phone number field',
    });
    // Click button to appear field on phone number
    await webApp.locator("xpath=//button[normalize-space()='Dengan Nomor Telepon']").click();

    test.info().annotations.push({
        type: 'allure.step',
        value: 'Input phone number',
    });
    // Input phone number
    await webApp.locator("id=no_telepon").fill(config.passengerData.phoneNumber);

    test.info().annotations.push({
        type: 'allure.step',
        value: 'Submit phone number',
    });
    // Submit phone number
    await webApp.locator("xpath=//button[@class='btn btn-block btn-primary ']").click();

    await webApp.waitForTimeout(50000); // Fixed typo from waitForTimeOut to waitForTimeout

    test.info().annotations.push({
        type: 'allure.step',
        value: 'Fetch OTP from API',
    });
    const otp = await getOtpFromApi();

    test.info().annotations.push({
        type: 'allure.step',
        value: 'Input OTP',
    });
    // Input OTP
    await webApp.locator("id=code").fill(otp);

    test.info().annotations.push({
        type: 'allure.step',
        value: 'Submit OTP',
    });
    // Submit OTP
    await webApp.locator("xpath=//button[@class='btn btn-block btn-primary']").click();
}

// Helper function to get OTP from API
async function getOtpFromApi() {
    try {
        // Use Axios to call your API and fetch the OTP
        const response = await axios.post(
            config.url.otp,
            {
                // Request body
                tipe: 'otp-sms',
                telp: config.passengerData.phoneNumber,
            },
            {
                headers: {
                    // Add any required headers, e.g., authorization token
                    Authorization: 'Bearer your_token',
                    'Content-Type': 'application/json', // Specify content type
                },
            }
        );

        // Assuming the API returns the OTP in a field called 'otp'
        return response.data.otp;
    } catch (error) {
        console.error('Error fetching OTP:', error.message);
        throw error; // Handle the error appropriately
    }
}

// Main test
test('Login', async ({ webApp }) => {
    // Add Allure Labels for better categorization in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Login',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'severity: critical',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'platform: web',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'status: pass',
    });

    // Run the login process
    await login(webApp);
});


















