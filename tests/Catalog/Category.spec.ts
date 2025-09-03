import { test, expect } from '@playwright/test';

const baseUrl = 'https://zealous-ground-0bb981c00.6.azurestaticapps.net/';

test.describe.serial('Brands Page Tests', () => {
  let brandName: string; // shared variable across tests
  let brandId: string;
  test.beforeAll(() => {
    brandName = 'Brand Automation 25';
    brandId = '413';
  });

  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto(baseUrl);
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@deliverit.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Sadmin#DIT@Uh$2025');
    await page.getByRole('button', { name: 'Log in' }).click();

    // Navigate to the Brand page
    await page.locator('span', { hasText: 'Catalog' }).locator('i').click();
    await page.getByRole('link', { name: 'Category' }).click();
    await expect(page.getByRole('heading', { name: 'categories' })).toBeVisible();
  });

  // test.afterEach(async ({ page }) => {
  //   await page.close(); // closes the tab
  // });

  test('Verify Brand page URL', async ({ page }) => {
    await expect(page).toHaveURL(`${baseUrl}manage-category`);
    console.log('✅ Category URL is correct');
  });

  });