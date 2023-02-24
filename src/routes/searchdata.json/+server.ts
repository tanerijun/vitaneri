import { posts } from '$lib/data/posts';
import { json, type RequestHandler } from '@sveltejs/kit';

export const prerender = true;

export const GET = (() => {
	return json(
		posts.map((post) => {
			return {
				title: post.title,
				slug: post.slug
			};
		})
	);
}) satisfies RequestHandler;
