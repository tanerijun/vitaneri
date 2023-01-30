import type { posts } from '$lib/data/posts';

interface MarkdownMetadata {
	title: string;
	ogImage?: string;
	description?: string;
	author: string;
	datetime: string;
	slug: string;
	featured?: boolean;
	draft?: boolean;
	tags: string[];
}

interface Post {
	default: {
		render: () => {
			html: string;
		};
	};
	metadata: MarkdownMetadata;
}

type PostMetadata = typeof posts[number];

export type { MarkdownMetadata, Post, PostMetadata };
