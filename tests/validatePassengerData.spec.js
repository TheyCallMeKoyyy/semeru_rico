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
    await webApp.locator("id=email").
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

// Test case: input passenger name without text
test('72. passenger name without input', async ({ webApp }) => {
    await navigateToPassengerData(webApp,"CILEGON")
    await inputPassengerName(webApp, "");
    await webApp.waitForTimeout(2000);
    await submitPassenger(webApp)
    await expect(webApp.locator("id=pemesan-error")).toBeVisible({timeout: 4000});
});



// Test case: input passenger name with symbol and number
test('73. Passenger name with symbol and number', async ({ webApp }) => {
    await navigateToPassengerData(webApp,"CILEGON")
    await inputPassengerName(webApp, "123$17");
    await webApp.waitForTimeout(2000);
    await expect(webApp.locator("id=pemesan-error")).toBeVisible({timeout: 4000});
});

// Test case: input passenger name with symbol and number
test('74. Passenger name greater than 30 and less than 3', async ({ webApp }) => {
    await navigateToPassengerData(webApp,"CILEGON")
    await inputPassengerName(webApp, "bb");
    await webApp.waitForTimeout(2000);
    await expect(webApp.locator("id=pemesan-error")).toBeVisible({timeout: 4000});
    const maxlength= await webApp.locator('id=pemesan').getAttribute("maxlength");

    if (maxlength !== null) {
        console.log(`The element has a maxlength with value: ${maxlength}`);
    } else {
        console.log('The element does not have a maxlength');
    }
});

// Test case: input passenger name with white space
test('75. Passenger name with white space', async ({ webApp }) => {
    await navigateToPassengerData(webApp,"CILEGON")
    await inputPassengerName(webApp, "   ");
    await webApp.waitForTimeout(2000);
    await expect(webApp.locator("id=pemesan-error")).toBeVisible({timeout: 4000});
    await submitPassenger(webApp)
});

// Test case: input passenger name with white space
test('80. Passenger address without text', async ({ webApp }) => {
    await navigateToPassengerData(webApp,"CILEGON")
    await inputPassengerAddress(webApp, "");
    await webApp.waitForTimeout(2000);
    await expect(webApp.locator("id=alamat-error")).toBeVisible({timeout: 4000});
    await submitPassenger(webApp)
});


// Test case: input passenger address with number, symbol, and character
test('81. Passenger address with number, symbol, and character', async ({ webApp }) => {
    await navigateToPassengerData(webApp,"CILEGON")
    await inputPassengerAddress(webApp, "Jl. Purbasari No.80");
    await webApp.waitForTimeout(2000);
    await submitPassenger(webApp)
    const errorMessage = await expect(webApp.locator("id=alamat-error")).toBeVisible({timeout: 2000});

    if (errorMessage != null){
        console.log("Tidak dapat menginput alamat menggunakan")
    } else{
        console.log("Alamat dapat diinput menggunakan angka, simbol, dan huruf")
    }
});

// Test case: input passenger number without less than 9 digit and greater than 13 digit
test('82. Passenger address have max length attribute', async ({ webApp }) => {
    await navigateToPassengerData(webApp,"CILEGON")
    await inputPassengerAddress(webApp, "Jl. Purbasari");
    const maxlength= await webApp.locator('id=alamat').getAttribute("maxlength");

    if (maxlength !== null) {
        console.log(`The element has a maxlength with value: ${maxlength}`);
    } else {
        console.log('The element does not have a maxlength');
    }
});

// Test case: input passenger number without text
test('83. Passenger number without text', async ({ webApp }) => {
    await navigateToPassengerData(webApp,"CILEGON")
    await inputPassengerPhone(webApp, "");
    await webApp.waitForTimeout(2000);
    await submitPassenger(webApp)
    await expect(webApp.locator("id=telepon-error")).toBeVisible({timeout: 4000});
});

// Test case: input passenger number with character
test('84. Passenger number with character', async ({ webApp }) => {
    await navigateToPassengerData(webApp,"CILEGON")
    await inputPassengerPhone(webApp, "character");
    await webApp.waitForTimeout(2000);
    await submitPassenger(webApp)
    await expect(webApp.locator("id=telepon-error")).toBeVisible({timeout: 4000});
});


// Test case: input passenger number without less than 9 digit and greater than 13 digit
test('85. Passenger number greater than 13 and less than 9', async ({ webApp }) => {
    await navigateToPassengerData(webApp,"CILEGON")
    await inputPassengerName(webApp, "0812345");
    await webApp.waitForTimeout(2000);
    await expect(webApp.locator("id=telepon-error")).toBeVisible({timeout: 4000});
    const maxlength= await webApp.locator('id=telepon').getAttribute("maxlength");

    if (maxlength !== null) {
        console.log(`The element has a maxlength with value: ${maxlength}`);
    } else {
        console.log('The element does not have a maxlength');
    }
});

// Test case: input passenger address with whitespace
test('86. Passenger address with white space', async ({ webApp }) => {
    await navigateToPassengerData(webApp,"CILEGON")
    await inputPassengerAddress(webApp, "   ");
    await webApp.waitForTimeout(2000);
    await expect(webApp.locator("id=pemesan-error")).toBeVisible({timeout: 4000});
    await submitPassenger(webApp)
});