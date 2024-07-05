// @ts-check
const {
      test,
      expect
} = require('./setup');


test('load website', async ({
      webApp
}) => {

      // Expect a title "to contain" a substring.
      const element = webApp.locator("//p[normalize-space()='Keberangkatan']");
      await expect(element).toBeVisible({
            timeout: 15_000
      });
});

test('login without input number phone', async ({
      webApp
}) => {
      // click to link /masuk
      await webApp.locator(".nav-link.ddaccount").click()

      // Click input with number phone.
      await webApp.locator("//button[normalize-space()='Dengan Nomor Telepon']").click();

      // Expects page to have a heading with the name of coba masuk dengan cara lain.
      await expect(webApp.locator("//a[normalize-space()='coba masuk dengan cara lain']")).toBeVisible();

      await webApp.locator("//button[@class='btn btn-block btn-primary ']").click();

      await expect(webApp.locator("//div[@class='invalid-feedback mb-0 d-block']")).toBeVisible();
});

test('login with input number phone less than nine digit', async ({
      webApp
}) => {

      // click to link /masuk
      await webApp.locator("xpath=//a[normalize-space()='Daftar/Masuk']").click()

      // Click input with number phone.
      await webApp.locator("//button[normalize-space()='Dengan Nomor Telepon']").click();

      // Expects page to have a heading with the name of coba masuk dengan cara lain.
      await expect(webApp.locator("//a[normalize-space()='coba masuk dengan cara lain']")).toBeVisible();

      await webApp
            .getByPlaceholder('ex: 081234567XXX')
            .fill("0811");

      await webApp.locator("//button[@class='btn btn-block btn-primary ']").click();

      await expect(webApp.locator("//div[@class='invalid-feedback mb-0 d-block']")).toBeVisible();
});


test('login with input number phone', async ({
      webApp
}) => {
      // click to link /masuk
      await webApp.locator(".nav-link.ddaccount").click()

      // Click input with number phone.
      await webApp.locator("//button[normalize-space()='Dengan Nomor Telepon']").click();

      // Expects page to have a heading with the name of coba masuk dengan cara lain.
      await expect(webApp.locator("//a[normalize-space()='coba masuk dengan cara lain']")).toBeVisible();


      await webApp
            .getByPlaceholder('ex: 081234567XXX')
            .fill("081234567890");

      await webApp.locator("//button[@class='btn btn-block btn-primary ']").click();

      await expect(webApp.getByRole("heading", {
            name: 'Masukan Kode OTP'
      })).toBeVisible({
            timeout: 5_000
      });

      await webApp
            .getByPlaceholder('Masukan 6 Digit Kode OTP')
            .fill('123456')

      await webApp.locator("//button[@class='btn btn-block first-bg-color text-white h-100']").click()
      // Create to handle autoclose

      await expect(webApp.locator("//p[@class='first-color text-uppercase text-center fs-18']")).toBeVisible({
            timeout: 15_000
      })
});

test('OTP invalid', async ({
      webApp
}) => {
      // click to link /masuk
      await webApp.locator(".nav-link.ddaccount").click()

      // Click input with number phone.
      await webApp.locator("//button[normalize-space()='Dengan Nomor Telepon']").click();

      // Expects page to have a heading with the name of coba masuk dengan cara lain.
      await expect(webApp.locator("//a[normalize-space()='coba masuk dengan cara lain']")).toBeVisible();


      await webApp
            .getByPlaceholder('ex: 081234567XXX')
            .fill("081234567890");

      await webApp.locator("//button[@class='btn btn-block btn-primary ']").click();

      await expect(webApp.getByRole("heading", {
            name: 'Masukan Kode OTP'
      })).toBeVisible({
            timeout: 5_000
      });

      await webApp
            .getByPlaceholder('Masukan 6 Digit Kode OTP')
            .fill('000000')

      await webApp.locator("//button[@class='btn btn-block first-bg-color text-white h-100']").click()

      webApp.on('dialog', async dialog => {
            // Verify type of dialog
            expect(dialog.type()).toContain('confirm');

            // Verify Dialog Message
            expect(dialog.message()).toContain('Gagal Authentifikasi Login');

            //Click on OK Button
            await dialog.accept();
      });
});

test('Resend OTP', async ({
      webApp
}) => {
      // click to link /masuk
      await webApp.locator(".nav-link.ddaccount").click()

      // Click input with number phone.
      await webApp.locator("//button[normalize-space()='Dengan Nomor Telepon']").click();

      // Expects page to have a heading with the name of coba masuk dengan cara lain.
      await expect(webApp.locator("//a[normalize-space()='coba masuk dengan cara lain']")).toBeVisible();


      await webApp
            .getByPlaceholder('ex: 081234567XXX')
            .fill("081234567890");

      await webApp.locator("//button[@class='btn btn-block btn-primary ']").click();

      await expect(webApp.getByRole("heading", {
            name: 'Masukan Kode OTP'
      })).toBeVisible({
            timeout: 5_000
      });

      await expect(webApp.locator("//span[@id='btn-resend']")).toBeVisible({
            timeout: 120000
      });

      await webApp.locator("path=//span[@id='btn-resend']").click();

      await expect(webApp.locator("path=//span[@id='btn-resend']")).toBeHidden({
            timeout: 3_000
      })
});

test('Without OTP', async ({
      webApp
}) => {
      // click to link /masuk
      await webApp.locator(".nav-link.ddaccount").click()

      // Click input with number phone.
      await webApp.locator("//button[normalize-space()='Dengan Nomor Telepon']").click();

      // Expects page to have a heading with the name of coba masuk dengan cara lain.
      await expect(webApp.locator("//a[normalize-space()='coba masuk dengan cara lain']")).toBeVisible();


      await webApp
            .getByPlaceholder('ex: 081234567XXX')
            .fill("081234567890");

      await webApp.locator("//button[@class='btn btn-block btn-primary ']").click();

      await expect(webApp.getByRole("heading", {
            name: 'Masukan Kode OTP'
      })).toBeVisible({
            timeout: 5_000
      });

      await webApp
            .getByPlaceholder('Masukan 6 Digit Kode OTP')
            .fill('')

      await webApp.locator("//button[@class='btn btn-block first-bg-color text-white h-100']").click()

      webApp.on('dialog', async dialog => {
            // Verify type of dialog
            expect(dialog.type()).toContain('confirm');

            // Verify Dialog Message
            expect(dialog.message()).toContain('Gagal Authentifikasi Login');

            //Click on OK Button
            await dialog.accept();
      });
});

test('Char OTP', async ({
      webApp
}) => {
      // click to link /masuk
      await webApp.locator(".nav-link.ddaccount").click()

      // Click input with number phone.
      await webApp.locator("//button[normalize-space()='Dengan Nomor Telepon']").click();

      // Expects page to have a heading with the name of coba masuk dengan cara lain.
      await expect(webApp.locator("//a[normalize-space()='coba masuk dengan cara lain']")).toBeVisible();


      await webApp
            .getByPlaceholder('ex: 081234567XXX')
            .fill("081234567890");

      await webApp.locator("//button[@class='btn btn-block btn-primary ']").click();

      await expect(webApp.getByRole("heading", {
            name: 'Masukan Kode OTP'
      })).toBeVisible({
            timeout: 5_000
      });

      await webApp
            .getByPlaceholder('Masukan 6 Digit Kode OTP')
            .fill('test')

      await webApp.locator("//button[@class='btn btn-block first-bg-color text-white h-100']").click()

      webApp.on('dialog', async dialog => {
            // Verify type of dialog
            expect(dialog.type()).toContain('confirm');

            // Verify Dialog Message
            expect(dialog.message()).toContain('Gagal Authentifikasi Login');

            //Click on OK Button
            await dialog.accept();
      });
});
