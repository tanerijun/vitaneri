import type { posts } from '$lib/data/posts';

interface MarkdownMetadata {
	title: string;
	description?: string;
	datetime: string;
	slug: string;
	featured?: boolean;
	tags: string[];
	headings: {
		depth: number;
		value: string;
		id: string;
	}[];
}

interface Post {
	default: {
		render: () => {
			html: string;
		};
	};
	metadata: MarkdownMetadata;
}

interface TILMetadata {
	id: number;
	datetime: string;
}

type PostMetadata = (typeof posts)[number];

interface SearchData {
	title: string;
	slug: string;
}

export type { MarkdownMetadata, Post, PostMetadata, TILMetadata, SearchData };
