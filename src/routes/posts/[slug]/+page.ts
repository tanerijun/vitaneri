import type { PageLoad } from './$types';

/**
 * Dynamically loads the svelte component for the post (only possible in +page.ts)
 * and pass on the data from +page.server.ts
 */
export const load = (async ({ data }) => {
	const component = await import(`../../../../content/posts/${data.post.slug}/index.md`);

	return {
		post: data.post,
		component: component.default,
		layout: {
			fullWidth: true
		}
	};
}) satisfies PageLoad;
