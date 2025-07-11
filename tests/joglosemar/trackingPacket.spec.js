
/**
 * @description Test script untuk mengecek fitur Lacak Paket pada website.
 * Menggunakan Playwright dan Allure untuk dokumentasi dan pelaporan otomatis.
 */

const { config } = require('../../config');
const { test, expect } = require('../setup');

/**
 * @description Fungsi untuk mengakses halaman "Lacak Paket" dan mengisi kode resi.
 * @param {object} webApp - Objek Playwright untuk mengontrol browser.
 * @param {string} codeBooking - Kode resi yang akan dilacak.
 */

// Helper function to check booking with try-catch
async function cekTracking(webApp, codeBooking) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Lacak Paket and Check booking code packet',
    });

    try {
        await webApp.locator("xpath=(//a[normalize-space()='Lacak Paket'])[1]").click();
        await webApp.locator("xpath=(//input[@placeholder='Masukan Kode Disini'])[1]").click();
        await webApp.locator("xpath=(//input[@placeholder='Masukan Kode Disini'])[1]").fill(codeBooking);
        await webApp.locator("xpath=(//button[normalize-space()='Cek Paket'])[1]").click();
    } catch (error) {
        test.fail(`Error in cekTracking: ${error.message}`);
        throw error; // Re-throw the error after logging
    }
}

/**
 * @description Fungsi untuk memastikan informasi paket muncul setelah dilakukan pelacakan.
 * @param {object} webApp - Objek Playwright untuk mengontrol browser.
 * @param {string} codeBooking - Kode resi yang akan diverifikasi kemunculannya.
 */

// Helper function to check tracking info with try-catch
async function dataTracking(webApp, codeBooking) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Get Information Packet, while information packet is visible, checked',
    });

    try {
        await expect(webApp.locator(`p:text("${codeBooking}")`)).toBeVisible();
    } catch (error) {
        test.fail(`Error in dataTracking: ${error.message}`);
        throw error; // Re-throw the error after logging
    }
}

/**
 * @description Pengujian utama untuk mengecek fungsi lacak paket dengan kode booking.
 */

// Main test with try-catch
test('Tracking Packet', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Tracking Packet',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'severity: normal',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'platform: web',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'status: pass',
    });

    try {
        // Start the Tracking process
        await cekTracking(webApp, config.booking_code.packet);
        await dataTracking(webApp, config.booking_code.packet);
    } catch (error) {
        // Handle any error that might occur during the test
        test.fail(`Test failed: ${error.message}`);
        throw error; // Re-throw the error to mark the test as failed
    }
});
