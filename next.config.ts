import path from "node:path";
import type { NextConfig } from "next";

const projectRoot = path.resolve(__dirname);

/*
 * Headers and redirects are compiled at build time, so NEXT_PUBLIC_* and
 * analytics variables must be present in the environment when `pnpm build`
 * runs (see SELF_HOSTING.md).
 */

const isProd = process.env.NODE_ENV === 'production';

/*
 * Content Security Policy without nonces so pages stay statically generated.
 * 'unsafe-inline' for scripts is required by Next.js' inline hydration data;
 * everything else is locked to first-party origins. User input is never
 * rendered as HTML.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? '' : " 'unsafe-eval'"} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://*.google-analytics.com",
  "font-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
  "frame-src 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  ...(isProd ? ['upgrade-insecure-requests'] : []),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  ...(isProd ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' }] : []),
];
const nextConfig: NextConfig = {
  // Self-contained server bundle (.next/standalone) for the Docker image.
  // `pnpm start` (next start) keeps working for the systemd deployment.
  output: "standalone",
  // Pin the project root so a lockfile in a parent directory can never change
  // the workspace root (which would nest the standalone output).
  outputFileTracingRoot: projectRoot,
  turbopack: { root: projectRoot },
  // sharp (image optimization) loads its libvips shared libraries implicitly,
  // so file tracing can miss them. Include sharp's native packages explicitly.
  // Requires the flat layout set in .npmrc (node-linker=hoisted): symlinked
  // pnpm package folders make Turbopack's tracer fail with EISDIR.
  outputFileTracingIncludes: {
    "/*": ["./node_modules/@img/**/*"],
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
