const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				basis: 'hsl(var(--color-base) / <alpha-value>)',
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
				sans: ['Inter', ...fontFamily.sans],
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
			},
			animation: {
				'mesh-background-slow': 'mesh-background 6s ease infinite',
				'mesh-background-fast': 'mesh-background 3s ease infinite'
			},
			keyframes: {
				'mesh-background': {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center'
					}
				}
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						'--tw-prose-body': 'hsl(var(--color-subtle))',
						'--tw-prose-headings': 'hsl(var(--color-text))',
						'--tw-prose-lead': 'hsl(var(--color-subtle))',
						'--tw-prose-links': 'hsl(var(--color-iris))',
						'--tw-prose-bold': 'hsl(var(--color-text) / 90%)',
						'--tw-prose-counters': 'hsl(var(--color-muted))',
						'--tw-prose-bullets': 'hsl(var(--color-iris))',
						'--tw-prose-hr': 'hsl(var(--color-muted))',
						'--tw-prose-quotes': 'hsl(var(--color-subtle))',
						'--tw-prose-quote-borders': 'hsl(var(--color-iris))',
						'--tw-prose-captions': 'hsl(var(--color-muted))',
						'--tw-prose-code': 'hsl(var(--color-subtle))',
						'--tw-prose-code-bg': 'hsl(var(--color-highlight-low))',

						// Base
						color: 'var(--tw-prose-body)',
						lineHeight: theme('lineHeight.7'),
						'> *': {
							marginTop: theme('spacing.10'),
							marginBottom: theme('spacing.10')
						},
						p: {
							marginTop: theme('spacing.7'),
							marginBottom: theme('spacing.7')
						},

						// Headings
						'h2, h3': {
							color: 'var(--tw-prose-headings)'
						},
						// Prevents <h2><a>Title</a></h2> to be styled like a link
						':is(h1,h2,h3,h4,h5,h6) a': {
							color: 'var(--tw-prose-headings)',
							textDecoration: 'none',
							fontWeight: 'inherit'
						},
						h2: {
							fontSize: theme('fontSize.xl')[0],
							lineHeight: theme('lineHeight.7'),
							marginTop: theme('spacing.20'),
							marginBottom: theme('spacing.4')
						},
						h3: {
							fontSize: theme('fontSize.base')[0],
							lineHeight: theme('lineHeight.7'),
							marginTop: theme('spacing.16'),
							marginBottom: theme('spacing.4')
						},
						':is(h2, h3) + *': {
							marginTop: 0
						},

						// Images and videos
						img: {
							borderRadius: theme('borderRadius.3xl')
						},
						video: {
							borderRadius: theme('borderRadius.3xl')
						},

						// Inline elements
						a: {
							color: 'var(--tw-prose-links)',
							textDecoration: 'underline',
							textDecorationColor: 'transparent',
							transition: '150ms'
						},
						'a:hover': {
							textDecorationColor: 'var(--tw-prose-links)'
						},
						strong: {
							color: 'var(--tw-prose-bold)'
						},
						code: {
							display: 'inline-block',
							color: 'var(--tw-prose-code)',
							fontSize: theme('fontSize.sm')[0],
							fontWeight: theme('fontWeight.semibold'),
							backgroundColor: 'var(--tw-prose-code-bg)',
							borderRadius: theme('borderRadius.lg'),
							paddingLeft: theme('spacing.1'),
							paddingRight: theme('spacing.1')
						},
						'a code': {
							color: 'inherit'
						},
						':is(h2, h3) code': {
							fontWeight: theme('fontWeight.bold')
						},

						// Quotes
						blockquote: {
							paddingLeft: theme('spacing.6'),
							borderLeftWidth: theme('borderWidth.2'),
							borderLeftColor: 'var(--tw-prose-quote-borders)',
							fontStyle: 'italic'
						},

						// Figures
						figcaption: {
							color: 'var(--tw-prose-captions)',
							fontSize: theme('fontSize.sm')[0],
							lineHeight: theme('lineHeight.6'),
							marginTop: theme('spacing.3')
						},
						'figcaption > p': {
							margin: 0
						},

						// Lists
						ul: {
							listStyleType: 'disc'
						},
						ol: {
							listStyleType: 'decimal'
						},
						'ul, ol': {
							paddingLeft: theme('spacing.6')
						},
						li: {
							marginTop: theme('spacing.6'),
							marginBottom: theme('spacing.6'),
							paddingLeft: theme('spacing[3.5]')
						},
						'li::marker': {
							fontSize: theme('fontSize.sm')[0],
							fontWeight: theme('fontWeight.semibold')
						},
						'ol > li::marker': {
							color: 'var(--tw-prose-counters)'
						},
						'ul > li::marker': {
							color: 'var(--tw-prose-bullets)'
						},
						'li :is(ol, ul)': {
							marginTop: theme('spacing.4'),
							marginBottom: theme('spacing.4')
						},
						'li :is(li, p)': {
							marginTop: theme('spacing.3'),
							marginBottom: theme('spacing.3')
						}
					}
				}
			})
		}
	},
	plugins: [require('@tailwindcss/typography')]
};

module.exports = config;
