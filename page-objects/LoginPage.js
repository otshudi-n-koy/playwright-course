export class LoginPage {
    constructor(page) {
       this.page = page 

       this.moveToSignuButton = page.locator('[data-qa="go-to-signup-button"]')
    }


    moveToSignup = async () => {
        await this.moveToSignuButton.waitFor()
        await this.moveToSignuButton.click()
        await this.page.waitForURL(/\/signup/, {timeout: 3000})
    }
}