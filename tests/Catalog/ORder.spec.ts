import { test, expect, chromium } from '@playwright/test';

test('E2E - Place 10 Orders with Location Access', async () => {
  // Launch browser with location permission
  const context = await chromium.launchPersistentContext('', {
    headless: false,
    permissions: ['geolocation'],
    geolocation: { latitude: 28.5355, longitude: 77.3910 }, // Noida
    locale: 'en-IN',
  });

  const page = await context.newPage();
  await page.goto('https://customer-qa.deliverit.net.in/');

  // ----- Login -----
  await page.locator('button').filter({ hasText: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Enter mobile number' }).fill('6565895656');
  await page.getByRole('button', { name: 'Continue' }).click();

  const otp = ['1', '2', '3', '4', '5', '6'];
  for (let i = 0; i < otp.length; i++) {
    await page.getByRole('textbox', { name: `Please enter OTP character ${i + 1}` }).fill(otp[i]);
  }

  // ----- Select Outlet (only once) -----
  await page.getByText('SP Outlet').click();

  // ----- Loop to create 10 orders -----
  for (let orderNum = 1; orderNum <= 10; orderNum++) {
    console.log(`🛒 Placing Order #${orderNum}`);

    // Clear cart if needed (optional)
    // await page.goto('https://customer-qa.deliverit.net.in/cart');
    // await page.locator('.remove-item-btn').click();

    // ----- Add items -----
    const addBtn = page.locator('.addToCart_add-btn__3gr6G').first();
    for (let i = 0; i < 4; i++) await addBtn.click();

    // ----- Checkout -----
    await page.getByRole('link', { name: '4', exact: true }).click();
    await page.getByText('Checkout').click();
    await page.getByRole('button', { name: 'Proceed for Payment' }).click();

    // ----- Payment -----
    await page.getByRole('radio').nth(1).check();
    await page.getByRole('button', { name: 'Place Order' }).click();

    // ----- Verify Order Success -----
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/myaccount|success/i);

    console.log(`✅ Order #${orderNum} placed successfully`);

    // Wait before next order (to avoid server throttling)
    await page.waitForTimeout(3000);

    // Go back to homepage (outlet remains selected)
    await page.goto('https://customer-qa.deliverit.net.in/');
  }

  await context.close();
});
