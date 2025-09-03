// test-setup.ts
import { test as base } from '@playwright/test';
import { LoginPage } from './Login/loginPage';

const baseUrl = 'https://zealous-ground-0bb981c00.6.azurestaticapps.net/';

// Custom fixture banate hain jo LoginPage aur baseUrl handle karega
type MyFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await page.goto(baseUrl); // beforeEach ke barabar
    await use(loginPage);
    await page.close();       // afterEach ke barabar
  },
});

export { expect } from '@playwright/test';
