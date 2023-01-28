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
			}
		}
	},
	plugins: []
};

module.exports = config;
