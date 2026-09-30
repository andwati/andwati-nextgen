"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "@/components/NavLink";
import { site } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: close the menu when the route changes
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-12 border-b border-gray-200 bg-white lg:hidden">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-8">
        <div className="flex gap-8">
          {site.nav.slice(0, 3).map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.name}
            </NavLink>
          ))}
        </div>
        <div ref={ref} className="relative">
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-100"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          {open && (
            <div className="absolute right-0 top-10 flex w-44 flex-col gap-4 rounded-md border border-gray-200 bg-white py-4 shadow-lg">
              <div className="flex flex-col gap-3 px-4">
                <h2 className="text-xs font-bold">NAVIGATION</h2>
                {site.nav.map((item) => (
                  <NavLink key={item.href} href={item.href}>
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <div className="flex flex-col gap-3 px-4">
                <h2 className="text-xs font-bold">FIND ME ON</h2>
                {site.social.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-black"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
