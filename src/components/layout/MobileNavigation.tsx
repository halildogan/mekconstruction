"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import type { NavItem } from "@/types/content";
import { buttonClasses } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { isActivePath } from "@/components/layout/NavLinks";
import { cn } from "@/lib/cn";

interface MobileNavigationProps {
  items: readonly NavItem[];
  phone: { display: string; e164: string };
  serviceArea: string;
}

/**
 * Mobile menu built on the native modal <dialog>:
 * - showModal() makes the rest of the page inert, so focus stays in the menu
 * - Escape closes it (native `cancel`), and focus returns to the menu button
 * - background scrolling is locked while open
 * - it closes automatically after navigation
 */
export function MobileNavigation({ items, phone, serviceArea }: MobileNavigationProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const titleId = useId();

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const openMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    setOpen(true);
  };

  // Lock background scroll while the menu is open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    const previous = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
    root.style.overflow = "hidden";
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
    return () => {
      root.style.overflow = previous.overflow;
      root.style.paddingRight = previous.paddingRight;
    };
  }, [open]);

  // Close after client-side navigation.
  useEffect(() => {
    close();
  }, [pathname, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openMenu}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 border border-ink/20 px-2.5 text-sm font-semibold text-ink hover:border-ink xs:px-3"
      >
        <Menu aria-hidden="true" className="size-5" />
        <span className="sr-only xs:not-sr-only">Menu</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => {
          setOpen(false);
          triggerRef.current?.focus();
        }}
        onClick={(event) => {
          // Clicking the backdrop (the dialog element itself) closes the menu.
          if (event.target === dialogRef.current) close();
        }}
        className={cn(
          "surface-dark m-0 ml-auto h-dvh max-h-none w-full max-w-md bg-ink p-0 text-white",
          "backdrop:bg-ink/60 backdrop:backdrop-blur-[2px]",
          "open:flex open:flex-col",
        )}
      >
        <h2 id={titleId} className="sr-only">
          Site menu
        </h2>
        <div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-white/10 px-4 sm:px-6">
          <Link href="/" onClick={close} aria-label="MEK Construction Inc. — home">
            <Logo dark />
          </Link>
          <button
            type="button"
            onClick={close}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 border border-white/25 px-3 text-sm font-semibold hover:border-white"
          >
            <X aria-hidden="true" className="size-5" />
            <span>Close</span>
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <ul className="border-t border-white/10">
            {items.map((item, i) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-white/10">
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-14 items-center justify-between py-3 text-2xl font-semibold [font-stretch:90%]",
                      active ? "text-accent" : "text-white hover:text-accent",
                    )}
                  >
                    {item.label}
                    <span className="eyebrow text-steel-400">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 grid gap-3">
            <Link href="/invite-to-bid" onClick={close} className={buttonClasses("primary", "lg", "w-full")}>
              Invite MEK to Bid
            </Link>
            <Link href="/request-quote" onClick={close} className={buttonClasses("outline-light", "lg", "w-full")}>
              Request a Quote
            </Link>
          </div>
        </nav>

        <div className="shrink-0 border-t border-white/10 px-4 py-5 sm:px-6">
          <a
            href={`tel:${phone.e164}`}
            data-track-location="mobile-menu"
            className="flex min-h-11 items-center gap-3 text-lg font-semibold hover:text-accent"
          >
            <Phone aria-hidden="true" className="size-5 text-accent" />
            {phone.display}
          </a>
          <p className="mt-1 text-sm text-steel-400">{serviceArea}</p>
        </div>
      </dialog>
    </>
  );
}
