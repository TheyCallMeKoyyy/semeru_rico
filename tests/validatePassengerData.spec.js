const {
    test,
    expect
} = require('./setup');


 // Helper function to pick departures
async function navigateToPassengerData(webApp, departure) {
    await webApp.locator("xpath=//span[normalize-space()='Pilih Keberangkatan']").click()
    await webApp.locator("xpath=//div[@class='ss-option'][normalize-space()='"+ departure +"']").click();

    // await webApp.locator("xpath=//span[normalize-space()='Pilih Keberangkatan']")
    // await webApp.locator("xpath=//div[@class='ss-option'][normalize-space()='"+ destination +"']").click();

    //Pick date
    await webApp.locator("id=tanggal_pergi").click()
    await webApp.waitForTimeout(1000)
    await webApp.locator("xpath=//div[@class='flatpickr-days']").click()
    await webApp.locator("xpath=//span[@aria-label='August 14, 2024']")
    await webApp.locator("xpath=//button[normalize-space()='Cari']").click()
    await webApp.getByText("Pilih").click()
}

// Helper function to pick destination
async function pickDestination(webApp, destination) {
    
}

// Helper function to input passenger name
async function inputPassengerName(webApp, name){
    await webApp.locator("id=pemesan").
    fill(name)
}

// Helper function to input passenger email
async function inputPassengerEmail(webApp, email){
    await webApp.locator("id=pemesan").
    fill(email)
}

// Helper function to input passenger phone number
async function inputPassengerPhone(webApp, phoneNumber){
    await webApp.locator("id=telepon").
    fill(phoneNumber)
}

// Helper function to input passenger address
async function inputPassengerAddress(webApp, address){
    await webApp.locator("id=alamat").
    fill(address)

}

// Helper function to input passenger name
async function submitPassenger(webApp){
    await webApp.waitForTimeout(2000)
    await webApp.locator("id=submit").click()
}

test('passenger name without input', async ({ webApp }) => {
    await navigateToPassengerData(webApp,"CILEGON")
    await inputPassengerName(webApp, "");
    await webApp.waitForTimeout(2000);
    await expect(webApp.locator("id=pemesan-error")).toBeVisible({timeout: 4000});
});



// test.describe('validatePassengerData', () => {
//     test.beforeEach('navigateToPassengerData', async (webApp)=>{
//         await navigateToPassengerData(webApp,"CILEGON")
//     })
//     test('passenger name without input', async ({ webApp }) => {
//         await inputPassengerName(webApp, "");
//         await webApp.waitForTimeout(2000);
//         await expect(webApp.locator("id=pemesan-error")).toBeVisible({timeout: 4000});
//     });
//     test('passenger name with symbol', async ({ webApp }) => {
//         await inputPassengerName(webApp, "123.");
//         await webApp.waitForTimeout(2000);
//         await expect(webApp.locator("id=pemesan-error")).toBeVisible({timeout: 4000});
//     });
//     test('passenger name less than 3 char', async ({ webApp }) => {
//         await inputPassengerName(webApp, "a");
//         await webApp.waitForTimeout(2000);
//         await expect(webApp.locator("id=pemesan-error")).toBeVisible({timeout: 4000});
//     });
//     test('passenger name with white space', async ({ webApp }) => {
//         await inputPassengerName(webApp, "    ");
//         await webApp.waitForTimeout(2000);
//         await expect(webApp.locator("id=pemesan-error")).toBeVisible({timeout: 4000});
//     });
// });