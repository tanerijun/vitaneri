import { z, defineCollection } from "astro:content";

const postCollection = defineCollection({
	type: "content",
	schema: z.object({
		datetime: z.date(),
		title: z.string(),
		tags: z.array(z.string()),
	}),
});

export const collections = {
	posts: postCollection,
};

// ---
// datetime: 2022-10-21T15:06:20.401Z
// title: "Type Unknown in TypeScript"
// slug: type-unknown-in-typescript
// featured: false
// tags:
// 	- typescript
// description: "Exploring one of the primitive types in TypeScript: Unknown"
// ---
