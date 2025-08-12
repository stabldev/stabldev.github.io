import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection("posts");

  return rss({
    title: "Stabldev’s Blog",
    description: "A place where I write, build, and share all things dev.",
    site: site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/p/${post.id}/`,
    })),
  });
};
