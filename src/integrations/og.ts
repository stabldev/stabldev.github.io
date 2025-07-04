import type { AstroIntegration } from "astro";
import path from "node:path";
import fs from "fs/promises";
import parseFrontmatter from "gray-matter";
import satori from "satori";
import { siteConfig } from "../config/site";
import { Resvg } from "@resvg/resvg-js";

const render = (title: string, description: string) => ({
  type: "div",
  props: {
    style: {
      height: "100%",
      width: "100%",
      display: "flex",
      color: "#ffffff",
      backgroundColor: "#1f1f1f",
      padding: 50,
    },
    children: {
      type: "div",
      props: {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "#ffffff",
          backgroundColor: "#2f2f2f",
          padding: 50,
          border: "1px solid #ffffff25",
          fontFamily: "Inter",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                fontSize: 72,
                fontWeight: "bold",
                marginBottom: 30,
                width: "90%",
                fontFamily: "Space Grotesk",
              },
              children: title,
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontSize: 38,
                opacity: 0.75,
                marginBottom: 40,
                width: "80%",
              },
              children:
                description.length >= 80
                  ? `${description.slice(0, 78)}...`
                  : description,
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 25,
                marginTop: "auto",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      height: 5,
                      width: 100,
                      backgroundColor: "#ffffff50",
                    },
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 28,
                      opacity: 0.75,
                    },
                    children: new URL(siteConfig.url).hostname,
                  },
                },
              ],
            },
          },
        ],
      },
    },
  },
});

export const og = (): AstroIntegration => ({
  name: "satori-og",
  hooks: {
    "astro:build:done": async ({ dir, pages }) => {
      const [spaceGrotesk, inter] = await Promise.all([
        fs.readFile("public/fonts/space-grotesk-latin-700-normal.ttf"),
        fs.readFile("public/fonts/inter-latin-400-normal.ttf"),
      ]);

      const projectRoot = process.cwd();
      const postsDir = path.join(projectRoot, "__posts__");
      const postFiles = await fs.readdir(postsDir);
      const postSlugs = new Set();

      // generate a set of valid post slugs
      for (const file of postFiles) {
        const slug = file.replace(/\.(md|mdx)$/, "");
        postSlugs.add(slug);
      }

      for (const page of pages) {
        if (postSlugs.has(page.pathname)) {
          const content = await fs.readFile(
            path.join(postsDir, `${page.pathname}.md`),
            "utf-8",
          );
          const { title, description } = parseFrontmatter(content).data;
          const svg = await satori(render(title, description), {
            width: 1200,
            height: 630,
            fonts: [
              {
                name: "Space Grotesk",
                data: spaceGrotesk,
                weight: 700,
                style: "normal",
              },
              {
                name: "Inter",
                data: inter,
                weight: 400,
                style: "normal",
              },
            ],
          });

          const resvg = new Resvg(svg, {
            fitTo: {
              mode: "width",
              value: 1200,
            },
          });

          await fs.writeFile(
            `${dir.pathname}${page.pathname}-og.png`,
            resvg.render().asPng(),
          );
        }
      }
    },
  },
});
