import { test, expect } from '@playwright/test';

const baseUrl = 'https://admin-qa.deliverit.net.in/';

test.describe.serial('Brands Page Tests', () => {
  let catName: string; // shared variable across tests
  let brandId: string;
  test.beforeAll(() => {
    catName = 'Category 26_8';
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
    await page.getByRole('link', { name: 'Category', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'categories' })).toBeVisible();
  });

  // test.afterEach(async ({ page }) => {
  //   await page.close(); // closes the tab
  // });

  test('Verify Cat page URL', async ({ page }) => {
    await expect(page).toHaveURL(`${baseUrl}manage-category`);
    console.log('✅ Category URL is correct');
  });

  test('Check Active/Inactive check box on Category', async ({ page }) => {
    const catInput = page.locator('input[name="name"]');
    const submitButton = page.getByRole('button', { name: 'Submit' });
    
    await catInput.fill(catName);
    await submitButton.click();

    const brandRow = page.getByRole('row', { name: new RegExp(catName, 'i') });
    await brandRow.getByRole('checkbox').click();
    await expect(page.getByRole('dialog').getByText('Confirmation')).toBeVisible();
    await page.getByRole('button',{name: 'Inactive'}).click();
    await expect(brandRow.getByRole('checkbox')).not.toBeChecked();

    //Cat active

    await brandRow.getByRole('checkbox').click();
    await expect(page.getByRole('dialog').getByText('Confirmation')).toBeVisible();
    await page.getByRole('button',{name: 'Active'}).click();
    await expect(brandRow.getByRole('checkbox')).not.toBeChecked();

  });

  test('Category edit', async ({ page }) => {
    const catInput = page.locator('input[name="name"]');
    const submitButton = page.getByRole('button', { name: 'Submit' });
    
    await catInput.fill(catName);
    await submitButton.click();

    const brandRow = page.getByRole('row', { name: new RegExp(catName, 'i') });
  await expect(brandRow).toBeVisible();

  // Click the edit button inside that row
  await brandRow.locator('#cat-edit').click();

  await page.pause();


  });


  });