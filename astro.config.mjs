import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

export default defineConfig({
  integrations: [tailwind({
    applyBaseStyles: false
  }), mdx()],
  experimental: {
    assets: true
  },
  image: {
    service: sharpImageService()
  },
  redirects: {
    "/posts": "/"
  }
});