export const DEFAULT_SITE_URL = "https://mekdomain.ca";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1", "[::1]"]);

function isPrivateHost(hostname: string): boolean {
  if (LOCAL_HOSTS.has(hostname) || hostname.endsWith(".local") || hostname.endsWith(".internal")) {
    return true;
  }
  return /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(hostname);
}

/**
 * Resolve the canonical public origin.
 *
 * Canonical URLs, sitemap entries, Open Graph URLs and structured data must
 * always point at the public domain — never localhost, an internal IP or the
 * internal port the app listens on behind Cloudflare Tunnel. An override is
 * accepted only when it is a well-formed public https URL.
 */
export function resolveSiteUrl(value: string | undefined): string {
  if (!value) return DEFAULT_SITE_URL;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || isPrivateHost(url.hostname)) {
      return DEFAULT_SITE_URL;
    }
    return url.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}
