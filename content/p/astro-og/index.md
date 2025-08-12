---
title: Dynamic Open Graph Images with Satori and Astro
description: Open Graph Images are a great way to improve the social sharing experience of your website. In this post I'll show you how to create them and how to generate them dynamically with any static site generator, like Astro.
pubDate: 2025-08-12
categories: ["astro", "open graph", "satori"]
---

## What are Open Graph Images?

Open Graph is a special type of meta tag that can be used to provide additional information about a page.
It’s used by social media platforms like Facebook and Twitter to display a preview of a page when it’s shared.
The most important tags are `og:title`, `og:description` and `og:image`.
The first two are used to display the title and description of the page, while the latter is used to display an image.
This image is called the Open Graph Image or OG Image.

---

## How to Generate OG Images Dynamically?

Your best bet is to use [Satori](https://github.com/vercel/satori) to generate the OG images.
It is a relatively new project from Vercel, but it’s already incredibly powerful and easy to use.
In fact, it is just a single function call with a JSX template as the parameter.

### Are there any Alternatives to Satori?

Yes, there are a few alternatives to Satori, but they all have their own drawbacks.
Most of the alternatives like Puppeteer require running a headless browser, which adds a ton of complexity and overhead.

There are also some astro integrations, but they are so limited.
That’s why we will focus on custom build using Satori in this post.

---

## How to use Satori?

You can just install Satori with your favorite package manager.

```bash
npm install satori
```

Now, let’s use it to generate an OG image for this post. First, we need to create a template for the OG image.

We are gonna use **JSON element tree** structure for creating our layout.
If you've used react before, you've prolly seen this format:

```ts
{
  type: "tagName",
  props: {
    style: { ... },
    children: [...]
  }
}
```

You can see a ton of production examples over at the [Satori Playground](https://og-playground.vercel.app/).

To generate the code with Satori, you simply need to execute the following code.

```ts
import satori from "satori"

const svg = await satori(renderSchema, {
    // Add options here
    // For example to embed fonts or set a fixed width & height
    // View all options add https://github.com/vercel/satori
})
```

This code generates a string of SVG code.
You can either export the SVG code to a file or convert it to another format like PNG with an external library.

[ReSVG-JS](https://github.com/thx/resvg-js) seems to be the most popular option for converting SVGs to PNGs.
This should be fairly easy to implement with their documentation.

---

## How to implement Satori

There are a range of methods to implement Satori in your project.
I recommend creating an [Integration](https://docs.astro.build/en/guides/integrations-guide/) that builds the open graph PNG and saves it inside public directory.
Most static site generator should allow you to export a range of static paths that you can map to blog posts and their data.
This way, you can let the site generator handle all the complicated functionality of storing SVGs.

### Create Integration

Create an integration in your Astro project by creating a file named `og.ts` in the `src/integrations` directory.
And add the following code:

```ts
export const og = (): AstroIntegration => ({
  name: "satori-og",
  hooks: {
    "astro:build:done": async ({ dir, pages, logger }) => {
      try {
        const [spaceGrotesk, inter] = await Promise.all([
          fs.readFile("public/fonts/space-grotesk-latin-700-normal.ttf"),
          fs.readFile("public/fonts/inter-latin-400-normal.ttf"),
        ]);

        let ogGeneratedCount = 0;
        for (const { pathname } of pages) {
          if (!pathname.startsWith("p/")) continue;

          const file = await Promise.any([
            fs.readFile(`content/p/${pathname.slice(2, -1)}/index.md`),
            fs.readFile(`content/p/${pathname.slice(2, -1)}/index.mdx`),
          ]);

          const { title, description } = parseFrontmatter(file).data;
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
            `${dir.pathname}${pathname}og.png`,
            resvg.render().asPng(),
          );

          ogGeneratedCount++;
        }

        logger.info(`Generated ${ogGeneratedCount} OpenGraph; images`);
      } catch (err) {
        logger.error("OpenGraph image generation failed");
        throw err;
      }
    },
  },
});
```

This is a custom Astro integration named `satori-og` with hooks that runs after the main build phase.

Whats happening here, step by step:

* Load fonts buffer from the file.
* Iterate through all pages after `p/` endpoint (optional).
* Read file content and parse metadata using [gray-matter](https://github.com/jonschlinkert/gray-matter).
* Render SVG using `satori` and pass font details.
* Save renderd PNG using [ReSVG-JS](https://github.com/thx/resvg-js) to the public dir as `.../og.png`.
* Print build information.

### Configure Integration

Add `og` integration in the Astro integrations.

```mjs title=astro.config.mjs
import { og } from "./src/integrations/og"

export default defineConfig({
  //...other configs
  integrations: [..., og()],
})
```

Now Astro will run this after the main build phase as we mentioned in the `hooks` field.
Finally, we need to add the path of generated image in the `head` tag.

```astro title=Head.astro
---
import { siteConfig } from "@config/site"

interface Props {
  title?: string
  description?: string
}

const {
  title = siteConfig.title,
  description = siteConfig.description,
} = Astro.props

const canonicalURL = new URL(Astro.url.pathname, Astro.site)
const ogImageURL = new URL(
  canonicalURL.pathname +
    (canonicalURL.pathname.endsWith("/") ? "" : "/") +
    "og.png",
  Astro.site,
)
---

<!-- other meta-tags -->
<meta property="og:image" content={ogImageURL} />
<meta property="og:image:alt" content={title} />
```

And that's it! Now run the `build` command and you'll see generated images in the `dist/` directory.
This same approach can be used with other static site generators as well.
