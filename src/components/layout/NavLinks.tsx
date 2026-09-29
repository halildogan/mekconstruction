"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/types/content";
import { cn } from "@/lib/cn";

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-1 xl:gap-2">
      {items.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative inline-flex min-h-11 items-center px-3 text-[0.9375rem] font-medium transition-colors",
                "after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:origin-left after:bg-accent after:transition-transform after:duration-200",
                active
                  ? "text-ink after:scale-x-100"
                  : "text-steel-700 after:scale-x-0 hover:text-ink hover:after:scale-x-100",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
