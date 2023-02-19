import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { lyraInstance } from '$lib/data/lyraDB';

export const prerender = true;

export const GET = (() => {
	return json(lyraInstance);
}) satisfies RequestHandler;
