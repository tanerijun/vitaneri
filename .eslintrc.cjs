module.exports = {
	extends: ["plugin:astro/recommended", "plugin:astro/jsx-a11y-recommended", "prettier"],
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
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		
		ecmaVersion: "latest",
		sourceType: "module",
	},
};
