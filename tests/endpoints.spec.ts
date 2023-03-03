import type { SearchData } from '$lib/types';
import { expect, test } from '@playwright/test';

test.describe('/rss.xml', () => {
	test('should return an XML document containing RSS', async ({ request }) => {
		const response = await request.get('http://localhost:5173/rss.xml');
		expect(response.ok()).toBe(true);
		expect(response.headers()['content-type']).toBe('application/xml');
		let content = '';
		await response.body().then((body) => {
			content = body.toString();
		});
		expect(content).toContain('<?xml version="1.0" encoding="utf-8"?>');
		expect(content).toContain('<rss version="2.0">');
	});
});

test.describe('/sitemap.xml', () => {
	test('should return an XML document containing sitemap', async ({ request }) => {
		// Testing live site because sitemap is generated at build time
		const response = await request.get('https://vitaneri.com/sitemap.xml');
		expect(response.ok()).toBe(true);
		expect(response.headers()['content-type']).toBe('application/xml');
		let content = '';
		await response.body().then((body) => {
			content = body.toString();
		});
		expect(content).toContain('<?xml version="1.0" encoding="UTF-8"?>');
		expect(content).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
	});
});

test.describe('/searchdata.json', () => {
	test('should return a JSON document containing search data', async ({ request }) => {
		const response = await request.get('http://localhost:5173/searchdata.json');
		expect(response.ok()).toBe(true);
		expect(response.headers()['content-type']).toBe('application/json');
		const data = await response.json();
		data.forEach((item: SearchData) => {
			expect(item.title).toBeDefined();
			expect(item.slug).toBeDefined();
		});
	});
});
