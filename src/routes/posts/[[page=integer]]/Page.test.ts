import Page from './+page.svelte';
import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import { mockPostData } from '$lib/test-utils/mockPostData';

const posts = [
	{ ...mockPostData, slug: 'data-1', next: undefined as unknown as typeof mockPostData },
	{ ...mockPostData, slug: 'data-2' },
	{ ...mockPostData, slug: 'data-3' },
	{ ...mockPostData, slug: 'data-4' },
	{ ...mockPostData, slug: 'data-5' },
	{ ...mockPostData, slug: 'data-6' },
	{ ...mockPostData, slug: 'data-7' },
	{ ...mockPostData, slug: 'data-8' },
	{ ...mockPostData, slug: 'data-9', previous: undefined as unknown as typeof mockPostData }
];

const firstPageData = {
	posts: posts.slice(0, 3),
	page: 1
};

const secondPageData = {
	posts: posts.slice(3, 6),
	page: 2
};

const lastPageData = {
	posts: posts.slice(6, 9),
	page: 3
};

describe('Page', () => {
	it('should have only 1 <h1> tag', () => {
		render(Page, { data: firstPageData });
		expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
	});

	it('should render all posts inside <article> tag', () => {
		render(Page, { data: firstPageData });
		expect(screen.getAllByRole('article')).toHaveLength(firstPageData.posts.length);
	});

	it('should render only the link to next page on first page', () => {
		render(Page, { data: firstPageData });
		expect(screen.getByText(/next/i)).toBeInTheDocument();
		expect(screen.queryByText(/previous/i)).not.toBeInTheDocument();
	});

	it('should render both links to next and previous page on the second page', () => {
		render(Page, { data: secondPageData });
		expect(screen.getByText(/next/i)).toBeInTheDocument();
		expect(screen.getByText(/previous/i)).toBeInTheDocument();
	});

	it('should render only the link to previous page on the last page', () => {
		render(Page, { data: lastPageData });
		expect(screen.getByText(/previous/i)).toBeInTheDocument();
		expect(screen.queryByText(/next/i)).not.toBeInTheDocument();
	});
});
