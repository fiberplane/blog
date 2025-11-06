import cloudflare from "@astrojs/cloudflare";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

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
	vite: {
		ssr: {
			external: ["canvaskit-wasm"],
		},
	},
});
