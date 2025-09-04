import { test, expect } from '@playwright/test';
import { Console } from 'console';

const baseUrl = 'https://zealous-ground-0bb981c00.6.azurestaticapps.net/';

test.describe.serial('Coupon Page Tests', () => {

    let couponCode: string;
    let couponTitle: string;

    test.beforeAll(() => {
    couponCode = "TC00012";
    couponTitle = "Test 00012";
  });
 
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto(baseUrl);
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@deliverit.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Sadmin#DIT@Uh$2025');
    await page.getByRole('button', { name: 'Log in' }).click();

    //Navigate to the coupon page

    await page.locator('span', { hasText: 'Promotions' }).locator('i').click();
    await page.getByRole('link', { name: 'Coupons' }).click();
    await expect(page.getByRole('heading', { name: 'Coupons' })).toBeVisible();
  });

  test('Verify the coupon page URL', async({page}) => {
    
    await expect(page).toHaveURL(`${baseUrl}offer`);
    console.log('✅ Coupon Page URL is correct');

  });

  test('Add New Coupon', async({page}) => {

    await page.getByRole('link', { name: '+ Add Coupon' }).click();
    await expect(page.getByRole('heading', { name: 'Add Coupon' })).toBeVisible();
    await page.locator('select[name="ware_house_id"]').selectOption('1');
    await page.getByRole('textbox', { name: 'Title' }).click();
  await page.getByRole('textbox', { name: 'Title' }).fill(couponTitle);
  await page.getByRole('textbox', { name: 'Coupon Code' }).click();
  await page.getByRole('textbox', { name: 'Coupon Code' }).fill(couponCode);
  await page.locator('select[name="discountType"]').selectOption('2');
  await page.getByRole('textbox', { name: 'Discount', exact: true }).click();
  await page.getByRole('textbox', { name: 'Discount', exact: true }).fill('1000');
  await page.getByRole('textbox', { name: 'Max Discount Amount' }).click();
  await page.getByRole('textbox', { name: 'Max Discount Amount' }).fill('100');
  await page.getByRole('textbox', { name: 'Minimum Cart Value' }).click();
  await page.getByRole('textbox', { name: 'Minimum Cart Value' }).fill('1000');
  await page.getByRole('textbox', { name: 'Discount', exact: true }).click();
  await page.getByRole('button', { name: 'New Users' }).click();
  await page.getByRole('button', { name: 'New Users' }).click();
  await page.getByRole('button', { name: 'One-time' }).click();
  await page.getByPlaceholder('Start Date').fill('2025-09-03');
  await page.getByPlaceholder('End Date').fill('2025-09-04');
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).fill('Test');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('alert').filter({ hasText: 'success' })).toBeVisible();

  });

  test('Add existing Coupon', async({page}) => {

    await page.getByRole('link', { name: '+ Add Coupon' }).click();
    await expect(page.getByRole('heading', { name: 'Add Coupon' })).toBeVisible();
    await page.locator('select[name="ware_house_id"]').selectOption('1');
    await page.getByRole('textbox', { name: 'Title' }).click();
  await page.getByRole('textbox', { name: 'Title' }).fill(couponTitle);
  await page.getByRole('textbox', { name: 'Coupon Code' }).click();
  await page.getByRole('textbox', { name: 'Coupon Code' }).fill(couponCode);
  await page.locator('select[name="discountType"]').selectOption('2');
  await page.getByRole('textbox', { name: 'Discount', exact: true }).click();
  await page.getByRole('textbox', { name: 'Discount', exact: true }).fill('1000');
  await page.getByRole('textbox', { name: 'Max Discount Amount' }).click();
  await page.getByRole('textbox', { name: 'Max Discount Amount' }).fill('100');
  await page.getByRole('textbox', { name: 'Minimum Cart Value' }).click();
  await page.getByRole('textbox', { name: 'Minimum Cart Value' }).fill('1000');
  await page.getByRole('textbox', { name: 'Discount', exact: true }).click();
  await page.getByRole('button', { name: 'New Users' }).click();
  await page.getByRole('button', { name: 'New Users' }).click();
  await page.getByRole('button', { name: 'One-time' }).click();
  await page.getByPlaceholder('Start Date').fill('2025-09-03');
  await page.getByPlaceholder('End Date').fill('2025-09-04');
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).fill('Test');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('alert').filter({ hasText: 'Record already exists' })).toBeVisible();
  await console.log('Coupon code "" is already exists')

  });

test('Coupon Active/Inactive', async ({ page }) => {
  const couponCode = 'CO100';

  // Search coupon
  await page.getByRole('textbox', { name: 'Coupon Code' }).fill(couponCode);
  await page.getByRole('button', { name: 'Submit' }).click();

  // Wait until row with couponCode is visible
  const couponRow = page.locator('.ag-center-cols-container').locator(`text=${couponCode}`);
  await expect(couponRow).toBeVisible({ timeout: 10000 });

  // Get the checkbox inside the same row
  const checkbox = couponRow.locator('xpath=..').locator('input.form-check-input');

  // Toggle inactive
  await checkbox.click();
  await expect(page.getByRole('dialog').getByText('Confirmation')).toBeVisible();
  await page.getByRole('button', { name: 'Inactive' }).click();
  await expect(checkbox).not.toBeChecked();

  // Toggle active again
  await checkbox.click();
  await expect(page.getByRole('dialog').getByText('Confirmation')).toBeVisible();
  await page.getByRole('button', { name: 'Active' }).click();
  await expect(checkbox).toBeChecked();
});


    });