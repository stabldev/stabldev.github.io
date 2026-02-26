// @ts-check

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import { expressiveCode } from "./src/integrations/expressive-code";
import { remarkReadingTime } from "./src/lib/remark-reading-time";

// https://astro.build/config
export default defineConfig({
  site: "https://stabldev.github.io",
  devToolbar: { enabled: false },
  integrations: [icon(), expressiveCode(), sitemap()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  vite: {
    // @ts-expect-error vite version conflict
    plugins: [tailwindcss()],
  },
});
