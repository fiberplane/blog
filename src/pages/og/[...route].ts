import { OGImageRoute } from "astro-og-canvas";

// Generate a default OG image for non-blog pages
const pages = {
	index: {
		title: "Fiberplane Blog",
		description: "Dive into Fiberplane's MCP integrations and developer tools.",
	},
};

export const { getStaticPaths, GET } = OGImageRoute({
	param: "route",
	pages,
	getImageOptions: (_, page) => ({
		title: page.title,
		description: page.description,
		bgImage: {
			path: "./src/assets/og-bg.png",
			position: "center",
			fit: "cover",
		},
		logo: {
			path: "./src/assets/fp-logo.png",
		},
		font: {
			title: {
				size: 72,
				family: "Geist Sans",
				weight: "Bold",
			},
			description: {
				size: 48,
				family: "Geist Sans",
				weight: "Normal",
			},
		},
		fonts: [
			"./node_modules/@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff2",
			"./node_modules/@fontsource/geist-sans/files/geist-sans-latin-700-normal.woff2",
		],
		padding: 80,
	}),
});
