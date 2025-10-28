import { test, expect } from '@playwright/test';

const baseUrl = 'https://admin-qa.deliverit.net.in';

test.describe.serial('Brands Page Tests', () => {
  let brandName: string; // shared variable across tests
  let brandId: string;
  test.beforeAll(() => {
    brandName = 'Brand Automation E1';
    brandId = '413';
  });

  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto(baseUrl);
    await page.getByRole('textbox', { name: 'Email' }).fill('Deepak.vats@uharvest.in');
    await page.getByRole('textbox', { name: 'Password' }).fill('Drock@9045');
    await page.getByRole('button', { name: 'Log in' }).click();

    await page.getByRole('textbox', { name: 'Please enter OTP character 1' }).fill('1');
  await page.getByRole('textbox', { name: 'Please enter OTP character 2' }).fill('3');
  await page.getByRole('textbox', { name: 'Please enter OTP character 3' }).fill('5');
  await page.getByRole('textbox', { name: 'Please enter OTP character 4' }).fill('7');
  await page.getByRole('textbox', { name: 'Please enter OTP character 5' }).fill('9');
  await page.getByRole('textbox', { name: 'Please enter OTP character 6' }).fill('0');
  await page.getByRole('button', { name: 'Verify OTP' }).click();

    // Navigate to the Brand page
    await page.locator('span', { hasText: 'Catalog' }).locator('i').click();
    await page.getByRole('link', { name: 'Brands' }).click();
    await expect(page.getByRole('heading', { name: 'Brands' })).toBeVisible();
  });

  // test.afterEach(async ({ page }) => {
  //   await page.close(); // closes the tab
  // });

  test('Verify Brand page URL', async ({ page }) => {
    await expect(page).toHaveURL(`${baseUrl}/brand`);
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
    await brandInput.fill(validBrandName);
    await submitButton.click();

    await expect(page.getByText(/Page Size:/)).toBeVisible();
  });

  test('Verify Add Brand', async ({ page }) => {
    const filepath = 'C:/Users/DeepakVats/Downloads/Image.png';
    //brandName = 'Brand Automation 26'; // assign global brand name

    await page.getByRole('button', { name: '+ Add brand' }).click();
    await page.waitForTimeout(1000);

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(filepath);
    await page.waitForTimeout(1000);

    await page.locator('input[name="title"]').fill(brandName);
    await page.getByRole('dialog').getByRole('combobox').selectOption('1');
    await page.getByRole('dialog').getByRole('button', { name: 'Submit' }).click();

    const successMessage = page.getByRole('alert').filter({ hasText: 'success' });
    await expect(successMessage).toBeVisible();
    console.log(`✅ Brand "${brandName}" created successfully`);
  });

  test('Verify Add Brand when brand already exist', async ({ page }) => {
    const filepath = 'C:/Users/DeepakVats/Downloads/Image.png';

    await page.getByRole('button', { name: '+ Add brand' }).click();
    await page.waitForTimeout(1000);

    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(filepath);
    await page.waitForTimeout(1000);

    await page.locator('input[name="title"]').fill(brandName); // reuse brandName
    await page.getByRole('dialog').getByRole('combobox').selectOption('1');
    await page.getByRole('dialog').getByRole('button', { name: 'Submit' }).click();

    const errorMessage = page.getByRole('alert').filter({ hasText: 'Record already exists' });
    await expect(errorMessage).toBeVisible();
    console.log(`⚠️ Brand "${brandName}" already exists`);
  });

test('Verify  Search with Brand name', async ({ page }) => {
    const brandInput = page.locator('input[name="name"]');
    const submitButton = page.getByRole('button', { name: 'Submit' });
    
    //const validBrandName = 'Test';

    // Enter brand name
    await brandInput.fill(brandName);

    // Submit form
    await submitButton.click();

    await expect(page.getByText('Page Size: 20 1 to 1 of 1')).toBeVisible();
    
  });

  test('Check Active/Inactive check box on brand', async ({ page }) => {
    const brandInput = page.locator('input[name="name"]');
    const submitButton = page.getByRole('button', { name: 'Submit' });
    
    await brandInput.fill(brandName);
    await submitButton.click();

    const brandRow = page.getByRole('row', { name: new RegExp(brandName, 'i') });
    await brandRow.getByRole('checkbox').click();
    await expect(page.getByRole('dialog').getByText('Confirmation')).toBeVisible();
    await page.getByRole('button',{name: 'Inactive'}).click();
    await expect(brandRow.getByRole('checkbox')).not.toBeChecked();

    //brand active

    await brandRow.getByRole('checkbox').click();
    await expect(page.getByRole('dialog').getByText('Confirmation')).toBeVisible();
    await page.getByRole('button',{name: 'Active'}).click();
    await expect(brandRow.getByRole('checkbox')).not.toBeChecked();

  });

  test('Verify the Search filter', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Brand Id' }).click();
    await page.getByRole('textbox', { name: 'Brand Id' }).fill(brandId);
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByRole('gridcell', { name: brandId })).toContainText(brandId.toString());

    await page.getByRole('button', { name: 'Reset' }).click();
    await page.getByLabel('Status').selectOption('1');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'Reset' }).click();
    await page.getByLabel('Status').selectOption('0');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'Reset' }).click();
    await page.getByLabel('Status').selectOption('1');
    await page.getByLabel('Status').press('Enter');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByLabel('Warehouse').selectOption('1');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByLabel('Warehouse').selectOption('8');
    await page.getByRole('button', { name: 'Submit' }).click();
  });

  // test('Delete the brand', async ({ page }) => {

  //   await page.getByRole('row', { name: `${brandName} logo 414` }).getByRole('button').nth(1).click();
  //   await expect(page.getByText('Confirmation')).toBeVisible();
  //   await page.getByText('Are you sure you want to').click();
  //   await page.getByRole('button', { name: 'Delete' }).click();
    
  // });
});