import type { Config } from "tailwindcss";
import typographyPlugin from "@tailwindcss/typography"

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {},
	},
	plugins: [typographyPlugin],
} satisfies Config;
