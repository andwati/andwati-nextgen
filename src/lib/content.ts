import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.join(process.cwd(), "content");

export type Entry<T> = { slug: string; data: T; content: string };

export type Writing = {
  title: string;
  description?: string;
  date: string;
  tags?: string[];
};

export type Portfolio = {
  title: string;
  description?: string;
  role?: string;
  dateStart?: string;
  dateEnd?: string;
  outcome?: string;
  links?: { label: string; url: string }[];
};

export type Book = {
  title: string;
  kind: "book" | "paper";
  authors?: string[];
  url?: string;
  coverImage?: string;
  rating?: number;
  status?: string;
  dateFinished?: string;
  tags?: string[];
};

function readDir<T>(dir: string): Entry<T>[] {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(full, f), "utf8"),
      );
      return { slug: f.replace(/\.md$/, ""), data: data as T, content };
    });
}

export function getWritings() {
  return readDir<Writing>("writing").sort((a, b) =>
    String(b.data.date).localeCompare(String(a.data.date)),
  );
}

export function getPortfolio() {
  return readDir<Portfolio>("portfolio").sort((a, b) =>
    String(b.data.dateStart ?? "").localeCompare(
      String(a.data.dateStart ?? ""),
    ),
  );
}

export function getBooks() {
  return readDir<Book>("reading").sort(
    (a, b) =>
      (b.data.rating ?? 0) - (a.data.rating ?? 0) ||
      a.data.title.localeCompare(b.data.title),
  );
}

export function getAbout() {
  const { content } = matter(
    fs.readFileSync(path.join(ROOT, "about.md"), "utf8"),
  );
  return content;
}

/** The part of a review shown on the index: everything before "## My Notes". */
export function summarize(content: string) {
  return content.split(/^## My Notes/m)[0].trim();
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

const SPINES: [string, string][] = [
  ["#7c3a2d", "#fbe9d0"],
  ["#264653", "#e9f5f2"],
  ["#2a4d3a", "#f1f7e8"],
  ["#5b3a6b", "#f6ecfa"],
  ["#c9a227", "#2b2110"],
  ["#1d3557", "#f1faee"],
  ["#8d5a3b", "#fff4e6"],
  ["#3b3b3b", "#f0f0f0"],
];

export function spineFor(title: string) {
  let h = 0;
  for (const c of title) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const [spineColor, textColor] = SPINES[h % SPINES.length];
  return { spineColor, textColor };
}

export function coverExists(coverImage?: string) {
  return (
    !!coverImage &&
    fs.existsSync(path.join(process.cwd(), "public", coverImage))
  );
}
