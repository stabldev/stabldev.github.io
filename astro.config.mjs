// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { og } from "./src/integrations/og";
import { expressiveCode } from "./src/integrations/expressive-code";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://stabldev.github.io",
  devToolbar: { enabled: false },
  integrations: [icon(), og(), expressiveCode(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
