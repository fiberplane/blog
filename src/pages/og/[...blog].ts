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
			},
			description: {
				size: 32,
			},
		},
		padding: 60,
	}),
});
