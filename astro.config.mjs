// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    icon(),
    expressiveCode({
      frames: { showCopyToClipboardButton: false },
      styleOverrides: {
        frames: {
          editorActiveTabBackground: "var(--color-base-200)",
          editorActiveTabBorderColor:
            "color-mix(in srgb, var(--color-base-content) 10%, transparent)",
          editorActiveTabForeground:
            "color-mix(in srgb, var(--color-base-content) 75%, transparent)",
          editorActiveTabIndicatorTopColor: "transparent",
          editorActiveTabIndicatorBottomColor:
            "color-mix(in srgb, var(--color-base-content) 10%, transparent)",
          editorBackground: "var(--color-base-200)",
          editorTabBarBackground: "var(--color-base-300)",
          editorTabBarBorderBottomColor:
            "color-mix(in srgb, var(--color-base-content) 10%, transparent)",
          editorTabBarBorderColor:
            "color-mix(in srgb, var(--color-base-content) 10%, transparent)",
          editorTabBorderRadius: "0",
          frameBoxShadowCssValue: "0",
          // inlineButtonBorder:
          //   "color-mix(in srgb, var(--color-base-content) 50%, transparent)",
          // inlineButtonBackgroundHoverOrFocusOpacity: "0.2",
          // inlineButtonBackgroundActiveOpacity: "0.1",
          // inlineButtonBackgroundIdleOpacity: "0.1",
          shadowColor: "transparent",
          // tooltipSuccessBackground:
          //   "color-mix(in srgb, var(--color-base-content) 10%, transparent)",
          terminalBackground: "var(--color-base-200)",
          terminalTitlebarBackground: "var(--color-base-300)",
          terminalTitlebarBorderBottomColor:
            "color-mix(in srgb, var(--color-base-content) 10%, transparent)",
          terminalTitlebarForeground:
            "color-mix(in srgb, var(--color-base-content) 75%, transparent)",
          terminalTitlebarDotsForeground: "var(--color-base-content)",
          terminalTitlebarDotsOpacity: "0.25",
        },
        borderRadius: "0",
        borderColor:
          "color-mix(in srgb, var(--color-base-content) 10%, transparent)",
        codePaddingBlock: "calc(var(--spacing)*4)",
        codePaddingInline: "calc(var(--spacing)*4)",
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: { enabled: false },
  trailingSlash: "never",
  build: {
    format: "file",
  },
});
