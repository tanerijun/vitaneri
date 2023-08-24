module.exports = {
	extends: ["eslint:recommended", "plugin:astro/recommended", "plugin:astro/jsx-a11y-recommended", "prettier"],
	env: {
		browser: true,
		node: true,
		es2023: true,
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	overrides: [
		{
			files: ["*.astro"],
			parser: "astro-eslint-parser",
			// Parse the script in `.astro` as TypeScript.
			parserOptions: {
				parser: "@typescript-eslint/parser",
				extraFileExtensions: [".astro"],
			},
			rules: {},
		},
		{
			files: ["*.svelte"],
			extends: ["plugin:svelte/recommended"],
			parser: "svelte-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
			},
		},
		{
			files: ["*.tsx"],
			extends: ["plugin:jsx-a11y/recommended", "plugin:solid/typescript"],
		},
	],
};
