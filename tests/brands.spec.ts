import { test, expect } from '@playwright/test';

const baseUrl = 'https://zealous-ground-0bb981c00.6.azurestaticapps.net/';

test.describe('Brands Page Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto(baseUrl);
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@deliverit.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Sadmin#DIT@Uh$2025');
    await page.getByRole('button', { name: 'Log in' }).click();
    // Navigate to the Brand page
    await page.locator('span', { hasText: 'Catalog' }).locator('i').click();
    await page.getByRole('link', { name: 'Brands' }).click();
    //await expect(page.getByRole('heading', { name: 'Brands' })).toBeVisible();
  });

 test('Verify Brand page URL', async ({ page }) => {
    await expect(page).toHaveURL(`${baseUrl}brand`);
    console.log('✅ Brand URL is correct');

  });

  test('Verify navigation to Brands page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Brands' })).toBeVisible();
    console.log('✅ Brand page is open successfully');
  });

  test('Verify input field accepts valid brand name and allows submission without errors', async ({ page }) => {
    const brandInput = page.locator('input[name="name"]');
    const submitButton = page.getByRole('button', { name: 'Submit' });
    
    const validBrandName = 'Test';

    // Enter brand name
    await brandInput.fill(validBrandName);

    // Submit form
    await submitButton.click();

    await expect(page.getByText('Page Size: 20 1 to 2 of 2')).toBeVisible();
    
  });

 test('Verify Add Brand', async ({ page }) => {
const filepath = 'C:/Users/DeepakVats/Downloads/Image.png';

const brandName = 'Brand Automation 9';
  await page.getByRole('button', { name: '+ Add brand' }).click();
  await page.getByRole('button', { name: 'Choose File' }).click();
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles("C:/Users/DeepakVats/Downloads/Image.png");
  await page.locator('input[name="title"]').click();
  await page.locator('input[name="title"]').fill(brandName);
  await page.getByRole('dialog').getByRole('combobox').selectOption('1');
  await page.getByRole('dialog').getByRole('button', { name: 'Submit' }).click();

   const successMessage = page.getByText('success');
  const errorMessage = page.getByText('Record already exists');

  if (await successMessage.isVisible()) {
    console.log(`✅ Brand "${brandName}" created successfully`);
    await expect(successMessage).toBeVisible();
  } else {
    console.log(`⚠️ Brand "${brandName}" already exists`);
    await expect(errorMessage).toBeVisible();
  }

  });
  

});
