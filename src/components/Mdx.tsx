import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

/** Renders exported markdown: GFM, raw HTML (callouts, embeds), and KaTeX math. */
export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          format: "md",
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [
            rehypeRaw,
            rehypeKatex,
            [
              rehypePrettyCode,
              {
                theme: "github-light",
                keepBackground: false,
                defaultLanguage: "txt",
              },
            ],
          ],
        },
      }}
    />
  );
}
