import type { PageServerLoad } from './$types';
import { posts } from '$lib/data/posts';

export const load = (async () => {
	return {
		posts: posts.slice(0, 5)
	};
}) satisfies PageServerLoad;
