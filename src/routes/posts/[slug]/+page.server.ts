import { posts } from '$lib/data/posts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (({ params }) => {
	const { slug } = params;

	const post = posts.find((post) => post.slug === slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	return {
		post
	};
}) satisfies PageServerLoad;
