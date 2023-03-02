import { render } from '@testing-library/svelte';

import PageMeta from './PageMeta.svelte';

describe('PageMeta', () => {
	it('should render title and all 11 meta tags properly', () => {
		render(PageMeta, {
			props: { title: 'Page Title', description: 'Page description', route: '/test' }
		});

		expect(document.getElementsByTagName('meta')).toHaveLength(11);
		expect(document.title).toBe('Page Title');
		expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
			'content',
			'Page description'
		);
		expect(document.querySelector('meta[name="author"]')).toHaveAttribute(
			'content',
			'Vincent Taneri'
		);
		expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
			'content',
			'Page Title'
		);
		expect(document.querySelector('meta[property="og:description"]')).toHaveAttribute(
			'content',
			'Page description'
		);
		expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
			'content',
			'https://vitaneri.com/test'
		);
		expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
			'content',
			'https://vitaneri.com/vitaneri-og.png'
		);
		expect(document.querySelector('meta[property="twitter:card"]')).toHaveAttribute(
			'content',
			'summary_large_image'
		);
		expect(document.querySelector('meta[property="twitter:url"]')).toHaveAttribute(
			'content',
			'https://vitaneri.com/test'
		);
		expect(document.querySelector('meta[property="twitter:title"]')).toHaveAttribute(
			'content',
			'Page Title'
		);
		expect(document.querySelector('meta[property="twitter:description"]')).toHaveAttribute(
			'content',
			'Page description'
		);
		expect(document.querySelector('meta[property="twitter:image"]')).toHaveAttribute(
			'content',
			'https://vitaneri.com/vitaneri-og.png'
		);
	});
});
