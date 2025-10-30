import { Locator, Page } from '@playwright/test';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get emailInput(): Locator {
    return this.page.locator('#email');
  }

  get passwordInput(): Locator {
    return this.page.locator('#password-field');
  }

  get loginButton(): Locator {
    return this.page.locator('.btn.btn-save.w-75');
  }

  get logoutButton(): Locator {
    return this.page.locator('.logoutBtn');
  }
  

  get forgotPasswordLink(): Locator {
    return this.page.locator('.forgot-pass');
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async clickLogoutButton() {
        await this.logoutButton.click();
    }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

   async login(username: string, password: string) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
   }

  }
