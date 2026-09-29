"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

const HIDDEN_ON = ["/invite-to-bid", "/request-quote"];

/**
 * Persistent call / bid actions on small screens — phone calls are a primary
 * conversion path on mobile. Hidden on the form pages themselves.
 */
export function MobileActionBar({ phone }: { phone: { display: string; e164: string } }) {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;
  return (
    <>
      <div aria-hidden="true" className="h-[calc(3.5rem+env(safe-area-inset-bottom))] md:hidden" />
      <div className="surface-dark fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-white/10 bg-ink pb-[env(safe-area-inset-bottom)] md:hidden">
        <a
          href={`tel:${phone.e164}`}
          data-track-location="mobile-action-bar"
          className="flex h-14 items-center justify-center gap-2 text-[0.9375rem] font-semibold text-white"
        >
          <Phone aria-hidden="true" className="size-4 text-accent" />
          Call MEK
        </a>
        <Link
          href="/invite-to-bid"
          className="flex h-14 items-center justify-center bg-accent text-[0.9375rem] font-semibold text-ink"
        >
          Invite to Bid
        </Link>
      </div>
    </>
  );
}
