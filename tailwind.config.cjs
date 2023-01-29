const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				base: 'hsl(var(--color-base) / <alpha-value>)',
				surface: 'hsl(var(--color-surface) / <alpha-value>)',
				overlay: 'hsl(var(--color-overlay) / <alpha-value>)',
				muted: 'hsl(var(--color-muted) / <alpha-value>)',
				subtle: 'hsl(var(--color-subtle) / <alpha-value>)',
				text: 'hsl(var(--color-text) / <alpha-value>)',
				love: 'hsl(var(--color-love) / <alpha-value>)',
				gold: 'hsl(var(--color-gold) / <alpha-value>)',
				rose: 'hsl(var(--color-rose) / <alpha-value>)',
				pine: 'hsl(var(--color-pine) / <alpha-value>)',
				foam: 'hsl(var(--color-foam) / <alpha-value>)',
				iris: 'hsl(var(--color-iris) / <alpha-value>)',
				highlightLow: 'hsl(var(--color-highlight-low) / <alpha-value>)',
				highlightMed: 'hsl(var(--color-highlight-med) / <alpha-value>)',
				highlightHigh: 'hsl(var(--color-highlight-high) / <alpha-value>)'
			},
			fontFamily: {
				heading: ['Pier Sans', ...fontFamily.sans]
			},
			borderColor: {
				DEFAULT: 'hsl(var(--color-muted) / 0.2)'
			},
			ringColor: {
				DEFAULT: 'hsl(var(--color-muted) / 0.3)'
			},
			boxShadow: {
				DEFAULT: '0 10px 30px -20px rgba(87, 82, 121, 0.2)',
				lg: '0 10px 40px -15px rgba(87, 82, 121, 0.2)'
			}
		}
	},
	plugins: []
};

module.exports = config;
