const { test, expect } = require('@playwright/test');



exports.expect = expect
exports.test = test.extend({
    webApp: async ({ page }, use) => {
        await page.goto('https://tbk:development@kiatrans-web.asmat.app');
        await use(page)
    },
})