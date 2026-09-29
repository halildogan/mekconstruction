"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Sticky main navigation bar. After the page scrolls a little it switches to
 * a compact height with a firmer border — a height change only, no motion
 * beyond a short transition (disabled under prefers-reduced-motion).
 */
export function HeaderBar({ children }: { children: ReactNode }) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setCompact(window.scrollY > 32);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      data-compact={compact || undefined}
      className={cn(
        "sticky top-0 z-40 border-b bg-paper/95 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 supports-[backdrop-filter]:bg-paper/90",
        compact ? "border-ink/15 shadow-[0_1px_0_rgb(17_19_21/0.04)]" : "border-transparent",
      )}
    >
      <div
        className={cn(
          "transition-[height] duration-200 ease-(--ease-standard)",
          compact ? "h-16" : "h-[4.5rem] lg:h-20",
        )}
      >
        {children}
      </div>
    </div>
  );
}
