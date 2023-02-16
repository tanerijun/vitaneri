import type { PageServerLoad } from './$types';
import { posts } from '$lib/data/posts';

export const load = (async () => {
	const featuredPosts = posts.filter((post) => post.featured === true);

	return {
		posts: posts.slice(0, 5),
		featuredPosts
	};
}) satisfies PageServerLoad;
