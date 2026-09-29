"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * The current year. Pages are statically generated, so the server snapshot is
 * the build year; the browser then renders the actual current year, keeping
 * the copyright line correct without a rebuild.
 */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => buildYear,
  );
  return <>{year}</>;
}
