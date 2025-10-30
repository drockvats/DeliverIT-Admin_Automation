import { test, expect, chromium, Page, BrowserContext } from '@playwright/test';
import { HeaderPage } from './Home_HeaderPage';

test.describe('Header Tests', () => {
  let page: Page;
  let headerPage: HeaderPage;
  let context: BrowserContext;

  test.beforeEach(async () => {
    // Launch a new browser context with location permission
    context = await chromium.launchPersistentContext('', {
      permissions: ['geolocation'],
      geolocation: { latitude: 12.9716, longitude: 77.5946 },
      locale: 'en-US',
      headless: false,
    });

    [page] = context.pages();
    await page.goto('https://customer-qa.deliverit.net.in/', { waitUntil: 'domcontentloaded' });
    headerPage = new HeaderPage(page);
  });

  test.afterEach(async () => {
    await context.close();
  });

  test('Homepage Loads and Allows Location Permission', async () => {
    await expect(page).toHaveTitle(/DeliverIt/);
  });

  test('Verify logo is visible and clickable, leading to home page', async () => {
    await expect(headerPage.logo).toBeVisible();
    await headerPage.clickLogo();
    await expect(page).toHaveURL('https://customer-qa.deliverit.net.in/');
  });

  test('Confirm delivery info "Delivery by Tomorrow" is visible', async () => {
    const visible = await headerPage.isDeliveryInfoVisible('Delivery by Tomorrow');
    expect(visible).toBeTruthy();
  });

  test('Search input is visible with correct placeholder', async () => {
    await expect(headerPage.searchInput).toBeVisible();
    const placeholderOk = await headerPage.isSearchInputPlaceholder('Search for fresh vegetable...');
    expect(placeholderOk).toBeTruthy();
  });

  test('Standard delivery selected by default with "Next Day delivery" text', async () => {
    const selected = await headerPage.isStandardDeliverySelected();
    expect(selected).toBeTruthy();
    await expect(headerPage.standardDeliveryText).toHaveText('Next Day delivery');
  });

  test('Quick delivery selectable with "Delivery in 2 Hours" text visible', async () => {
    const visible = await headerPage.isQuickDeliveryVisible();
    expect(visible).toBeTruthy();
    await expect(headerPage.quickDeliveryText).toHaveText('Delivery in 2 Hours');
  });

  test('Login button visible and clickable leading to login page', async () => {
    await expect(headerPage.loginButton).toBeVisible();
    await headerPage.clickLoginButton();
    await expect(page).toHaveURL(/login/); // adjust if actual path differs
  });

  test('Cart icon is visible and reflects state', async () => {
    const visible = await headerPage.isCartIconVisible();
    expect(visible).toBeTruthy();
    // Future enhancement: add-to-cart and verify item count
  });
});
