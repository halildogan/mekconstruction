/**
 * Vendor-neutral conversion tracking.
 *
 * `track()` always dispatches a `mek:analytics` DOM event (so any tool can
 * listen without code changes) and forwards to the configured provider:
 *   NEXT_PUBLIC_ANALYTICS_PROVIDER = "none" (default) | "plausible" | "umami"
 * Both supported providers are cookieless and can be self-hosted.
 * Never pass personal information (names, emails, phone numbers) as props.
 */

export type AnalyticsEvent =
  | "request_quote_started"
  | "request_quote_submitted"
  | "bid_invitation_started"
  | "bid_invitation_submitted"
  | "contact_submitted"
  | "phone_clicked"
  | "email_clicked"
  | "project_viewed"
  | "service_viewed";

export type AnalyticsProps = Record<string, string | number | boolean>;

export type AnalyticsProvider = "none" | "plausible" | "umami";

export const analyticsConfig = {
  provider: (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? "none") as AnalyticsProvider,
  scriptUrl: process.env.NEXT_PUBLIC_ANALYTICS_SCRIPT_URL ?? "",
  siteId: process.env.NEXT_PUBLIC_ANALYTICS_SITE_ID ?? "",
};

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: AnalyticsProps }) => void;
    umami?: { track: (event: string, data?: AnalyticsProps) => void };
  }
}

export function track(event: AnalyticsEvent, props: AnalyticsProps = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent("mek:analytics", { detail: { event, props } }));
    if (analyticsConfig.provider === "plausible") window.plausible?.(event, { props });
    if (analyticsConfig.provider === "umami") window.umami?.track(event, props);
  } catch {
    // Analytics must never break the page.
  }
}
