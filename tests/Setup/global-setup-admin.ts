import { chromium } from '@playwright/test';
import * as fs from 'fs';

const baseUrl = 'https://admin-qa.deliverit.net.in';
const authFile = 'auth.json';

async function globalSetup() {
  // ✅ Skip login if auth.json already exists
  if (fs.existsSync(authFile)) {
    console.log('⚡ Auth file already exists. Skipping login.');
    return;
  }

  const browser = await chromium.launch({ headless: true }); // can set false for debugging
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('🔐 Logging in to Admin Portal...');

  // Go to Admin login page
  await page.goto(baseUrl);

  // Login credentials
  await page.getByRole('textbox', { name: 'Email' }).fill('Deepak.vats@uharvest.in');
  await page.getByRole('textbox', { name: 'Password' }).fill('Drock@9045');
  await page.getByRole('button', { name: 'Log in' }).click();

  // OTP input (you can modify OTP logic if dynamic later)
  await page.getByRole('textbox', { name: 'Please enter OTP character 1' }).fill('1');
  await page.getByRole('textbox', { name: 'Please enter OTP character 2' }).fill('3');
  await page.getByRole('textbox', { name: 'Please enter OTP character 3' }).fill('5');
  await page.getByRole('textbox', { name: 'Please enter OTP character 4' }).fill('7');
  await page.getByRole('textbox', { name: 'Please enter OTP character 5' }).fill('9');
  await page.getByRole('textbox', { name: 'Please enter OTP character 6' }).fill('0');
  await page.getByRole('button', { name: 'Verify OTP' }).click();

  // Wait for dashboard (Catalog menu visible)
  await page.waitForSelector('span:has-text("Catalog")', { timeout: 20000 });

  // Save session
  await context.storageState({ path: authFile });
  console.log('✅ Admin login successful. Auth state saved.');

  await browser.close();
}

export default globalSetup;
