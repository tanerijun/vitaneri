import { test, expect } from '@playwright/test';

test.describe('HomePage', () => {
	test('title should be Vitaneri', async ({ page }) => {
		await page.goto('http://localhost:5173');
		await expect(page).toHaveTitle(/Vitaneri/);
	});

	test('should have a link to /posts page', async ({ page }) => {
		await page.goto('http://localhost:5173');
		await page.getByRole('link', { name: 'Posts' }).click();
		await expect(page).toHaveURL(/.*posts/);
	});

	test('should have a link to /tags page', async ({ page }) => {
		await page.goto('http://localhost:5173');
		await page.getByRole('link', { name: 'Tags' }).click();
		await expect(page).toHaveURL(/.*tags/);
	});

	test('should have a link to /TILs page', async ({ page }) => {
		await page.goto('http://localhost:5173');
		await page.getByRole('link', { name: 'TILs' }).click();
		await expect(page).toHaveURL(/.*tils/);
	});

	test('should have a link to /projects page', async ({ page }) => {
		await page.goto('http://localhost:5173');
		await page.getByRole('link', { name: 'Projects' }).click();
		await expect(page).toHaveURL(/.*projects/);
	});

	test('should have a link to /about page', async ({ page }) => {
		await page.goto('http://localhost:5173');
		await page.getByRole('link', { name: 'About' }).click();
		await expect(page).toHaveURL(/.*about/);
	});
});
