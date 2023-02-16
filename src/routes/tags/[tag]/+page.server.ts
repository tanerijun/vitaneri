import { posts } from '$lib/data/posts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (({ params }) => {
	const { tag } = params;

	const filteredPosts = posts.filter((post) => post.tags.includes(tag));

	if (filteredPosts.length === 0) {
		throw error(404, 'Post not found');
	}

	return {
		tag,
		posts: filteredPosts
	};
}) satisfies PageServerLoad;
