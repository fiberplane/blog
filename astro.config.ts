import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
	site: "https://blog.fiberplane.com",
	adapter: cloudflare(),
	integrations: [starlight({ title: "Fiberplane Blog" })],
	markdown: {
		shikiConfig: {
			themes: {
				light: "github-light",
				dark: "github-dark",
			},
		},
	},
});
