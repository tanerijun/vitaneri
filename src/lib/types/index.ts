import type { posts } from "$lib/data/posts";

interface MarkdownMetadata {
	title: string;
	description?: string;
	author: string;
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

interface TIL {
	default: {
		render: () => {
			html: string;
		};
	};
	metadata: TILMetadata;
}

type PostMetadata = typeof posts[number];

export type { MarkdownMetadata, Post, PostMetadata, TIL, TILMetadata };
