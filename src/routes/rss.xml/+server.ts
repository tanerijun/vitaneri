import type { RequestHandler } from './$types';
import { posts } from '$lib/data/posts';
import { Feed } from 'feed';

export const prerender = true;

const NAME = 'Vincent Taneri';
const EMAIL = 'tanerivince@gmail.com';
const TITLE = 'Vitaneri';
const WEBSITE = 'https://vitaneri.com';
const WEBSITE_DESCRIPTION = `${NAME}'s personal website`;
const POSTS_URL = `${WEBSITE}/posts`;

export const GET = (async ({ setHeaders }) => {
	setHeaders({
		'Cache-Control': 'max-age=0, s-max-age=600',
		'Content-Type': 'application/xml'
	});

	const feed = new Feed({
		title: TITLE,
		description: WEBSITE_DESCRIPTION,
		id: WEBSITE,
		link: WEBSITE,
		language: 'en',
		image: `${WEBSITE}/favicon.ico`,
		generator: 'SvelteKit',
		copyright: 'All rights reserved 2023, Vincent Taneri',
		author: {
			name: NAME,
			email: EMAIL,
			link: WEBSITE
		}
	});

	posts.forEach((post) => {
		feed.addItem({
			title: post.title,
			id: `${POSTS_URL}/${post.slug}`,
			link: `${POSTS_URL}/${post.slug}`,
			description: post.preview.text,
			date: new Date(post.datetime)
		});
	});

	return new Response(feed.rss2());
}) satisfies RequestHandler;
