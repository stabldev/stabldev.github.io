import satori from "satori";

export const og = () => ({
  name: "satori-og",
  hooks: {
    "astro:build:done": async () => {
      const svg = await satori({
        type: "div",
        props: {
          style: {
            color: "white",
            background: "black",
          },
          children: "Hello there!",
        },
      });

      console.log("Generated svg: ", svg);
    },
  },
});
