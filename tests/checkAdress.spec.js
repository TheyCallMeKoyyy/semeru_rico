const {
    test,
    expect
} = require('./setup');


test('login with input number phone less than nine digit', async ({
    webApp
}) => {
    await webApp.locator("//a[@class='nav-link'][normalize-space()='Kontak']").click()

    
});