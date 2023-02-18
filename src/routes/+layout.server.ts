import type { LayoutServerLoad } from './$types';

export const prerender = true;

export const load = (async () => {
	return {
		DB: 'TODO'
	};
}) satisfies LayoutServerLoad;
