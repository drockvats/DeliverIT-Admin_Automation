import { test, expect, chromium, Page, BrowserContext } from '@playwright/test';
import { HeaderPage } from './Home_HeaderPage';

test.describe('Header Tests', () => {
  let page: Page;
  let headerPage: HeaderPage;
  let context: BrowserContext;

  test.beforeEach(async () => {
    // Launch a new context for every test (so geolocation etc. are isolated)
    context = await chromium.launchPersistentContext('', {
      permissions: ['geolocation'],
      geolocation: { latitude: 28.5355, longitude: 77.3910 },
      locale: 'en-US',
      headless: false,
    });

    [page] = context.pages();
    await page.goto('https://customer-qa.deliverit.net.in/');
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

  test('Confirm that the delivery information ("Delivery by Tomorrow") is displayed correctly and is visible to the user.', async () => {
        await expect(headerPage.isDeliveryInfoVisible('Delivery by Tomorrow')).resolves.toBeTruthy();
    });

    test('Check that the search input field is present and has the placeholder text "Search for fresh vegetable...".', async () => {
        await expect(headerPage.searchInput).toBeVisible();
        await expect(headerPage.isSearchInputPlaceholder('Search for fresh vegetable...')).resolves.toBeTruthy();
    });

    test('Ensure that the "Standard" delivery option is selected by default and that the associated text "Next Day delivery" is displayed correctly.', async () => {
        await expect(headerPage.isStandardDeliverySelected()).resolves.toBeTruthy();
        await expect(headerPage.standardDeliveryOption.locator('.standardAndQuickTab_nextDay-text__D4O1V')).toHaveText('Next Day delivery');
    });

    test('Validate that the "Quick Delivery" option is selectable and that the associated text "Delivery in 2 Hours" is visible.', async () => {
        await expect(headerPage.isQuickDeliveryVisible()).resolves.toBeTruthy();
        await expect(headerPage.quickDeliveryOption.locator('.standardAndQuickTab_nextDay-text__D4O1V')).toHaveText('Delivery in 2 Hours');
    });

    test('Check switch toggle is working', async () => {

      await page.getByText('Quick Delivery').click();
      
      await page.getByText('Standard').click();
//       // Standard active check
//       const standardToggle = await page.getByText('Standard');
//       await expect(standardToggle).toHaveClass(/active/);

// // Quick Delivery active check
//       const quickToggle = await page.getByText('Quick Delivery');
//       await expect(quickToggle).toHaveClass(/active/);

    });

});
