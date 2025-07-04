// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { og } from "./src/integrations/og";
import { expressiveCode } from "./src/integrations/expressive-code";

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), og(), expressiveCode()],
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: { enabled: false },
  trailingSlash: "never",
  build: {
    format: "file",
  },
});
