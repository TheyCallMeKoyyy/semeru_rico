const { channel } = require('diagnostics_channel');
const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * @description Memilih kota keberangkatan dari dropdown.
 * @param {import('@playwright/test').Page} webApp - Instance halaman web Playwright.
 * @param {string} departure - Nama kota keberangkatan.
 */

// Helper function to pick departure
async function pickDeparture(webApp, departure) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick departure',
    });
    await expect(webApp.locator(`xpath=(//span[normalize-space()='Pilih Keberangkatan'])[1]`)).toBeVisible();
    await webApp.locator(`xpath=(//div[normalize-space()='JATIASIH'])[1]`).click();
    await webApp.locator(`xpath=(//div[normalize-space()='JATIASIH'])[1]`).click();
}

/**
 * @description Memilih kota tujuan dari dropdown.
 * @param {import('@playwright/test').Page} webApp - Instance halaman web Playwright.
 * @param {string} arrival - Nama kota tujuan.
 */

// Helper function to pick arrival
async function pickArrival(webApp, arrival) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick arrival',
    });
    await expect(webApp.locator(`xpath=(//span[normalize-space()='EXIT TOL BOYOLALI'])[1]`)).toBeVisible();
    await webApp.locator(`xpath=(//div[@class='ss-option'][normalize-space()='BENDO'])[2]`).click();
    await webApp.locator(`xpath=(//div[@class='ss-option'][normalize-space()='BENDO'])[2]`).click();
}

/**
 * @description Memilih tanggal keberangkatan dari date picker.
 * @param {import('@playwright/test').Page} webApp - Instance halaman web Playwright.
 * @param {string} date - Tanggal keberangkatan (format: 'DD MMMM YYYY').
 */

// Helper function to select date
async function selectDate(webApp, date) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select travel date',
    });
    const dateField = webApp.locator(`(//input[@class='form-control form-pp datepicker flatpickr-input input active'])[1]`);
    await expect(dateField).toBeVisible();
    await dateField.click();
    
    // Next month
    await webApp.locator(`xpath=//span[@class='flatpickr-next-month']//*[name()='svg']`).click();
    await webApp.locator(`xpath=//span[@aria-label='${date}']`).click();
        
    
    //activating PP
    await webApp.locator("(//label[@for='is_pp'])[1]").click()

    const dateField = webApp.locator("(//input[@class='form-control form-pp datepicker tglpulang flatpickr-input input active'])[1]");
    await expect(dateField).toBeVisible();
    await dateField.click();
    
    // Next month
    await webApp.locator("xpath=//span[@class='flatpickr-next-month']").click();
    await webApp.locator(`xpath=//span[@aria-label='${returnDate}']`).click();
    
}


/**
 * @description Memasukkan data semua penumpang berdasarkan konfigurasi.
 * @param {import('@playwright/test').Page} webApp - Instance halaman web Playwright.
 */

// Helper function to input passenger data for multiple passengers
async function inputAllPassengerData(webApp) {
    const passengers = config.passenger_data.passengers;

    for (let i = 0; i < passengers.length; i++) {
        const passenger = passengers[i];

        // Penumpang pertama sekaligus pemesan
        if (i === 0) {
            await inputPassengerData(
                webApp,
                passenger.name,
                config.passenger_data.booker.email,
                config.passenger_data.booker.phone_number,
                config.passenger_data.custName
            );
        } else {
            // Klik tombol "Tambah Penumpang"
            const addBtn = webApp.locator(`xpath=//button[contains(., 'Tambah Penumpang')]`);
            if (await addBtn.isVisible()) {
                await addBtn.click();
                await webApp.waitForTimeout(500); // beri jeda biar form baru muncul
            }

            // Isi nama penumpang
            //await webApp.locator(`(//input[@id='penumpang2'])[1]`).fill(passenger.name);

            // Isi jenis kelamin
           // await webApp.locator('//div[6]//div[2]//div[1]//div[1]//label[2]').click();
        }
    }
}

/**
 * @description Memilih jumlah penumpang (opsional, tergantung UI).
 * @param {import('@playwright/test').Page} webApp - Instance halaman web Playwright.
 * @param {number} totalPassenger - Jumlah total penumpang.
 */

// Helper function to select passenger count
async function selectPassenger(webApp, totalPassenger) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select passenger count',
    });
   // await webApp.locator(`xpath=//select[@name='jm_penumpang']`).click();
    
    //const passengerCountOption = webApp.locator(`xpath=//div[normalize-space()='2 Orang']`); //Salah di sini
    //await expect(passengerCountOption).toBeVisible({ timeout: 3000 });
    //await passengerCountOption.click();
}

/**
 * @description Memilih jadwal keberangkatan dari daftar.
 * @param {import('@playwright/test').Page} webApp - Instance halaman web Playwright.
 */

// Helper function to select schedule
async function selectSchedule(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select travel schedule',
    });
    const scheduleButton = webApp.locator(`xpath=(//a[normalize-space()='Pilih'])[1]`);
    await scheduleButton.click();
}

/**
 * @description Mengisi data pemesan dan/atau penumpang pertama.
 * @param {import('@playwright/test').Page} webApp - Instance halaman web Playwright.
 * @param {string} name - Nama penumpang.
 * @param {string} email - Email pemesan.
 * @param {string} phoneNumber - Nomor telepon pemesan.
 * @param {string} custName - Nama pelanggan utama.
 * @param {string} [seatNumber] - Nomor kursi (opsional).
 */

// Helper function to input passenger data
async function inputPassengerData(webApp, name, email, phoneNumber, custName, seatNumber) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Input passenger details',
    });
    console.log(config.passenger_data.passengers.name)
    await webApp.locator(`xpath=//input[@id='pemesan']`).fill(config.passenger_data.custName); //ini yang aku ubah senseii 
    console.log(config.passenger_data.booker.email) 
    await webApp.locator(`xpath=//input[@placeholder='Masukkan Email']`).fill(config.passenger_data.booker.email);
    console.log(config.passenger_data.booker.phone_number) 
    await webApp.locator(`xpath=//input[@placeholder='Masukkan No. Telpon']`).fill(config.passenger_data.booker.phone_number);

    //untuk klik checkbox "Pemesan adalah penumpang"
    if(config.passenger_data.cust_name_same != 2){
        await webApp.locator("xpath=//label[@for='samacheck']").click()
    } else{
         //Input cust name
        await webApp.locator("id=penumpang1").
        fill(config.passenger_data.custName)
    }

    //click button "pilih alat kelamin"
    //await webApp.locator(`//div[4]//div[2]//div[1]//div[1]//label[1]`).click();
    //await webApp.locator(`//div[6]//div[2]//div[1]//div[1]//label[2]`).click();

    //click tombol "selanjutnya"
    await webApp.locator(`(//button[normalize-space()='Pilih Kursi'])[1]`).click();
}

/**
 * @description Memilih kursi dari layout kursi di UI.
 * @param {import('@playwright/test').Page} webApp - Instance halaman web Playwright.
 * @param {string} seatNumber - Nomor kursi yang akan dipilih.
 */

// Helper function to select seat
async function selectSeat(webApp, seatNumber) {
    test.info().annotations.push({
        type: 'allure.step',
        value: `Pilih kursi ${seatNumber}`,
    });

    // Ganti XPATH ini sesuai struktur HTML sistem kursi kamu
    const seatLocator = webApp.locator(`xpath=//div[@id='7']//p`);
    
    await expect(seatLocator).toBeVisible({ timeout: 5000 });
    await seatLocator.click();

    //Klik Selanjutnya Untuk Ke Page Pembayaran
    await webApp.locator(`(//button[normalize-space()='pembayaran'])[1]`).click();
}

/**
 * @description Memilih metode pembayaran dari halaman pembayaran.
 * @param {import('@playwright/test').Page} webApp - Instance halaman web Playwright.
 * @param {string} paymentMethod - Nama metode pembayaran (contoh: 'Gopay').
 */

// Helper function to select payment method
async function selectPayment(webApp, paymentMethod) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select payment method',
    });

    const section = webApp.locator(`xpath=//img[@alt='Mandiri Virtual Account']`);
    await section.click(); // expand first

    // const option = webApp.locator(`xpath=//p[normalize-space()='Pembayaran Instan']`);
    // await expect(option).toBeVisible({ timeout: 10000 });
    // await option.click();

    const payment = webApp.locator(`xpath=//img[@alt='${paymentMethod}']`);
    await payment.click(config.payment.collapse1);
}

/**
 * @description Menyetujui syarat & ketentuan lalu klik submit.
 * @param {import('@playwright/test').Page} webApp - Instance halaman web Playwright.
 */

// Helper function to checking button syarat n ketentuan
async function checkingTnc(webApp) {
    const tncButton = webApp.locator(`xpath=//label[contains(text(),'Silahkan tandai kotak ini sebagai bukti bahwa anda')]`);
    await tncButton.click()

    await webApp.locator(`xpath=(//button[@id='submit'])[1]`).click();
    await webApp.locator(`xpath=(//button[@type='button'][normalize-space()='Konfirmasi'])[1]`).click();
}

/**
 * @description Main test untuk menjalankan alur penuh proses reservasi.
 */

// Main test
test('reservation', async ({ webApp }) => {
    // Add Allure Labels for better categorization in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Reservation',
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

    // Start the reservation process
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Start reservation process',
    });

    // Pick departure and arrival
    await pickDeparture(webApp, config.journey.departure);
    await webApp.waitForTimeout(1000); // Replace pageWaitUntil with explicit timeout
    await pickArrival(webApp, config.journey.arrival);
    
    // Select date and passenger count if needed
    await selectDate(webApp, config.journey.date);
    //if (config.journey.passenger_count > 1) {
        await selectPassenger(webApp, config.journey.passenger_count);
    //}
    
    // Search for available schedules
    await webApp.locator("xpath=(//button[normalize-space()='Cari'])[1]").click();
    
    // Select a schedule
    await selectSchedule(webApp);
    
    // Input passenger details
    await inputAllPassengerData(webApp);
    
    // Select seat
    await selectSeat(webApp, config.passenger_data.seat_number);

    if(config.voucher.freepass != ''){
        await usingVoucher(webApp, config.voucher.freepass)
    }
    else if(config.voucher.harga != ''){
        await usingVoucher(webApp, config.voucher.harga)
    }
    else if(config.voucher.diskon != ''){
        await usingVoucher(webApp, config.voucher.diskon)
    }

    // Select payment method
    await selectPayment(webApp, config.payment.collapse1.gopay);
    
    // Accept terms and submit
    await checkingTnc(webApp)
    
});