import { posts } from '$lib/data/posts';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const tagsMap = new Map<string, number>();
	posts.forEach((post) => {
		post.tags.forEach((tag) => {
			tagsMap.set(tag, (tagsMap.get(tag) || 0) + 1);
		});
	});

	const alphabetTagsMap = new Map<string, typeof tagsMap>();
	tagsMap.forEach((count, tag) => {
		const firstLetter = tag[0].toLowerCase();
		const alphabetTags = alphabetTagsMap.get(firstLetter) || new Map<string, number>();
		alphabetTags.set(tag, count);
		alphabetTagsMap.set(firstLetter, alphabetTags);
	});

	const sortedAlphabetTagsMap = new Map([...alphabetTagsMap].sort());

	return { tagsData: sortedAlphabetTagsMap };
	// Returned object:
	// tagsData: Map(11) {
	//   'a' => Map(1) { 'astro' => 1 },
	//   'c' => Map(1) { 'css' => 1 },
	//   'd' => Map(2) { 'dsa' => 10, 'deno' => 1 },
	//   'g' => Map(1) { 'go' => 3 },
	//   'j' => Map(3) { 'javascript' => 8, 'java' => 1, 'jdbctemplate' => 1 },
	//   'l' => Map(1) { 'leetcode' => 9 },
	//   'r' => Map(1) { 'react' => 5 },
	//   's' => Map(1) { 'spring' => 2 },
	//   't' => Map(1) { 'typescript' => 16 },
	//   'u' => Map(1) { 'utterances' => 1 },
	//   'v' => Map(2) { 'vitest' => 1, 'vscode' => 2 }
	// }
}) satisfies PageServerLoad;
