import { test, expect } from '@playwright/test';
import { LoginPage } from './loginPage';
 
const baseUrl = 'https://zealous-ground-0bb981c00.6.azurestaticapps.net/';

test.describe('Login Page Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto(baseUrl);
    });

      test.afterEach(async ({ page }) => {
    await page.close(); // closes the tab
  });

    test('should display login form', async () => {
        await expect(loginPage.emailInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
        await expect(loginPage.forgotPasswordLink).toBeVisible();
    });

    test('should allow user to enter email', async () => {
  await loginPage.enterEmail('admin@deliverit.com');
  await expect(loginPage.emailInput).toHaveValue('admin@deliverit.com');

  await loginPage.enterPassword('Sadmin#DIT@Uh$2025');
    await expect(loginPage.passwordInput).toHaveValue('Sadmin#DIT@Uh$2025');
    await loginPage.clickLoginButton();
    await loginPage.clickLogoutButton();
    });

    

    /*test('should login with valid credentials', async () => {
        await loginPage.enterEmail('admin@deliverit.com');
        await loginPage.enterPassword('Sadmin#DIT@Uh$2025');
        await loginPage.clickLoginButton();
        // Add assertion for successful login, e.g., checking URL or some element on the next page.
    });*/

    /*test('should navigate to forgot password page', async () => {
        await loginPage.clickForgotPassword();
        // Add assertion to confirm navigation to forgot password page, e.g., checking URL or element.
    });*/
});