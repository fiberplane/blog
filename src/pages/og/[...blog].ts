import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

const blogEntries = await getCollection("blog");
const pages = Object.fromEntries(blogEntries.map(({ id, data }) => [id, data]));

export const { getStaticPaths, GET } = OGImageRoute({
	param: "blog",
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
				family: "Geist Sans",
				weight: "Bold",
			},
			description: {
				size: 32,
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
