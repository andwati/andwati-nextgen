import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { getWritings } from "@/lib/content";
import { abs } from "@/lib/site";

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeStringify);

/** Post bodies as HTML with root-relative links made absolute, for feed readers. */
export async function getFeedItems() {
  return Promise.all(
    getWritings().map(async (p) => {
      const html = String(await processor.process(p.content)).replace(
        /(src|href)="\/(?!\/)/g,
        `$1="${abs("/")}`,
      );
      return {
        slug: p.slug,
        url: abs(`/writing/${p.slug}`),
        title: p.data.title,
        description: p.data.description ?? "",
        date: new Date(String(p.data.date)),
        tags: p.data.tags ?? [],
        html,
      };
    }),
  );
}

export const xml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
