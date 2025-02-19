import { test } from "@playwright/test"
import { MyAccountPage } from "./../page-objects/MyAccountPage.js"
import { getLoginToken } from "./../api-calls/getLoginToken.js"
import { adminDetails } from "./../data/userDetails.js"

test.skip ("My Account using cookie injection", async ({ page }) => {
    // Make a request to get login token
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)
    // Inject the login token into the browser
    const myAccount = new MyAccountPage(page)
    await myAccount.visit() 
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    //await page.pause()
} )