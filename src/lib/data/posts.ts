import { browser } from '$app/environment';
import { parse } from 'node-html-parser';
import { format } from 'date-fns';
import readingTime from 'reading-time';
import type { Post } from '$lib/types';

if (browser) {
	throw new Error(`Posts should only be generated server-side`);
}

// Get all posts' metadata
export const posts = Object.entries(import.meta.glob(`/posts/*/*.md`, { eager: true }))
	.map(([, obj]) => {
		const post = obj as Post;
		const html = parse(post.default.render().html);
		// When description isn't provided in frontmatter, use the first paragraph of the post as preview instead.
		const preview = post.metadata.description
			? parse(post.metadata.description)
			: html.querySelector('p');

		return {
			...post.metadata,
			// Format date as yyyy-MM-dd
			datetime: format(
				// Offset by timezone so that the date is correct
				addTimeZoneOffset(new Date(post.metadata.datetime)),
				'yyyy-MM-dd'
			),
			preview: {
				html: preview?.toString(),
				// Text only preview (i.e no html elements), used for SEO
				text: preview?.structuredText ?? preview?.toString()
			},
			// Estimate reading time for the post
			readingTime: readingTime(html.structuredText).text
		};
	})
	// Sort by most recent date
	.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
	// Add references to the next and previous post
	.map((post, index, allPosts) => ({
		...post,
		next: allPosts[index - 1],
		previous: allPosts[index + 1]
	}));

function addTimeZoneOffset(date: Date) {
	const offsetInMilliseconds = new Date().getTimezoneOffset() * 60 * 1000;
	return new Date(new Date(date).getTime() + offsetInMilliseconds);
}
