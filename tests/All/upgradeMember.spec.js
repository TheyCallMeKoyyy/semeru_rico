// @ts-check
const { test, expect } = require('../setup');

async function navigateToUpgradeMember(webApp) {
    const profileLocator = webApp.locator("xpath=//a[normalize-space()='Profile']");
    
    await webApp.locator("id=login").click();
    await expect(webApp.locator("xpath=//a[normalize-space()='Profile']")).toBeVisible({timeout: 2000});
    await profileLocator.click()

    await webApp.locator("xpath=//button[normalize-space()='Update Member']");
}

async function inputImage(webApp, faceImage, identityID){
    const fileInputFace = webApp.getByPlaceholder("Masukan Foto Selfi")
    const fileInputIdentity = webApp.getByPlaceholder("Masukan Foto Identitas KTP")


    await fileInputFace.setInput("../public/images/" + faceImage)
    await fileInputIdentity.setInput("../public/images" + identityID)
}

async function inputMember(webApp){
    await webApp.fill("id=tempat_lahir", "Bandung");
    await webApp.fill("id=tgl_lahir", 'July 9, 1998');
    await webApp.fill("xpath=//input[@placeholder='No KTP']", '3277012201770077');
    await webApp.fill("id=alamat", 'Jl. Purbaraya No.16');
    await webApp.fill("xpath=//input[@placeholder='Kode Pos']", '32779');
    await webApp.fill("id=kota", 'Bandoeng');
    await inputImage(webApp, 'face.jpg', 'identity.jpg')
    await webApp.click("id=submit")
    await webApp.click("xpath=//button[@onclick='redirectToProfile()']")
}


test('147. Upgrade Member', async ({ webApp})=>{
    test.setTimeout(120000)
    await inputMember(webApp)
})
