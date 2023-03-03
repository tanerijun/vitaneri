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

	test('should be able to search for a post', async ({ page }) => {
		await page.goto('http://localhost:5173');
		await page.waitForTimeout(300);
		await page.getByRole('button', { name: 'Search' }).click();
		await page.getByPlaceholder('Type something...').fill('how to debug typescript in vscode');
		await expect(
			page.getByRole('link', { name: 'How To Debug TypeScript In VSCode' })
		).toBeVisible();
		await page.getByRole('link', { name: 'How To Debug TypeScript In VSCode' }).click();
		await expect(page).toHaveURL(/.*how-to-debug-typescript-in-vscode/);
	});
});
