import { MobileNav } from "@/components/MobileNav";
import { Sidebar } from "@/components/Sidebar";

// Mirrors adammaj.com: a 596px wrapper (Chakra container) centred on the page, with a
// second, equally wide container inside it whose 16px padding offsets the text column.
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto mt-16 w-full max-w-[596.161px] px-4 pb-8 md:pb-40">
      <div className="fixed inset-x-0 top-0 z-100 hidden h-16 bg-white lg:block" />
      <MobileNav />
      <Sidebar />
      <main className="relative px-4 md:w-[596.161px]">{children}</main>
    </div>
  );
}
