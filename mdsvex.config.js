import remarkHeadings from '@vcarl/remark-headings';
import { defineMDSveXConfig as defineConfig } from 'mdsvex';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [headings],
	rehypePlugins: []
});

export default config;

/**
 * Parses headings and includes the result in metadata
 */
function headings() {
	return function transformer(tree, vfile) {
		// run remark-headings plugin
		remarkHeadings()(tree, vfile);

		// include the headings data in mdsvex frontmatter
		vfile.data.fm ??= {};
		vfile.data.fm.headings = vfile.data.headings.map((heading) => ({
			...heading,
			// slugify heading.value
			id: heading.value
				.toLowerCase()
				.replace(/\s/g, '-')
				.replace(/[^a-z0-9-]/g, '')
		}));
	};
}
