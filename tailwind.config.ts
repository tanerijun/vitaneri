import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import typographyPlugin from "@tailwindcss/typography";

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: ["Atkinson Hyperlegible", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [typographyPlugin],
} satisfies Config;
