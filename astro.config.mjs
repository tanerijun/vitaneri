import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
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
		showCopyToClipboardButton: false,
		extractFileNameFromCode: false,
		removeCommentsWhenCopyingTerminalFrames: false,
	},
	styleOverrides: {
		uiFontFamily: ["Atkinson Hyperlegible", ...defaultTheme.fontFamily.sans].join(","),
		frames: {
			frameBoxShadowCssValue: "none",
			tooltipSuccessBackground: "color-mix(in oklab, var(--code-background), transparent 30%)",
			inlineButtonHoverOrFocusBackground: "transparent",
		},
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
		sitemap(),
	],
	markdown: {
		remarkPlugins: [remarkReadingTime],
	},
	site: siteInfo.url,
	trailingSlash: "never",
	build: {
		format: "file",
	},
	prefetch: {
		prefetchAll: true,
		defaultStrategy: "viewport",
	},
});
