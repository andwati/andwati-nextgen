import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getWritings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays and CTF writeups on software development, security, binary exploitation and Linux.",
  alternates: { canonical: "/writing" },
};

export default function WritingIndex() {
  const posts = getWritings();
  return (
    <div className="flex flex-col gap-3">
      <h1 className="sr-only">Writing</h1>
      <hr />
      {posts.map((post) => (
        <div key={post.slug} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Link
              href={`/writing/${post.slug}`}
              className="text-blue-600 hover:underline"
            >
              {post.data.title}
            </Link>
            <span className="text-right text-sm text-gray-500">
              {formatDate(String(post.data.date))}
            </span>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
