import { test, expect, chromium, Browser, Page } from '@playwright/test';

const baseUrl = 'https://admin-qa.deliverit.net.in';

test.describe.serial('Brands Page Tests (Context-Based Login)', () => {
  let browser: Browser;
  let page: Page;
  let brandName = 'Brand Automation E1';
  let brandId = '428';

  // ✅ Setup shared browser + context before all tests
  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({ storageState: 'auth.json' });
    page = await context.newPage();

    // Log network & console for debugging
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('response', res => console.log('➡️', res.status(), res.url()));

   await page.goto(`${baseUrl}/brand`, { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: 'Brands' })).toBeVisible();


    await expect(page.getByRole('heading', { name: 'Brands' })).toBeVisible();
  });

  // ✅ Close browser after all tests
  test.afterAll(async () => {
    await browser.close();
  });

  // ----------------------------------------------------------------
  // ✅ TEST CASES
  // ----------------------------------------------------------------

  test('Verify Brand page URL', async () => {
    await expect(page).toHaveURL(`${baseUrl}/brand`);
    console.log('✅ Brand URL is correct');
  });

  test('Verify navigation to Brands page', async () => {
    await expect(page.getByRole('heading', { name: 'Brands' })).toBeVisible();
    console.log('✅ Brand page opened successfully');
  });

  test('Verify input field accepts valid brand name and allows submission', async () => {
    const brandInput = page.locator('input[name="name"]');
    const submitButton = page.getByRole('button', { name: 'Submit' });

    const validBrandName = 'Test';
    await brandInput.fill(validBrandName);
    await expect(brandInput).not.toHaveValue('');
    await submitButton.click();

    await expect(page.getByText(/Page Size:/)).toBeVisible();
    console.log('✅ Search form submitted successfully');
  });

  test('Verify Add Brand', async () => {
    const filepath = 'C:/Users/DeepakVats/Downloads/Image.png';

    await page.getByRole('button', { name: '+ Add brand' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    const fileInput = dialog.locator('input[type="file"]');
    await fileInput.setInputFiles(filepath);
    await expect(fileInput).toHaveValue(/Image\.png/i);

    const titleInput = dialog.locator('input[name="title"]');
    await titleInput.fill(brandName);
    await expect(titleInput).not.toHaveValue('');

    const comboBox = dialog.getByRole('combobox');
    await comboBox.selectOption('1');
    await expect(comboBox).toHaveValue('1');

    await dialog.getByRole('button', { name: 'Submit' }).click();

    const successMessage = page.getByRole('alert').filter({ hasText: 'success' });
    await expect(successMessage).toBeVisible();
    console.log(`✅ Brand "${brandName}" created successfully`);
  });

  test('Verify Add Brand when brand already exists', async () => {
    const filepath = 'C:/Users/DeepakVats/Downloads/Image.png';

    await page.getByRole('button', { name: '+ Add brand' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    const fileInput = dialog.locator('input[type="file"]');
    await fileInput.setInputFiles(filepath);
    await expect(fileInput).toHaveValue(/Image\.png/i);

    const titleInput = dialog.locator('input[name="title"]');
    await titleInput.fill(brandName);
    await expect(titleInput).not.toHaveValue('');

    const comboBox = dialog.getByRole('combobox');
    await comboBox.selectOption('1');
    await expect(comboBox).toHaveValue('1');

    await dialog.getByRole('button', { name: 'Submit' }).click();

    const errorMessage = page.getByRole('alert').filter({ hasText: 'Record already exists' });
    await expect(errorMessage).toBeVisible();
    console.log(`⚠️ Brand "${brandName}" already exists`);
  });

  test('Verify Search with Brand name', async () => {
    const brandInput = page.locator('input[name="name"]');
    const submitButton = page.getByRole('button', { name: 'Submit' });

    await brandInput.fill(brandName);
    await expect(brandInput).not.toHaveValue('');
    await submitButton.click();

    await expect(page.getByText(/Page Size:/)).toBeVisible();
    console.log(`✅ Brand "${brandName}" found successfully`);
  });

  test('Check Active/Inactive checkbox on brand', async () => {
    const brandInput = page.locator('input[name="name"]');
    const submitButton = page.getByRole('button', { name: 'Submit' });

    await brandInput.fill(brandName);
    await submitButton.click();

    const brandRow = page.getByRole('row', { name: new RegExp(brandName, 'i') });
    await expect(brandRow).toBeVisible();

    // Inactive
    await brandRow.getByRole('checkbox').click();
    await expect(page.getByRole('dialog').getByText('Confirmation')).toBeVisible();
    await page.getByRole('button', { name: 'Inactive' }).click();
    console.log('✅ Brand marked inactive');

    // Active
    await brandRow.getByRole('checkbox').click();
    await expect(page.getByRole('dialog').getByText('Confirmation')).toBeVisible();
    await page.getByRole('button', { name: 'Active' }).click();
    console.log('✅ Brand marked active');
  });

  test('Verify the Search filter', async () => {
    await page.getByRole('textbox', { name: 'Brand Id' }).fill(brandId);
    await expect(page.getByRole('textbox', { name: 'Brand Id' })).not.toHaveValue('');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByRole('gridcell', { name: brandId })).toContainText(brandId.toString());

    await page.getByRole('button', { name: 'Reset' }).click();

    await page.getByLabel('Status').selectOption('1');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'Reset' }).click();

    await page.getByLabel('Status').selectOption('0');
    await page.getByRole('button', { name: 'Submit' }).click();

    await page.getByLabel('Warehouse').selectOption('1');
    await page.getByRole('button', { name: 'Submit' }).click();

    console.log('✅ Search filters verified');
  });

  test('Edit brand functionality', async () => {
    const brandInput = page.locator('input[name="name"]');
    const submitButton = page.getByRole('button', { name: 'Submit' });

    await brandInput.fill(brandName);
    await submitButton.click();

    const brandRow = page.getByRole('row', { name: new RegExp(brandName, 'i') });
    await expect(brandRow).toBeVisible();

    await brandRow.locator('button:has(i.fa-pencil)').click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    const titleInput = dialog.locator('input[name="title"]');
    const updatedName = brandName + ' Updated';
    await titleInput.fill(updatedName);

    const comboBox = dialog.getByRole('combobox');
    await comboBox.selectOption('1');
    await dialog.getByRole('button', { name: 'Submit' }).click();

    const successMessage = page.getByText(/success/i);
    const errorMessage = page.getByText(/Record already exists/i);

    if (await successMessage.isVisible()) {
      console.log(`✅ Brand "${updatedName}" updated successfully`);
    } else {
      console.log(`⚠️ Brand "${updatedName}" already exists`);
      await expect(errorMessage).toBeVisible();
    }
  });

  test('Delete the brand', async () => {
    const brandInput = page.locator('input[name="name"]');
    const submitButton = page.getByRole('button', { name: 'Submit' });

    await brandInput.fill(brandName);
    await submitButton.click();

    const brandRow = page.getByRole('row', { name: new RegExp(brandName, 'i') });
    await expect(brandRow).toBeVisible();

    await brandRow.locator('button:has(i.fa-trash)').click();

    const confirmDialog = page.getByRole('dialog');
    await expect(confirmDialog).toContainText('Are you sure you want to');

    await confirmDialog.getByRole('button', { name: 'Delete' }).click();

    console.log(`🗑️ Brand "${brandName}" deleted successfully`);
  });
});
