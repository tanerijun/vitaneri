import { z, defineCollection } from "astro:content";

const postCollection = defineCollection({
	type: "content",
	schema: z.object({
		datetime: z.date(),
		title: z.string(),
		tags: z.array(z.string()),
	}),
});

const projectCollection = defineCollection({
	type: "data",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		techs: z.array(z.string()),
		url: z.string().url().optional(),
		repo: z.string().url().optional(),
	}),
});

const tilCollection = defineCollection({
	type: "content",
	schema: z.object({
		datetime: z.date(),
	}),
});

export const collections = {
	posts: postCollection,
	projects: projectCollection,
	tils: tilCollection,
};
