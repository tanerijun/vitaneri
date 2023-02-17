import { zeroPad } from '$lib/utils';
import type { PageLoad } from './$types';

/**
 * Dynamically loads the svelte component for the TIL (only possible in +page.ts)
 * and pass on the data from +page.server.ts
 */
export const load = (async ({ data }) => {
	const TILsWithComponent = data.TILs.map(async (TIL) => {
		const component = await import(`../../../../content/TILs/${zeroPad(TIL.id, 4)}.md`);
		return {
			...TIL,
			component: component.default
		};
	});

	return {
		...data,
		TILs: await Promise.all(TILsWithComponent)
	};
}) satisfies PageLoad;
