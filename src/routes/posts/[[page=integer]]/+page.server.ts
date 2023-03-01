import { posts } from '$lib/data/posts';
import { paginate } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { PostMetadata } from '$lib/types';

export const load = (async ({ params }) => {
	const page = params.page ? parseInt(params.page) : 1;
	const limit = 10;

	const postsForPage: PostMetadata[] = paginate(posts, { limit, page });

	// If page doesn't exist
	if (postsForPage.length === 0 && page > 1) {
		throw error(404, 'Page not found');
	}

	return {
		posts: postsForPage,
		page
	};
}) satisfies PageServerLoad;
