import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { lyraInstance } from '$lib/data/lyraDB';

export const prerender = true;

export const GET = (({ setHeaders }) => {
	setHeaders({
		'Cache-Control': 'max-age=0, s-max-age=600',
		'Content-Type': 'application/json'
	});

	return json(lyraInstance);
}) satisfies RequestHandler;
