// brandsPage.ts
import { Page } from '@playwright/test';

export class BrandsPage {
    constructor(private page: Page, private baseUrl: string) {}

    get brandsLink() {
        return this.page.locator('a.sidebar-item.plain[href="/brand"]');
    }

    async navigateToBrands() {
        await this.brandsLink.click();
    }

    async isBrandsLinkVisible() {
        return await this.brandsLink.isVisible();
    }

    async isBrandsLinkAccessible() {
        return await this.brandsLink.isEnabled();
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    getBrandsPageUrl() {
        return `${this.baseUrl}/brand`;
    }
}
