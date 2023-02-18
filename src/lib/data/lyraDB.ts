import { create, insert } from '@lyrasearch/lyra';
import { posts } from './posts';

// Database for client side search implementation
const lyraInstance = await create({
	schema: {
		title: 'string',
		preview: 'string',
		tags: 'string'
	}
});

posts.forEach(async (post) => {
	await insert(lyraInstance, {
		title: post.title,
		preview: post.preview.text || '',
		tags: post.tags.join(' ')
	});
	// Remember to boost the title field in client search
});

export { lyraInstance };
