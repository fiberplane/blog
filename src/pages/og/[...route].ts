import { OGImageRoute } from "astro-og-canvas";

// Generate a default OG image for non-blog pages
const pages = {
	index: {
		title: "Fiberplane Blog",
		description:
			"Insights and updates from the Fiberplane team on developer tools, observability, and collaborative debugging.",
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
				size: 56,
			},
			description: {
				size: 32,
			},
		},
		padding: 60,
	}),
});

