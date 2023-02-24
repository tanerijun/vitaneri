import * as prompt from '@clack/prompts';
import { generatePost } from './generatePost.js';

const POSTS_PATH = 'content/posts';
const TIL_PATH = 'content/TILs';

prompt.intro(`Starting content template generator...`);

const contentType = await prompt.select({
	message: 'Pick a content type.',
	options: [
		{ value: 'post', label: 'Blog Post' },
		{ value: 'TIL', label: 'Today I Learned' }
	]
});

if (contentType === 'post') {
	const title = await prompt.text({
		message: 'Enter a title for your post.',
		placeholder: 'My Awesome Post',
		validate(value) {
			if (value.length < 1) {
				return 'Please enter a title.';
			}
			if (value[0].toUpperCase() !== value[0]) {
				return 'Please capitalize the first letter of your title.';
			}
		}
	});

	const description = await prompt.text({
		message: 'Enter a description for your post.',
		placeholder: 'This is a description of my awesome post.',
		validate(value) {
			if (value.length > 0) {
				if (value[0].toUpperCase() !== value[0]) {
					return 'Please capitalize the first letter of your description.';
				}
				if (!value.endsWith('.')) {
					return 'Please end your description with a period.';
				}
			}
		}
	});

	const tags = await prompt.text({
		message: 'Enter tags for your post.',
		placeholder: 'tag1, tag2, tag3',
		validate(value) {
			if (value.length > 0) {
				if (value.includes(' ') && !value.includes(',')) {
					return 'Please use commas to separate your tags.';
				}
				if (value.toLowerCase() !== value) {
					return 'Please use lowercase letters for your tags. Use hyphens to separate words if needed.';
				}
			}
		}
	});

	generatePost(POSTS_PATH, title, description, tags);
}

prompt.outro(`You're all set!`);
