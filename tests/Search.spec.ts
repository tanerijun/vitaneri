import { test, expect } from '@playwright/test';

test.describe('Search', () => {
	test('should be able to open and close search', async ({ page }) => {
		await page.goto('http://localhost:5173');
		await page.waitForTimeout(300);
		await page.getByRole('button', { name: 'Search' }).click();
		await expect(page.getByPlaceholder('Type something...')).toBeVisible();
		await page.getByRole('link', { name: 'Vitaneri' }).click();
		await expect(page.getByPlaceholder('Type something...')).not.toBeVisible();
	});

	test('should be able to open and close search with keyboard shortcuts', async ({ page }) => {
		await page.goto('http://localhost:5173');
		await page.waitForTimeout(300);
		await page.keyboard.press('Control+K');
		await expect(page.getByPlaceholder('Type something...')).toBeVisible();
		await page.keyboard.press('Control+K');
		await expect(page.getByPlaceholder('Type something...')).not.toBeVisible();
		await page.keyboard.press('Meta+K');
		await expect(page.getByPlaceholder('Type something...')).toBeVisible();
		await page.keyboard.press('Escape');
		await expect(page.getByPlaceholder('Type something...')).not.toBeVisible();
	});
});
