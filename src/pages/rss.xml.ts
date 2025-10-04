import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ site }) => {
	const posts = await getCollection("posts");

	return rss({
		title: "Stabldev’s Blog",
		description: "A place where I write, build, and share all things dev.",
		site: site!,
		items: posts.map((post) => ({
			...post.data,
			link: `/p/${post.id}/`,
		})),
	});
};
