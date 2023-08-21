import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import { siteInfo } from "../data/site-info";
import { getCollection } from "astro:content";
import { myInfo } from "../data/my-info";

const parser = new MarkdownIt();

export const get: APIRoute = async () => {
	const posts = await getCollection("posts");

	return rss({
		title: siteInfo.title,
		description: siteInfo.description,
		site: siteInfo.url,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			author: myInfo.name,
			pubDate: post.data.datetime,
			link: `/posts/${post.slug}`,
			categories: post.data.tags,
			content: sanitizeHtml(parser.render(post.body)),
		})),
		customData: `<language>en-us</language>`,
		stylesheet: "rss/styles.xsl",
	});
};
