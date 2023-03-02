import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte({ hot: !process.env.VITEST })],
	test: {
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		globals: true,
		environment: 'jsdom',
		setupFiles: ['/src/lib/test-utils/setupTest.ts']
	},
	resolve: {
		alias: {
			$lib: '/src/lib',
			'$app/stores': '/src/lib/test-utils/stubs/stores.ts'
		}
	}
});
