const { test, expect } = require('@playwright/test');



exports.expect = expect
exports.test = test.extend({
    webApp: async ({ page }, use) => {
        await page.goto(process.env.URL);
        await use(page)
    },
})