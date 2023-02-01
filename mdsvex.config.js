import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import remarkHeadings from '@vcarl/remark-headings';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import relativeImages from 'mdsvex-relative-images';
import { visit } from 'unist-util-visit';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [headings, videos, relativeImages],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap'
			}
		]
	]
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

/**
 * Adds support for video files in markdown image links
 *
 * This allows `![my video](/videos/my-cool-video.mp4)` to work
 */
function videos() {
	const extensions = ['mp4', 'webm'];
	return function transformer(tree) {
		visit(tree, 'image', (node) => {
			if (extensions.some((ext) => node.url.endsWith(ext))) {
				node.type = 'html';
				node.value = `
				    <video
				      src="${node.url}"
				      autoplay
				      muted
				      playsinline
				      loop
				      title="${node.alt}"
				    />
				  `;
			}
		});
	};
}
