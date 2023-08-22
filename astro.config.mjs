import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import solidJs from "@astrojs/solid-js";
import getReadingTime from "reading-time";
import defaultTheme from "tailwindcss/defaultTheme";
import { toString } from "mdast-util-to-string";
import { siteInfo } from "./src/data/site-info";
import { astroExpressiveCode } from "astro-expressive-code";

export function remarkReadingTime() {
	return function (tree, { data }) {
		const textOnPage = toString(tree);
		const readingTime = getReadingTime(textOnPage);
		// readingTime.text will give us minutes read as a friendly string,
		// i.e. "3 min read"
		data.astro.frontmatter.minutesRead = readingTime.text;
	};
}

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
const astroExpressiveCodeOptions = {
	theme: ["vitesse-dark"],
	useThemedScrollbars: true,
	useThemedSelectionColors: true,
	frames: {
		removeCommentsWhenCopyingTerminalFrames: true,
		styleOverrides: {
			frameBoxShadowCssValue: "none",
			tooltipSuccessBackground: "color-mix(in oklab, var(--code-background), transparent 30%)",
			inlineButtonHoverOrFocusBackground: "transparent",
		},
	},
	styleOverrides: {
		uiFontFamily: ["Atkinson Hyperlegible", ...defaultTheme.fontFamily.sans].join(","),
	},
};

// https://astro.build/config
export default defineConfig({
	integrations: [
		solidJs(),
		tailwind({
			applyBaseStyles: false,
		}),
		astroExpressiveCode(astroExpressiveCodeOptions),
		mdx(),
		sitemap(),
		prefetch(),
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
	site: siteInfo.url,
});
