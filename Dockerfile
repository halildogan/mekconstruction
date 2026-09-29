# syntax=docker/dockerfile:1

# ─────────────────────────────────────────────────────────────
# MEK Construction — Next.js 16 production image
# Multi-stage build using Next.js "standalone" output.
# Next 16 requires Node >= 20.9; we pin the current LTS (22).
# ─────────────────────────────────────────────────────────────

FROM node:22-alpine AS base
# Next.js standalone server can need this on Alpine (glibc shim).
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ── Dependencies ──────────────────────────────────────────────
FROM base AS deps
# Install from lockfile only — reproducible, no dev network surprises.
COPY package.json package-lock.json ./
RUN npm ci

# ── Build ─────────────────────────────────────────────────────
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Never trace/bake secrets at build time; runtime env is injected by compose.
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ── Runtime ───────────────────────────────────────────────────
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Bind to all interfaces inside the container.
ENV HOSTNAME=0.0.0.0
ENV PORT=9040

# Run as an unprivileged user.
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Static assets served directly by the standalone server.
COPY --from=builder /app/public ./public
# The standalone output bundles a minimal server.js + traced node_modules.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 9040

# server.js is emitted at the root of the standalone output.
CMD ["node", "server.js"]
