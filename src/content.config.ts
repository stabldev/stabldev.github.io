import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const __posts__ = defineCollection({
  loader: glob({ pattern: "**/**.md", base: "./__posts__" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
  }),
});

// export all collections
export const collections = { __posts__ };
