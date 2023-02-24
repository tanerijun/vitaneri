import * as fs from 'fs';
import GithubSlugger from 'github-slugger';
const slugger = new GithubSlugger();

/**
 * Generate a new post template.
 *
 * @param {string} path - The path to the folder where the post will be created.
 * @param {string} title - The title of the post.
 * @param {string} description - The description of the post.
 * @param {string} tags - The tags of the post.
 * @returns {string} The path to the post.
 */
export function generatePost(path, title, description = '', tags = '') {
	const BASE_PATH = path;
	const postSlug = slugger.slug(title);
	const processedTags = processTagsString(tags);

	const frontmatter = {
		datetime: new Date().toISOString(),
		title,
		slug: postSlug,
		featured: 'false',
		tags: processedTags,
		description
	};

	fs.mkdirSync(`${BASE_PATH}/${postSlug}/`);

	const writeStream = fs.createWriteStream(`${BASE_PATH}/${postSlug}/index.md`);

	writeStream.write('---\n');
	for (const [key, value] of Object.entries(frontmatter)) {
		writeStream.write(`${key}: ${value}\n`);
	}
	writeStream.write('---\n');
	writeStream.write('\n');
	writeStream.write('{/* Happy writing! */}');
	writeStream.write('\n');
	writeStream.end();

	return `${BASE_PATH}/${postSlug}/index.md`;
}

/**
 * Process the tags string into a YAML array.
 *
 * @param {string} tags - The tags string (ex: "tag1, tag2, tag3").
 * @returns {string} The tags string in YAML array format.
 */
function processTagsString(tags) {
	const separator = '\n  - ';
	let res = '';

	const tagsArray = tags.split(',').map((tag) => tag.trim());
	tagsArray.forEach((tag) => {
		res += separator + tag;
	});

	return res;
}
