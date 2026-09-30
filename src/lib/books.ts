import {
  type Book,
  coverExists,
  formatDate,
  getBooks,
  spineFor,
} from "@/lib/content";

export type ShelfBook = {
  slug: string;
  href: string;
  title: string;
  coverImage?: string;
  spineColor: string;
  textColor: string;
};

export function getShelf(): ShelfBook[] {
  return getBooks().map((b) => ({
    slug: b.slug,
    href: `/reading/${b.slug}`,
    title: b.data.title,
    coverImage: coverExists(b.data.coverImage) ? b.data.coverImage : undefined,
    ...spineFor(b.data.title),
  }));
}

export function readLine(b: Book) {
  return [
    b.dateFinished && `Read: ${formatDate(b.dateFinished)}`,
    b.rating && `Rating: ${b.rating}/5`,
  ]
    .filter(Boolean)
    .join(" • ");
}

export function byline(b: Book) {
  const parts = [
    b.authors?.length && `By: ${b.authors.join(", ")}`,
    b.dateFinished && `Read: ${formatDate(b.dateFinished)}`,
    b.rating && `Rating: ${b.rating}/5`,
  ];
  return parts.filter(Boolean).join(" - ");
}
