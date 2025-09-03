import { test, expect } from '@playwright/test';

const baseUrl = 'https://zealous-ground-0bb981c00.6.azurestaticapps.net/';

test.describe.serial('Coupon Page Tests', () => {
 
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



    });