"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ShelfBook } from "@/lib/books";

const W = 41.5;
const H = 220;
const SPINE = `${W}px`;
const COVER = `${W * 4}px`;
const BOOK = `${W * 5}px`;
const FILTER = "brightness(0.8) contrast(2)";
const PAPER = {
  pointerEvents: "none",
  opacity: 0.4,
  filter: "url(#paper)",
  zIndex: 50,
} as const;

export function Bookshelf({ books }: { books: ShelfBook[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const slug = pathname.split("/")[2];
  const bookIndex = slug ? books.findIndex((b) => b.slug === slug) : -1;

  const viewportRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [scroll, setScroll] = useState(0);
  const [inView, setInView] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const maxScroll =
    (W + 12) * (books.length - inView) + (bookIndex > -1 ? W * 4 : 0) + 5;
  const clamp = (x: number) => Math.max(0, Math.min(maxScroll, x));

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setInView(el.clientWidth / (W + 11));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (bookIndex === -1) setScroll((s) => Math.max(0, s));
    else setScroll(Math.max(0, (bookIndex - (inView - 4.5) / 2) * (W + 11)));
  }, [bookIndex, inView]);

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );

  const start = (dir: 1 | -1) => {
    if (timer.current) clearInterval(timer.current);
    setIsScrolling(true);
    timer.current = setInterval(() => setScroll((s) => clamp(s + dir * 3)), 10);
  };
  const stop = () => {
    setIsScrolling(false);
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  const arrow = (dir: 1 | -1) => ({
    onMouseEnter: () => start(dir),
    onMouseLeave: stop,
    onTouchStart: () => start(dir),
    onTouchEnd: stop,
  });

  return (
    <>
      <svg className="invisible absolute inset-0" aria-hidden="true">
        <defs>
          <filter id="paper" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="8"
              result="noise"
            />
            <feDiffuseLighting
              in="noise"
              lightingColor="white"
              surfaceScale="1"
              result="diffLight"
            >
              <feDistantLight azimuth="45" elevation="35" />
            </feDiffuseLighting>
          </filter>
        </defs>
      </svg>

      <div className="relative">
        <div
          className={`absolute -left-7 h-full md:-left-9 ${scroll > 0 ? "block" : "hidden"}`}
        >
          <div
            {...arrow(-1)}
            className="flex h-full w-7 items-center justify-center rounded-md max-md:rounded-r-none hover:bg-gray-100"
          >
            <Chevron dir="left" />
          </div>
        </div>

        <div
          ref={viewportRef}
          className="flex cursor-grab items-center gap-3 overflow-x-hidden"
        >
          {books.map((book, i) => {
            const open = bookIndex === i;
            return (
              <button
                type="button"
                key={book.slug}
                onClick={() => router.push(open ? "/reading" : book.href)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  outline: "none",
                  flexShrink: 0,
                  transform: `translateX(-${scroll}px)`,
                  width: open ? BOOK : SPINE,
                  perspective: "1000px",
                  transition: isScrolling
                    ? "transform 100ms linear"
                    : "all 500ms ease",
                }}
              >
                <div
                  className="flex shrink-0 items-start justify-center"
                  style={{
                    width: SPINE,
                    height: H,
                    transformOrigin: "right",
                    backgroundColor: book.spineColor,
                    color: book.textColor,
                    transform: `rotateY(${open ? "-60deg" : "0deg"})`,
                    transition: "all 500ms ease",
                    filter: FILTER,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span
                    className="fixed top-0 left-0"
                    style={{ ...PAPER, height: H, width: SPINE }}
                  />
                  <span
                    className="mt-3 block select-none overflow-hidden text-ellipsis whitespace-nowrap text-[12px] leading-[1.2] font-bold"
                    style={{
                      writingMode: "vertical-rl",
                      maxHeight: H - 24,
                      fontFamily: '"DM Sans", sans-serif',
                    }}
                  >
                    {book.title}
                  </span>
                </div>
                <div
                  className="relative shrink-0 overflow-hidden"
                  style={{
                    transformOrigin: "left",
                    transform: `rotateY(${open ? "30deg" : "88.8deg"})`,
                    transition: "all 500ms ease",
                    filter: FILTER,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span
                    className="fixed top-0 right-0"
                    style={{ ...PAPER, height: H, width: COVER }}
                  />
                  <span
                    className="absolute top-0 left-0"
                    style={{
                      pointerEvents: "none",
                      zIndex: 50,
                      height: H,
                      width: COVER,
                      background:
                        "linear-gradient(to right, rgba(255,255,255,0) 2px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0.25) 4px, rgba(255,255,255,0.25) 6px, transparent 7px, transparent 9px, rgba(255,255,255,0.25) 9px, transparent 12px)",
                    }}
                  />
                  {book.coverImage ? (
                    // biome-ignore lint/performance/noImgElement: fixed-size local cover inside a 3D transform
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      width={W * 4}
                      height={H}
                      style={{ width: COVER, height: H }}
                    />
                  ) : (
                    <div
                      className="flex items-center p-4 text-left text-sm font-bold"
                      style={{
                        width: COVER,
                        height: H,
                        backgroundColor: book.spineColor,
                        color: book.textColor,
                      }}
                    >
                      {book.title}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div
          className={`absolute top-0 -right-7 h-full pl-2.5 md:-right-9 ${scroll < maxScroll ? "block" : "hidden"}`}
        >
          <div
            {...arrow(1)}
            className="flex h-full w-7 items-center justify-center rounded-md max-md:rounded-l-none hover:bg-gray-100"
          >
            <Chevron dir="right" />
          </div>
        </div>
      </div>
    </>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={dir === "left" ? "M15 4l-8 8 8 8" : "M9 4l8 8-8 8"} />
    </svg>
  );
}
