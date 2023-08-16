import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
	return function (tree, { data }) {
		const textOnPage = toString(tree);
		const readingTime = getReadingTime(textOnPage);
		// readingTime.text will give us minutes read as a friendly string,
		// i.e. "3 min read"
		data.astro.frontmatter.minutesRead = readingTime.text;
	};
}

export default defineConfig({
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		mdx(),
	],
	experimental: {
		assets: true,
		viewTransitions: true,
	},
	image: {
		service: sharpImageService(),
	},
	markdown: {
		remarkPlugins: [remarkReadingTime],
	},
});
