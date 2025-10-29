import { chromium } from '@playwright/test';
import * as fs from 'fs';

const baseUrl = 'https://admin-qa.deliverit.net.in';

async function globalSetup() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Login only once
  await page.goto(baseUrl);
  await page.getByRole('textbox', { name: 'Email' }).fill('Deepak.vats@uharvest.in');
  await page.getByRole('textbox', { name: 'Password' }).fill('Drock@9045');
  await page.getByRole('button', { name: 'Log in' }).click();

  // OTP step
  await page.getByRole('textbox', { name: 'Please enter OTP character 1' }).fill('1');
  await page.getByRole('textbox', { name: 'Please enter OTP character 2' }).fill('3');
  await page.getByRole('textbox', { name: 'Please enter OTP character 3' }).fill('5');
  await page.getByRole('textbox', { name: 'Please enter OTP character 4' }).fill('7');
  await page.getByRole('textbox', { name: 'Please enter OTP character 5' }).fill('9');
  await page.getByRole('textbox', { name: 'Please enter OTP character 6' }).fill('0');
  await page.getByRole('button', { name: 'Verify OTP' }).click();

  // Wait till dashboard loaded
  await page.waitForSelector('span:has-text("Catalog")', { timeout: 20000 });

  // Save login session to auth.json
  await context.storageState({ path: 'auth.json' });

  console.log('✅ Login session saved successfully.');

  await browser.close();
}

export default globalSetup;
