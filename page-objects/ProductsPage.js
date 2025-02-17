import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js"
import { isDesktopViewport } from "../utils/isDesktopViewport.js"

export class ProductsPage {
    constructor(page) {
        this.page = page

        this.addButtons = page.locator('[data-qa="product-button"]')
    }
    
    visit = async () => {
        await this.page.goto("/")
    }

    addProductToBasket = async (index) => {
        const specificAddButton = this.addButtons.nth(index)
        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        // only desktop viewport
        let basketCountBeforeAdding
        if (isDesktopViewport(this.page)){
            basketCountBeforeAdding = await navigation.getBasketCount()
        }
        
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")
        // only desktop viewport
        if (isDesktopViewport(this.page)){
            const basketCountAfterAdding = await navigation.getBasketCount()
            expect (basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
        }
    }
}