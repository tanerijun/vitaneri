import type { PostMetadata } from '$lib/types';

export const mockPostData: PostMetadata = {
	title: 'Test Post',
	datetime: '2021-01-01',
	slug: 'test-post',
	tags: ['test', 'post'],
	description: 'Test post description',
	preview: { html: 'Test post preview', text: 'Test post text' },
	readingTime: '10 min read',
	featured: false,
	headings: [
		{ depth: 2, value: 'Test Heading 1', id: 'test-heading-1' },
		{ depth: 2, value: 'Test Heading 2', id: 'test-heading-2' }
	],
	next: {
		title: 'Next Test Post',
		datetime: '2022-01-01',
		slug: 'next-test-post',
		tags: ['next', 'test', 'post'],
		description: 'Next Test post description',
		preview: { html: 'Next Test post preview', text: 'Next Test post text' },
		readingTime: '11 min read',
		featured: false,
		headings: [
			{ depth: 2, value: 'Next Test Heading 1', id: 'next-test-heading-1' },
			{ depth: 2, value: 'Next Test Heading 2', id: 'next-test-heading-2' }
		]
	},
	previous: {
		title: 'Previous Test Post',
		datetime: '2018-01-01',
		slug: 'previous-test-post',
		tags: ['previous', 'test', 'post'],
		description: 'Previous Test post description',
		preview: { html: 'Previous Test post preview', text: 'Previous Test post text' },
		readingTime: '11 min read',
		featured: false,
		headings: [
			{ depth: 2, value: 'Previous Test Heading 1', id: 'previous-test-heading-1' },
			{ depth: 2, value: 'Previous Test Heading 2', id: 'previous-test-heading-2' }
		]
	}
};
