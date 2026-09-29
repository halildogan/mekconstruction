import type { NextConfig } from "next";

/*
 * Headers and redirects are compiled at build time, so NEXT_PUBLIC_* and
 * analytics variables must be present in the environment when `pnpm build`
 * runs (see SELF_HOSTING.md).
 */

const isDev = process.env.NODE_ENV === "development";

function originOf(url: string | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

const analyticsOrigin =
  process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER && process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER !== "none"
    ? originOf(process.env.NEXT_PUBLIC_ANALYTICS_SCRIPT_URL)
    : null;
const turnstile = "https://challenges.cloudflare.com";

/*
 * Content Security Policy without nonces so pages stay statically generated.
 * 'unsafe-inline' for scripts is required by Next.js' inline hydration data;
 * everything else is locked to first-party origins. User input is never
 * rendered as HTML.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${turnstile}${analyticsOrigin ? ` ${analyticsOrigin}` : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' ${turnstile}${analyticsOrigin ? ` ${analyticsOrigin}` : ""}`,
  `frame-src https://www.google.com ${turnstile}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ...(isDev ? [] : [{ key: "Strict-Transport-Security", value: "max-age=31536000" }]),
];

const nextConfig: NextConfig = {
  // Self-contained server bundle (.next/standalone) for the Docker image.
  // `pnpm start` (next start) keeps working for the systemd deployment.
  output: "standalone",
  // sharp (image optimization) loads its libvips shared libraries implicitly,
  // so file tracing can miss them. Include sharp's native packages explicitly,
  // for both hoisted and pnpm (isolated) node_modules layouts.
  outputFileTracingIncludes: {
    "/*": ["./node_modules/@img/**/*", "./node_modules/.pnpm/@img+sharp*/node_modules/@img/**/*"],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Form submissions, uploads and health checks must never be cached (Cloudflare or browser).
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
      {
        source: "/brand/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
  
};

export default nextConfig;
