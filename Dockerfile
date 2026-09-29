# syntax=docker/dockerfile:1

# ─────────────────────────────────────────────────────────────
# MEK Construction — Next.js 16 production image
# Multi-stage build using Next.js "standalone" output.
#
# Dependencies are installed with pnpm from pnpm-lock.yaml, which records the
# native binaries for every platform (Linux musl included). Do not switch to
# a package-lock.json generated on Windows: npm omits other platforms'
# optional dependencies (npm/cli#4828), which breaks Tailwind, LightningCSS,
# SWC and sharp on Alpine.
# ─────────────────────────────────────────────────────────────

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat \
  && corepack enable
WORKDIR /app

# ── Dependencies ──────────────────────────────────────────────
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN corepack install && pnpm install --frozen-lockfile

# ── Build ─────────────────────────────────────────────────────
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
# .dockerignore keeps host node_modules, .next and .env out of this copy.
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# NEXT_PUBLIC_* values are inlined at build time; pass them as build args if used.
ARG NEXT_PUBLIC_SITE_URL=https://mekdomain.ca
ARG NEXT_PUBLIC_ANALYTICS_PROVIDER=none
ARG NEXT_PUBLIC_ANALYTICS_SCRIPT_URL=
ARG NEXT_PUBLIC_ANALYTICS_SITE_ID=
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_ANALYTICS_PROVIDER=$NEXT_PUBLIC_ANALYTICS_PROVIDER \
    NEXT_PUBLIC_ANALYTICS_SCRIPT_URL=$NEXT_PUBLIC_ANALYTICS_SCRIPT_URL \
    NEXT_PUBLIC_ANALYTICS_SITE_ID=$NEXT_PUBLIC_ANALYTICS_SITE_ID \
    NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY
RUN pnpm build

# ── Runtime ───────────────────────────────────────────────────
FROM node:22-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=9060 \
    STORAGE_LOCAL_DIR=/app/.data/storage

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && mkdir -p /app/.data/storage \
  && chown -R nextjs:nodejs /app/.data

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Uploaded tender documents and submission records (private; mount a volume).
VOLUME ["/app/.data"]

USER nextjs
EXPOSE 9060

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:9060/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
