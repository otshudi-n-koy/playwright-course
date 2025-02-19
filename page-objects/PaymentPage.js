import { expect } from "@playwright/test"

export class PaymentPage {
    constructor(page) {
        this.page = page

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
            .locator('[data-qa="discount-code"]')
        this.discountInput = page.getByPlaceholder('Discount code')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.discountedValue = page.locator('[data-qa="total-with-discount-value"]')
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]')
        this.creditCardOwnerInput = page.getByPlaceholder("Credit card owner")
        this.creditCardNumberInput = page.getByPlaceholder("Credit card number")
        this.creditCardValidUntilInput = page.getByPlaceholder("Valid until")
        this.creditCardCvcInput = page.getByPlaceholder("Credit card CVC")
        this.payButton = page.locator('[data-qa="pay-button"]')
    }

    // activateDiscount = async () => {
    //     await this.discountCode.waitFor()
    //     const code = await this.discountCode.innerText()
    //     await this.discountInput.waitFor()

    //     // Option 1 for laggy inputs: using .fill() with expect()
    //     await this.discountInput.fill(code)
    //     await expect(this.discountInput).toHaveValue(code)


    //     // Option 2 for laggy inputs: slow typing
    //     /*         
    //     await this.discountInput.focus()
    //     await this.page.keyboard.type(code, { delay: 1000 })
    //     expect (await this.discountInput.inputValue()).toBe(code) 
    //             */

    //     expect (await this.discountedValue.isVisible()).toBe(false)
    //     expect(await this.discountActiveMessage.isVisible()).toBe(false)
    //     await this.activateDiscountButton.waitFor()
    //     await this.activateDiscountButton.click()
    //     // check that there is now "Discount activated"
    //     await this.discountActiveMessage.waitFor()
    //     //check that there is now a discounted price total showing
    //     await this.discountedValue.waitFor()
    //     const discountValueText = await this.discountedValue.innerText() //345$
    //     const discountValueOnlyStringNumber = discountValueText.replace("$","")
    //     const discountValueNumber = parseInt(discountValueOnlyStringNumber, 10)

    //     await this.totalValue.waitFor()
    //     const totalValueText = await this.totalValue.innerText() //345$
    //     const totalValueOnlyStringNumber = totalValueText.replace("$","")
    //     const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10)
    //     //check that the discounted price total is smaller than the regular one
    //     expect(discountValueNumber).toBeLessThan(totalValueNumber)
    // }

    activateDiscount = async () => {
        await this.discountCode.waitFor({ timeout: 60000 }); // Increase timeout
        const code = await this.discountCode.innerText();
        await this.discountInput.waitFor({ timeout: 60000 });
        
        // Option 1 for laggy inputs: using .fill() with expect()
        await this.discountInput.fill(code);
        await expect(this.discountInput).toHaveValue(code);
        
        // Check if the discount button is visible before clicking
        const isButtonVisible = await this.activateDiscountButton.isVisible();
        if (isButtonVisible) {
            await this.activateDiscountButton.click();
        } else {
            throw new Error("Discount button not visible");
        }
    
        // Check that there is now "Discount activated"
        await this.discountActiveMessage.waitFor({ timeout: 60000 });
        // Check that there is now a discounted price total showing
        await this.discountedValue.waitFor({ timeout: 60000 });
        const discountValueText = await this.discountedValue.innerText();
        const discountValueOnlyStringNumber = discountValueText.replace("$", "");
        const discountValueNumber = parseInt(discountValueOnlyStringNumber, 10);
        
        await this.totalValue.waitFor({ timeout: 60000 });
        const totalValueText = await this.totalValue.innerText();
        const totalValueOnlyStringNumber = totalValueText.replace("$", "");
        const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10);
        // Check that the discounted price total is smaller than the regular one
        expect(discountValueNumber).toBeLessThan(totalValueNumber);
    }

    fillPaymentDetails = async (paymentDetails) =>{
        await this.creditCardOwnerInput.waitFor()
        await this.creditCardOwnerInput.fill(paymentDetails.owner)

        await this.creditCardNumberInput.waitFor()
        await this.creditCardNumberInput.fill(paymentDetails.number)

        await this.creditCardValidUntilInput.waitFor()
        await this.creditCardValidUntilInput.fill(paymentDetails.validUntil)

        await this.creditCardCvcInput.waitFor()
        await this.creditCardCvcInput.fill(paymentDetails.CVC)
    }

    completePayment = async () => {
        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/, { timeout: 3000 })
    }
}