import { browser } from '$app/environment';
import { format } from 'date-fns';
import type { TIL } from '$lib/types';

if (browser) {
	throw new Error(`TILs should only be generated server-side`);
}

// Get all TILs' metadata
export const TILs = Object.entries(import.meta.glob(`/TILs/**.md`, { eager: true }))
	.map(([, obj]) => {
		const TIL = obj as TIL;

		return {
			...TIL.metadata,
			// Format date as yyyy-MM-dd
			datetime: format(
				// Offset by timezone so that the date is correct
				addTimeZoneOffset(new Date(TIL.metadata.datetime)),
				'yyyy-MM-dd'
			)
		};
	})
	// Sort by most recent date
	.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());

function addTimeZoneOffset(date: Date) {
	const offsetInMilliseconds = new Date().getTimezoneOffset() * 60 * 1000;
	return new Date(new Date(date).getTime() + offsetInMilliseconds);
}
