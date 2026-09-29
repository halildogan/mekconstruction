"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";

/**
 * Map facade: nothing is loaded from Google until the visitor asks for the
 * map, which keeps the contact page fast and avoids third-party requests.
 */
export function MapEmbed({ query, label }: { query: string; label: string }) {
  const [loaded, setLoaded] = useState(false);
  const encoded = encodeURIComponent(query);

  if (loaded) {
    return (
      <iframe
        title={`Map showing ${label}`}
        src={`https://www.google.com/maps?q=${encoded}&output=embed`}
        className="aspect-[4/3] w-full border-0 bg-concrete-200"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="grid-lines relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 border border-ink/12 bg-concrete-100 p-6 text-center">
      <MapPin aria-hidden="true" className="size-8 text-accent-ink" />
      <p className="max-w-xs font-semibold">{label}</p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button type="button" onClick={() => setLoaded(true)} className={buttonClasses("secondary")}>
          Load map
        </button>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("outline")}
        >
          Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <p className="text-xs text-steel-600">Loading the map connects to Google.</p>
    </div>
  );
}
