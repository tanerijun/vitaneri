import { z, defineCollection } from "astro:content";
import { postSchema, projectSchema, tilSchema } from "../utils/schemas";

const postCollection = defineCollection({
	type: "content",
	schema: postSchema,
});

const projectCollection = defineCollection({
	type: "data",
	schema: projectSchema,
});

const tilCollection = defineCollection({
	type: "content",
	schema: tilSchema,
});

export const collections = {
	posts: postCollection,
	projects: projectCollection,
	tils: tilCollection,
};
