import type { AstroIntegration } from "astro";
import { execSync } from "child_process";

export function pagefindIntegration(): AstroIntegration {
	return {
		name: "pagefind",
		hooks: {
			"astro:build:done": ({ logger }) => {
				logger.info("Starting indexing process.");
				const cmd = `npx pagefind --site "dist"`;
				execSync(cmd);
				logger.info("Indexing successful.");
			},
		},
	};
}
