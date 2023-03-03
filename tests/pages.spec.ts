import { test, expect } from '@playwright/test';

test.describe('HomePage', () => {
	test('have correct title', async ({ page }) => {
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

	test('should open /posts page on "View All" click', async ({ page }) => {
		await page.goto('http://localhost:5173');
		await page.getByRole('link', { name: 'View All' }).click();
		await expect(page).toHaveURL(/.*posts/);
	});
});

test.describe('PostsPage', () => {
	test('should have correct title', async ({ page }) => {
		await page.goto('http://localhost:5173/posts');
		await expect(page).toHaveTitle(/Posts | Vitaneri/);
	});
});

test.describe('TagsPage', () => {
	test('should have correct title', async ({ page }) => {
		await page.goto('http://localhost:5173/tags');
		await expect(page).toHaveTitle(/Tags | Vitaneri/);
	});
});

test.describe('TILsPage', () => {
	test('should have correct title', async ({ page }) => {
		await page.goto('http://localhost:5173/tils');
		await expect(page).toHaveTitle(/TILs | Vitaneri/);
	});
});

test.describe('ProjectsPage', () => {
	test('should have correct title', async ({ page }) => {
		await page.goto('http://localhost:5173/projects');
		await expect(page).toHaveTitle(/Projects | Vitaneri/);
	});
});

test.describe('AboutPage', () => {
	test('should have correct title', async ({ page }) => {
		await page.goto('http://localhost:5173/about');
		await expect(page).toHaveTitle(/About | Vitaneri/);
	});
});
