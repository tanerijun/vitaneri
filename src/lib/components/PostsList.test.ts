import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';

import PostsList from './PostsList.svelte';
import { mockPostData } from '$lib/test-utils/mockPostData';

describe('PostsList', () => {
	it('should wrap each post in <article> tag', () => {
		const posts = [
			{ ...mockPostData, slug: 'mock-post-1' },
			{ ...mockPostData, slug: 'mock-post-2' },
			{ ...mockPostData, slug: 'mock-post-3' }
		];
		render(PostsList, { posts });
		expect(screen.getAllByRole('article')).toHaveLength(posts.length);
	});

	it('should display 2 dates for each post, one for mobile (hidden) and one for desktop', () => {
		const posts = [mockPostData];
		render(PostsList, { posts });
		const postDates = screen.getAllByTestId('post-date');
		expect(postDates).toHaveLength(2);
		expect(postDates[0]).toHaveClass('hidden');
		expect(postDates[1]).not.toHaveClass('hidden');
	});
});
