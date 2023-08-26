import { OGImageRoute } from "astro-og-canvas";
import { type CollectionEntry, getCollection } from "astro:content";

async function getPagesToGenerate() {
	const entries = await getCollection("posts");

	const map: Record<string, CollectionEntry<"posts">> = {};

	for (const entry of entries) {
		map[entry.slug] = entry;
	}

	return map;
}

export const { getStaticPaths, get } = OGImageRoute({
	param: "route",

	pages: await getPagesToGenerate(),

	getImageOptions: (path, page: CollectionEntry<"posts">) => ({
		title: page.data.title,
		description: path,
		logo: {
			path: "./public/favicon-32x32.png",
		},
	}),
});
