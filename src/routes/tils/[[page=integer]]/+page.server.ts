import { TILs } from '$lib/data/TILs';
import { paginate } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { TILMetadata } from '$lib/types';

export const load = (async ({ params }) => {
	const page = params.page ? parseInt(params.page) : 1;
	const limit = 20;

	const TILsForPage: TILMetadata[] = paginate(TILs, { limit, page });

	// If page doesn't exist
	if (TILsForPage.length === 0 && page > 1) {
		throw error(404, 'Page not found');
	}

	return {
		TILs: TILsForPage,
		page,
		hasNextPage: TILs.length > page * limit
	};
}) satisfies PageServerLoad;
