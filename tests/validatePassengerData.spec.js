const {
    test,
    expect
} = require('./setup');


 // Helper function to pick departures
async function navigateToCustomerData(webApp, departure) {
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

// Helper function to input Customer name
async function inputCustomerName(webApp, name){
    await webApp.locator("id=pemesan").
    fill(name)
}

// Helper function to input Customer email
async function inputCustomerEmail(webApp, email){
    await webApp.locator("id=email").
    fill(email)
}

// Helper function to input Customer phone number
async function inputCustomerPhone(webApp, phoneNumber){
    await webApp.locator("id=telepon").
    fill(phoneNumber)
}

// Helper function to input Customer address
async function inputCustomerAddress(webApp, address){
    await webApp.locator("id=alamat").
    fill(address)

}

async function inputPassengerName(webApp, passenger){
    await webApp.locator("id=penumpang1").
    fill(passenger);
}

// Helper function to input Customer name
async function submitCustomer(webApp){
    await webApp.waitForTimeout(2000)
    await webApp.locator("id=submit").click()
}

// Test case: input Customer name without text
test('72. Customer name without input', async ({ webApp }) => {
    await navigateToCustomerData(webApp,"CILEGON")
    await inputCustomerName(webApp, "");
    await webApp.waitForTimeout(2000);
    await submitCustomer(webApp)
    await expect(webApp.locator("id=pemesan-error")).toBeVisible({timeout: 4000});
});



// Test case: input Customer name with symbol and number
test('73. Customer name with symbol and number', async ({ webApp }) => {
    await navigateToCustomerData(webApp,"CILEGON")
    await inputCustomerName(webApp, "123$17");
    await webApp.waitForTimeout(2000);
    await expect(webApp.locator("id=pemesan-error")).toBeVisible({timeout: 4000});
});

// Test case: input Customer name with symbol and number
test('74. Customer name greater than 30 and less than 3', async ({ webApp }) => {
    await navigateToCustomerData(webApp,"CILEGON")
    await inputCustomerName(webApp, "bb");
    await webApp.waitForTimeout(2000);
    await expect(webApp.locator("id=pemesan-error")).toBeVisible({timeout: 4000});
    const maxlength= await webApp.locator('id=pemesan').getAttribute("maxlength");

    if (maxlength !== null) {
        console.log(`The element has a maxlength with value: ${maxlength}`);
    } else {
        console.log('The element does not have a maxlength');
    }
});

// Test case: input Customer name with white space
test('75. Customer name with white space', async ({ webApp }) => {
    await navigateToCustomerData(webApp,"CILEGON")
    await inputCustomerName(webApp, "   ");
    await webApp.waitForTimeout(2000);
    await expect(webApp.locator("id=pemesan-error")).toBeVisible({timeout: 4000});
    await submitCustomer(webApp)
});

// Test case: input Customer e-mail without text
test('76. Customer email without text', async ({ webApp }) => {
    await navigateToCustomerData(webApp,"CILEGON")
    await inputCustomerEmail(webApp, "");
    await webApp.waitForTimeout(2000);
    await expect(webApp.locator("id=email-error")).toBeVisible({timeout: 4000});
    await submitCustomer(webApp)
});

// Test case: input Customer email with number, symbol, and character
test('77. Customer email with number, symbol, and character', async ({ webApp }) => {
    await navigateToCustomerData(webApp,"CILEGON")
    await inputCustomerEmail(webApp, "sutra.sugi");
    await webApp.waitForTimeout(2000);
    await submitCustomer(webApp)
    const errorMessage = await expect(webApp.locator("id=email-error")).toBeVisible({timeout: 2000});

    if (errorMessage != null){
        console.log("Error input email")
    } else{
        console.log("E-mail dapat diinput menggunakan angka, simbol, dan huruf")
    }
});

// Test case: input Customer email greater than 64 karakter
test('78. Customer email have max length attribute', async ({ webApp }) => {
    await navigateToCustomerData(webApp,"CILEGON")
    await inputCustomerAddress(webApp, "sutra.sugoy@mailinator.com");
    const maxlength= await webApp.locator('id=email').getAttribute("maxlength");

    if (maxlength !== null || maxlength == '64') {
        console.log(`The element has a maxlength with value: ${maxlength}`);
    } else {
        console.log('The element does not have a maxlength');
    }
});

// Test case: input Customer e-mail without @
test('79. Customer email without text', async ({ webApp }) => {
    await navigateToCustomerData(webApp,"CILEGON")
    await inputCustomerEmail(webApp, "sutra.sugi");
    await webApp.waitForTimeout(2000);
    await expect(webApp.locator("id=email-error")).toBeVisible({timeout: 4000});
    await submitCustomer(webApp)
});

// Test case: input Customer address without text
test('80. Customer addres without text', async ({ webApp }) => {
    await navigateToCustomerData(webApp,"CILEGON")
    await inputCustomerEmail(webApp, "");
    await webApp.waitForTimeout(2000);
    await expect(webApp.locator("id=alamat-error")).toBeVisible({timeout: 4000});
    await submitCustomer(webApp)
});

// Test case: input Customer address with number, symbol, and character
test('81. Customer address with number, symbol, and character', async ({ webApp }) => {
    await navigateToCustomerData(webApp,"CILEGON")
    await inputCustomerAddress(webApp, "Jl. Purbasari No.80");
    await webApp.waitForTimeout(2000);
    await submitCustomer(webApp)
    const errorMessage = await expect(webApp.locator("id=alamat-error")).toBeVisible({timeout: 2000});

    if (errorMessage != null){
        console.log("Tidak dapat menginput alamat menggunakan")
    } else{
        console.log("Alamat dapat diinput menggunakan angka, simbol, dan huruf")
    }
});

// Test case: input Customer number without less than 9 digit and greater than 13 digit
test('82. Customer address have max length attribute', async ({ webApp }) => {
    await navigateToCustomerData(webApp,"CILEGON")
    await inputCustomerAddress(webApp, "Jl. Purbasari");
    const maxlength= await webApp.locator('id=alamat').getAttribute("maxlength");

    if (maxlength !== null) {
        console.log(`The element has a maxlength with value: ${maxlength}`);
    } else {
        console.log('The element does not have a maxlength');
    }
});

// Test case: input Customer number without text
test('83. Customer number without text', async ({ webApp }) => {
    await navigateToCustomerData(webApp,"CILEGON")
    await inputCustomerPhone(webApp, "");
    await webApp.waitForTimeout(2000);
    await submitCustomer(webApp)
    await expect(webApp.locator("id=telepon-error")).toBeVisible({timeout: 4000});
});

// Test case: input Customer number with character
test('84. Customer number with character', async ({ webApp }) => {
    await navigateToCustomerData(webApp,"CILEGON")
    await inputCustomerPhone(webApp, "character");
    await webApp.waitForTimeout(2000);
    await submitCustomer(webApp)
    await expect(webApp.locator("id=telepon-error")).toBeVisible({timeout: 4000});
});


// Test case: input Customer number without less than 9 digit and greater than 13 digit
test('85. Customer number greater than 13 and less than 9', async ({ webApp }) => {
    await navigateToCustomerData(webApp,"CILEGON")
    await inputCustomerName(webApp, "0812345");
    await webApp.waitForTimeout(2000);
    await expect(webApp.locator("id=telepon-error")).toBeVisible({timeout: 4000});
    const maxlength= await webApp.locator('id=telepon').getAttribute("maxlength");

    if (maxlength !== null) {
        console.log(`The element has a maxlength with value: ${maxlength}`);
    } else {
        console.log('The element does not have a maxlength');
    }
});

// Test case: input Customer address with whitespace
test('86. Customer address with white space', async ({ webApp }) => {
    await navigateToCustomerData(webApp,"CILEGON")
    await inputCustomerAddress(webApp, "   ");
    await webApp.waitForTimeout(2000);
    await expect(webApp.locator("id=pemesan-error")).toBeVisible({timeout: 4000});
    await submitCustomer(webApp)
});


// Test case: input Passenger name without text
test('87. passenger name without text', async ({ webApp }) => {
    await navigateToCustomerData(webApp,"CILEGON")
    await inputPassengerName(webApp, "");
    await webApp.waitForTimeout(2000);
    await expect(webApp.locator("id=penumpang1-error")).toBeVisible({timeout: 4000});
    await submitCustomer(webApp)
});

// Test case: Checking checkbox
test('88. passenger name and customer name are same', async ({ webApp }) => {
    await navigateToCustomerData(webApp,"CILEGON")
    await inputPassengerName(webApp, "Sugoy");
    await webApp.locator("xpath=//label[@for='samacheck']").click()
    await webApp.waitForTimeout(3000);
});