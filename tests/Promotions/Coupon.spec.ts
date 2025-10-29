import { test, expect } from '@playwright/test';
import { Console } from 'console';

const baseUrl = 'https://admin-qa.deliverit.net.in/';

test.describe.serial('Coupon Page Tests', () => {

    let couponCode: string;
    let couponTitle: string;

    test.beforeAll(() => {
    couponCode = `USR${Date.now()}`;
    couponTitle = `Test ${Date.now()}`;
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

  //Check coupon is displayed in the table

    const couponRow = page.getByRole('row', { name: new RegExp(couponCode, 'i') });
  await expect(couponRow).toBeVisible();
  console.log('Coupon code is exist in the Coupon table')

  });

  test('Add existing Coupon', async({page}) => {

    await page.getByRole('link', { name: '+ Add Coupon' }).click();
    await expect(page.getByRole('heading', { name: 'Add Coupon' })).toBeVisible();
    await page.locator('select[name="ware_house_id"]').selectOption('1');
    await page.getByRole('textbox', { name: 'Title' }).click();
  await page.getByRole('textbox', { name: 'Title' }).fill(couponTitle);
  await page.getByRole('textbox', { name: 'Coupon Code' }).click();
  await page.getByRole('textbox', { name: 'Coupon Code' }).fill('TCS19991');
  await page.locator('select[name="discountType"]').selectOption('2');
  await page.getByRole('textbox', { name: 'Discount', exact: true }).click();
  await page.getByRole('textbox', { name: 'Discount', exact: true }).fill('1000');
  await page.getByRole('textbox', { name: 'Max Discount Amount' }).click();
  await page.getByRole('textbox', { name: 'Max Discount Amount' }).fill('100');
  await page.getByRole('textbox', { name: 'Minimum Cart Value' }).click();
  await page.getByRole('textbox', { name: 'Minimum Cart Value' }).fill('1000');
  await page.getByRole('textbox', { name: 'Discount', exact: true }).click();
  await page.getByRole('button', { name: 'New Users' }).click();
  await page.getByRole('button', { name: 'One-time' }).click();
  await page.getByPlaceholder('Start Date').fill('2025-09-03');
  await page.getByPlaceholder('End Date').fill('2025-09-04');
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).fill('Test');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('alert').filter({ hasText: 'Record already exists' })).toBeVisible();
  await console.log('Coupon code "" is already exists')

  await page.goBack();

  //AFTER Success, it will display in the table

  await page.getByRole('textbox', { name: 'Coupon Code' }).fill("TCS19991");
  await page.getByRole('button', { name: 'Submit' }).click();
  const couponRow = page.getByRole('row', { name: new RegExp("TCS19991", 'i') });
  await expect(couponRow).toBeVisible();
  console.log('Coupon code is exist in the Coupon table: ${couponCode}');



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

test('Verify Is Hidden toggle works', async ({ page }) => {
  await page.getByRole('link', { name: '+ Add Coupon' }).click();
  await page.getByRole('checkbox', { name: 'Is Hidden' }).check();
  await expect(page.getByRole('checkbox', { name: 'Is Hidden' })).toBeChecked();

  await page.getByRole('checkbox', { name: 'Is Hidden' }).uncheck();
  await expect(page.getByRole('checkbox', { name: 'Is Hidden' })).not.toBeChecked();
});


test('Create coupon for specific user', async ({ page }) => {
  
  // Generate unique coupon code
  const couponCode = `USR${Date.now()}`;
  
  // Open Add Coupon form
  await page.getByRole('link', { name: '+ Add Coupon' }).click();
  await expect(page.getByRole('heading', { name: 'Add Coupon' })).toBeVisible();

  // Fill coupon details
  await page.locator('select[name="ware_house_id"]').selectOption('1');
  await page.getByRole('textbox', { name: 'Title' }).fill('User Special Coupon');
  await page.getByRole('textbox', { name: 'Coupon Code' }).fill(couponCode);
  await page.locator('select[name="discountType"]').selectOption('2'); // Percentage
  await page.getByRole('textbox', { name: 'Discount', exact: true }).fill('10');
  await page.getByRole('textbox', { name: 'Max Discount Amount' }).fill('100');
  await page.getByRole('textbox', { name: 'Minimum Cart Value' }).fill('500');

  // Select Specific User
  await page.getByRole('button', { name: 'Specific User' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog').getByRole('heading', { name: 'Select User' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Search Name..' }).fill('6500');
  await page.getByRole('checkbox', { name: 'Burari Outlet undefined-' }).check();
  await page.getByRole('button', { name: 'Save' }).click();

  //Select Frequecy

  await page.getByRole('button', { name: 'One-time' }).click();

  //Select order type Standard or Quick

  await page.locator('select[name="orderType"]').selectOption('quick delivery');

  // Dates and description
  await page.getByPlaceholder('Start Date').fill('2025-09-05');
  await page.getByPlaceholder('End Date').fill('2025-09-15');
  await page.getByRole('textbox', { name: 'Description' }).fill('Special 10% OFF for user 6500');

  // Submit and verify success
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByRole('alert').filter({ hasText: 'success' })).toBeVisible();

});

test('Delete Coupon', async ({ page }) => {
  const couponCode = `USR${Date.now()}`;
  
  // Open Add Coupon form
  await page.getByRole('link', { name: '+ Add Coupon' }).click();
  await expect(page.getByRole('heading', { name: 'Add Coupon' })).toBeVisible();

  // Fill coupon details
  await page.locator('select[name="ware_house_id"]').selectOption('1');
  await page.getByRole('textbox', { name: 'Title' }).fill('User Special Coupon');
  await page.getByRole('textbox', { name: 'Coupon Code' }).fill(couponCode);
  await page.locator('select[name="discountType"]').selectOption('2'); // Percentage
  await page.getByRole('textbox', { name: 'Discount', exact: true }).fill('10');
  await page.getByRole('textbox', { name: 'Max Discount Amount' }).fill('100');
  await page.getByRole('textbox', { name: 'Minimum Cart Value' }).fill('500');
  await page.getByRole('button', { name: 'All User' }).click();
  await page.getByRole('button', { name: 'One-time' }).click();
  await page.getByPlaceholder('Start Date').fill('2025-09-05');
  await page.getByPlaceholder('End Date').fill('2025-09-15');
  await page.getByRole('textbox', { name: 'Description' }).fill('Delete test coupon');

  // Submit
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('alert').filter({ hasText: 'success' })).toBeVisible();
  console.log(`Created coupon: ${couponCode}`);

  // Delete coupon (using trash button)

  await page.getByRole('textbox', { name: 'Coupon Code' }).fill(couponCode);
  await page.getByRole('button', { name: 'Submit' }).click();

  const couponRow = page.getByRole('row', { name: new RegExp(couponCode, 'i') });
    await expect(couponRow).toBeVisible();

    await couponRow.locator('button:has(i.fa-trash)').click();

  // Confirm deletion
  await expect(page.getByText('Confirmation')).toBeVisible();
  await page.getByRole('button', { name: 'delete' }).click();

  // Verify deletion success
  await expect(page.getByRole('alert').filter({ hasText: 'success' })).toBeVisible();

  console.log(`coupon is Deleted: ${couponCode}`);
});

test('Search Coupon with Coupon Code', async ({ page }) => {
  const couponCode = `USR${Date.now()}`;
  
  // Open Add Coupon form
  await page.getByRole('link', { name: '+ Add Coupon' }).click();
  await expect(page.getByRole('heading', { name: 'Add Coupon' })).toBeVisible();

  // Fill coupon details
  await page.locator('select[name="ware_house_id"]').selectOption('1');
  await page.getByRole('textbox', { name: 'Title' }).fill('User Special Coupon');
  await page.getByRole('textbox', { name: 'Coupon Code' }).fill(couponCode);
  await page.locator('select[name="discountType"]').selectOption('2'); // Percentage
  await page.getByRole('textbox', { name: 'Discount', exact: true }).fill('10');
  await page.getByRole('textbox', { name: 'Max Discount Amount' }).fill('100');
  await page.getByRole('textbox', { name: 'Minimum Cart Value' }).fill('500');
  await page.getByRole('button', { name: 'All User' }).click();
  await page.getByRole('button', { name: 'One-time' }).click();
  await page.getByPlaceholder('Start Date').fill('2025-09-05');
  await page.getByPlaceholder('End Date').fill('2025-09-15');
  await page.getByRole('textbox', { name: 'Description' }).fill('Delete test coupon');

  // Submit
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('alert').filter({ hasText: 'success' })).toBeVisible();
  console.log(`Created coupon: ${couponCode}`);

  // Search coupon with coupon code

  await page.getByRole('textbox', { name: 'Coupon Code' }).fill(couponCode);
  await page.getByRole('button', { name: 'Submit' }).click();
  const couponRow = page.getByRole('row', { name: new RegExp(couponCode, 'i') });
  await expect(couponRow).toBeVisible();
  console.log('Coupon code is visble')

 });

 test('Search Coupon with Coupon Title', async ({ page }) => {
  const couponCode = `USR${Date.now()}`;
  
  // Open Add Coupon form
  await page.getByRole('link', { name: '+ Add Coupon' }).click();
  await expect(page.getByRole('heading', { name: 'Add Coupon' })).toBeVisible();

  // Fill coupon details
  await page.locator('select[name="ware_house_id"]').selectOption('1');
  await page.getByRole('textbox', { name: 'Title' }).fill('User Special Coupon');
  await page.getByRole('textbox', { name: 'Coupon Code' }).fill(couponCode);
  await page.locator('select[name="discountType"]').selectOption('2'); // Percentage
  await page.getByRole('textbox', { name: 'Discount', exact: true }).fill('10');
  await page.getByRole('textbox', { name: 'Max Discount Amount' }).fill('100');
  await page.getByRole('textbox', { name: 'Minimum Cart Value' }).fill('500');
  await page.getByRole('button', { name: 'All User' }).click();
  await page.getByRole('button', { name: 'One-time' }).click();
  await page.getByPlaceholder('Start Date').fill('2025-09-05');
  await page.getByPlaceholder('End Date').fill('2025-09-15');
  await page.getByRole('textbox', { name: 'Description' }).fill('Delete test coupon');

  // Submit
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('alert').filter({ hasText: 'success' })).toBeVisible();
  console.log(`Created coupon: ${couponCode}`);

  // Search coupon with coupon code

const couponTitle = 'User Special Coupon';

  await page.getByRole('textbox', { name: 'Title' }).fill(couponTitle);
  await page.getByRole('button', { name: 'Submit' }).click();
  const couponRow = page.getByRole('row', { name: new RegExp(`${couponCode}.*${couponTitle}`, 'i') });
  await expect(couponRow).toBeVisible();
  console.log('Coupon Search by Title is working')
 });

test('Verify coupon table shows correct records for Active/Inactive status', async ({ page }) => {
  const couponTitle = 'User Special Coupon';

  // Filter by Title
  await page.getByRole('textbox', { name: 'Title' }).fill(couponTitle);
  await page.getByRole('button', { name: 'Submit' }).click();

  // ---------- ACTIVE filter ----------
  await page.getByLabel('Status').selectOption('1'); 
  await page.getByRole('button', { name: 'Submit' }).click();

  const activeRows = page.locator('tr', { hasText: couponTitle });
  const activeCount = await activeRows.count();

  for (let i = 0; i < activeCount; i++) {
    const checkbox = activeRows.nth(i).locator('input.form-check-input');
    await expect(checkbox).toBeChecked(); // must be active
  }
  console.log(`✅ Found ${activeCount} active coupons`);

  // ---------- INACTIVE filter ----------
  await page.getByLabel('Status').selectOption('0'); 
  await page.getByRole('button', { name: 'Submit' }).click();

  const inactiveRows = page.locator('tr', { hasText: couponTitle });
  const inactiveCount = await inactiveRows.count();

  for (let i = 0; i < inactiveCount; i++) {
    const checkbox = inactiveRows.nth(i).locator('input.form-check-input');
    await expect(checkbox).not.toBeChecked(); // must be inactive
  }
  console.log(`✅ Found ${inactiveCount} inactive coupons`);

  // Reset
  await page.getByRole('button', { name: 'Reset' }).click();
});


 


    });