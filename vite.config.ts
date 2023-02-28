import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	// Allow access to "posts" folder
	server: {
		fs: {
			allow: ['./']
		}
	}
};

export default config;
