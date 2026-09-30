import { Bookshelf } from "@/components/Bookshelf";
import { getShelf } from "@/lib/books";

export default function ReadingLayout({ children }: LayoutProps<"/reading">) {
  return (
    <div className="flex flex-col gap-8">
      <Bookshelf books={getShelf()} />
      <hr />
      {children}
    </div>
  );
}
