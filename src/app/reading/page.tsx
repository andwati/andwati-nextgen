import type { Metadata } from "next";
import Link from "next/link";
import { Mdx } from "@/components/Mdx";
import { readLine } from "@/lib/books";
import { coverExists, getBooks, spineFor, summarize } from "@/lib/content";

export const metadata: Metadata = {
  title: "Reading",
  description: "Books and papers I have read, with ratings and notes.",
  alternates: { canonical: "/reading" },
};

export default function ReadingIndex() {
  return (
    <div className="flex flex-col">
      <h1 className="sr-only">Reading</h1>
      {getBooks().map((b, i) => {
        const cover = coverExists(b.data.coverImage)
          ? b.data.coverImage
          : undefined;
        const { spineColor, textColor } = spineFor(b.data.title);
        const summary = summarize(b.content);
        return (
          <div key={b.slug} className={i > 0 ? "mt-5" : undefined}>
            {i > 0 && <hr className="mb-3" />}
            <div className="flex gap-6">
              {cover ? (
                // biome-ignore lint/performance/noImgElement: small local cover
                <img
                  src={cover}
                  alt={b.data.title}
                  className="h-[100px] border border-gray-200 sm:h-[140px] md:h-[160px]"
                  style={{ width: "auto" }}
                />
              ) : (
                <div
                  className="flex h-[100px] w-[68px] shrink-0 items-center border border-gray-200 p-2 text-xs font-bold sm:h-[140px] sm:w-24 md:h-[160px] md:w-28"
                  style={{ backgroundColor: spineColor, color: textColor }}
                >
                  {b.data.title}
                </div>
              )}
              <div className="flex min-w-0 flex-col">
                <Link
                  href={`/reading/${b.slug}`}
                  className="block hover:underline"
                >
                  <h2 className="text-[20px] leading-6 font-bold">
                    {b.data.title}
                  </h2>
                </Link>
                {b.data.authors?.length ? (
                  <p className="mt-2 text-[#999]">
                    {b.data.authors.join(", ")}
                  </p>
                ) : null}
                <p className="mt-2 text-[#666]">{readLine(b.data)}</p>
                {summary && (
                  <article className="prose mt-2">
                    <Mdx source={summary} />
                  </article>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
