// headerPage.ts
import { Page } from '@playwright/test';

export class HeaderPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get logo() {
        return this.page.locator('img.header_logoPosition__cmj7l');
    }

    get deliveryInfo() {
        return this.page.locator('.currentLocation_deliveryBy__gmky2');
    }

    get searchInput() {
        return this.page.locator('input.search_seach-control__5XNrc');
    }

    get standardDeliveryOption() {
        return this.page.locator('.standardAndQuickTab_OrderDeliveryType__N7m2K.standardAndQuickTab_active__Kj8__');
    }

    get quickDeliveryOption() {
        return this.page.locator('.standardAndQuickTab_OrderDeliveryType__N7m2K:not(.standardAndQuickTab_active__Kj8__)');
    }

    get loginButton() {
        return this.page.locator('.profile_loginBtn1__Jaoqh button');
    }

    get cartIcon() {
        return this.page.locator('.headerCartIcon_profile_position-relative__VGFAM img');
    }

    async clickLogo() {
        await this.logo.click();
    }

    async isDeliveryInfoVisible(expectedText: string) {
        await this.deliveryInfo.isVisible();
        const text = await this.deliveryInfo.textContent();
        return text === expectedText;
    }

    async isSearchInputPlaceholder(expectedPlaceholder: string) {
        const placeholder = await this.searchInput.getAttribute('placeholder');
        return placeholder === expectedPlaceholder;
    }

    async isStandardDeliverySelected() {
        return await this.standardDeliveryOption.isVisible();
    }

    async isQuickDeliveryVisible() {
        return await this.quickDeliveryOption.isVisible();
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async isCartIconVisible() {
        return await this.cartIcon.isVisible();
    }
}