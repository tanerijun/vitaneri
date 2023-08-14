import { z } from "astro:content";

export const postSchema = z.object({
	datetime: z.date(),
	title: z.string(),
	tags: z.array(z.string()),
});

export type Post = z.infer<typeof postSchema>;

export const projectSchema = z.object({
	title: z.string(),
	description: z.string(),
	techs: z.array(z.string()),
	url: z.string().url().optional(),
	repo: z.string().url().optional(),
});

export type projectSchema = z.infer<typeof projectSchema>;

export const tilSchema = z.object({
	datetime: z.date(),
});

export type tilSchema = z.infer<typeof tilSchema>;
