import type { AstroIntegration } from "astro";
import { execSync } from "child_process";
import fs from "fs";
import sirv from "sirv";

export function pagefindIntegration(): AstroIntegration {
	return {
		name: "pagefind",
		hooks: {
			"astro:server:setup": ({ logger, server }) => {
				if (!fs.existsSync("dist")) {
					logger.error("Couldn't find Pagefind resources.");
					logger.warn("To enable local development. Make sure to build your project at least once.");
					logger.warn("Skipping serving Pagefind resources.");
					return;
				}

				logger.info("Serving Pagefind resources from previous build.");
				const serve = sirv("dist", { dev: true, etag: true });
				server.middlewares.use((req, res, next) => {
					if (req.url?.startsWith("/pagefind")) {
						serve(req, res, next);
					} else {
						next();
					}
				});
			},
			"astro:build:done": ({ logger }) => {
				logger.info("Starting indexing process.");
				const cmd = `npx pagefind --site "dist"`;
				execSync(cmd);
				logger.info("Indexing successful.");
			},
		},
	};
}
