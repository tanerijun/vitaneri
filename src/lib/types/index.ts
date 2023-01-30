interface Metadata {
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
	metadata: Metadata;
}

export type { Metadata, Post };
