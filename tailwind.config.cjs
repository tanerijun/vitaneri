const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: ["Atkinson Hyperlegible", ...defaultTheme.fontFamily.sans],
				mono: ["IBM Plex Mono", ...defaultTheme.fontFamily.mono],
				logo: ["Vitaneri"],
			},
			animation: {
				"fade-in": "fade-in 250ms ease",
				"fade-out": "fade-out 250ms ease",
				"scale-in": "scale-in 300ms ease-out",
				"scale-out": "scale-out 300ms ease-in;",
			},
			keyframes: {
				"fade-in": {
					"0%": {
						opacity: "0",
					},
					"100%": {
						opacity: "1",
					},
				},
				"fade-out": {
					"0%": {
						opacity: "1",
					},
					"100%": {
						opacity: "0",
					},
				},
				"scale-in": {
					"0%": {
						opacity: "0",
						transform: "scale(0.96)",
					},
					"100%": {
						opacity: "1",
						transform: "scale(1)",
					},
				},
				"scale-out": {
					"0%": {
						opacity: "1",
						transform: "scale(1)",
					},
					"100%": {
						opacity: "0",
						transform: "scale(0.96)",
					},
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
