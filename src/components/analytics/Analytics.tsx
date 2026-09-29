"use client";

import Script from "next/script";
import { useEffect } from "react";
import { analyticsConfig, track } from "@/lib/analytics";

/**
 * Loads the configured analytics script (if any) and tracks phone/email link
 * clicks site-wide with one delegated listener, so links stay server-rendered.
 * Add `data-track-location="header"` (etc.) to a link to label where it was.
 */
export function Analytics() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute("href") ?? "";
      const location = anchor.dataset.trackLocation ?? "page";
      if (href.startsWith("tel:")) track("phone_clicked", { location });
      else if (href.startsWith("mailto:")) track("email_clicked", { location });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const { provider, scriptUrl, siteId } = analyticsConfig;
  if (provider === "plausible" && scriptUrl && siteId) {
    return <Script src={scriptUrl} data-domain={siteId} strategy="afterInteractive" />;
  }
  if (provider === "umami" && scriptUrl && siteId) {
    return <Script src={scriptUrl} data-website-id={siteId} strategy="afterInteractive" />;
  }
  return null;
}
