import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	// Allow access to "posts" folder
	server: {
		fs: {
			allow: ['./']
		}
	}
};

export default config;
