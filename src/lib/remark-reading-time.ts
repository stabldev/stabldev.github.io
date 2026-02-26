import { toString as mdastToString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

export function remarkReadingTime() {
  return (tree: unknown, { data }: { data: unknown }) => {
    const textOnPage = mdastToString(tree);
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    (
      data as unknown as { astro: { frontmatter: { minutesRead: string } } }
    ).astro.frontmatter.minutesRead = readingTime.text;
  };
}
