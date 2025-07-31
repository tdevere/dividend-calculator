import { test, expect } from '@playwright/test';

test.describe('Deployment Process', () => {
  test('should deploy the application successfully', async ({ page }) => {
    // Navigate to the application URL
    await page.goto('https://dividend-calculator-app.azurewebsites.net');

    // Check if the application is running
    const title = await page.title();
    expect(title).toBe('Dividend Calculator');

    // Perform any additional checks to ensure the application is functioning as expected
    const header = await page.locator('h1');
    await expect(header).toHaveText('Welcome to the Dividend Calculator');

    // Check for specific elements that should be present on the page
    const calculateButton = await page.locator('button', { hasText: 'Calculate' });
    await expect(calculateButton).toBeVisible();
  });
});