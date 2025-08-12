// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { expressiveCode } from "./src/integrations/expressive-code";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://stabldev.github.io",
  devToolbar: { enabled: false },
  integrations: [icon(), expressiveCode(), sitemap()],
  vite: {
    // @ts-expect-error vite version conflict
    plugins: [tailwindcss()],
  },
});
