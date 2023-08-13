import { defineConfig, sharpImageService } from "astro/config";

import tailwind from "@astrojs/tailwind";

export default defineConfig({
	integrations: [tailwind({ applyBaseStyles: false })],
	experimental: { assets: true },
	image: {
		service: sharpImageService(),
	},
});
