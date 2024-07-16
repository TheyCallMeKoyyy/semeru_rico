const {
    test,
    expect
} = require('./setup');



async function checkTicket(webApp, codeBooking) {
    try {
        await webApp.locator("xpath=//a[normalize-space()='Cek Tiket']").click();
        await webApp.getByPlaceholder("Masukan Kode Disini").fill(codeBooking);
        await webApp.waitForTimeout(3000);
        await webApp.locator("xpath=//button[normalize-space()='Cek Pesanan']").click();
        await webApp.waitForTimeout(4000);
    } catch (err) {
        console.error("Error checking ticket:", err);
        throw err; // Rethrow the error to be handled by the caller
    }
}

async function changePaymentMethod(webApp, paymentMethod) {
    try {
        // await webApp.waitForTimeout(2000);
        await webApp.locator("xpath=//button[@class='btn btn-radius btn-block btn-primary']").click();
        await webApp.locator(`xpath=//img[@alt='${paymentMethod}']`).click();
        // await webApp.waitForTimeout(1000);
        await webApp.locator("xpath=//button[@type='submit']").click();
        // await webApp.waitForTimeout(3000);
        await expect(webApp.locator("xpath=//div[contains(text(),'Berhasil Mengubah Pembayaran !')]")).toBeVisible();
        console.log("Berhasil mengubah pembayaran ke " + paymentMethod);
    } catch (err) {
        console.error("Gagal mengubah pembayaran ke " + paymentMethod);
    }
}

async function toTicketChecking(webApp, codeBooking) {
    const listPaymentMethod = [
        'Pembayaran Telkom (ATM, E-Banking, M-Banking)', 'Jenius', 'GOPAY', 'OCTO Clicks', 'Ovo', 'Shopeepay', 'QRIS',
        'Kartu Kredit', 'Dana', 'Indodana', 'BCA Virtual Account', 'KEB Hana Virtual Account', 'Mandiri Virtual Account',
        'BRI Virtual Account', 'PermataVirtual Account', 'BJB Virtual Account', 'BTN Virtual Account', 'BNI Virtual Account',
        'BSI Virtual Account', 'Muamalat Virtual Account', 'CIMB Virtual Account', 'Danamon Virtual Account', 'Maybank Virtual Account',
        'BNC Virtual Account', 'Alfamart', 'Indomaret'
    ];

    await checkTicket(webApp, codeBooking);

    for (const paymentMethod of listPaymentMethod) {
        await changePaymentMethod(webApp, paymentMethod);
    }
}

test('Changing payment method', async ({ webApp }) => {
    test.setTimeout(300000);
    await toTicketChecking(webApp, "BBSI24071683MB"); //input booking code
});
