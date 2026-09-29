"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent, type AnalyticsProps } from "@/lib/analytics";

/** Fires a view event once when the page mounts (e.g. service_viewed). */
export function TrackView({ event, props }: { event: AnalyticsEvent; props?: AnalyticsProps }) {
  const serialized = JSON.stringify(props ?? {});
  useEffect(() => {
    track(event, JSON.parse(serialized) as AnalyticsProps);
  }, [event, serialized]);
  return null;
}
