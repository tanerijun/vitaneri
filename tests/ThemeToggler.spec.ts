import { test, expect } from '@playwright/test';

test.describe('ThemeToggler', () => {
	test('should toggle among 3 themes', async ({ page }) => {
		await page.goto('http://localhost:5173');
		const initialDataTheme = await page.getAttribute('html', 'data-theme');
		await page.getByRole('button', { name: 'Toggle theme' }).click();
		const secondDataTheme = await page.getAttribute('html', 'data-theme');
		expect(secondDataTheme).not.toBe(initialDataTheme);
		await page.getByRole('button', { name: 'Toggle theme' }).click();
		const thirdDataTheme = await page.getAttribute('html', 'data-theme');
		expect(thirdDataTheme).not.toBe(secondDataTheme);
		await page.getByRole('button', { name: 'Toggle theme' }).click();
		const fourthDataTheme = await page.getAttribute('html', 'data-theme');
		expect(fourthDataTheme).toBe(initialDataTheme);
	});
});
