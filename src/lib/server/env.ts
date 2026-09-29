import "server-only";

import path from "node:path";
import { z } from "zod";
import { logger } from "@/lib/server/log";

/**
 * Server-only runtime configuration, read from environment variables at
 * request time (never inlined into client bundles). Missing third-party
 * credentials degrade gracefully: submissions are still validated and stored,
 * and the missing piece is logged so it can be configured.
 */

const bool = z
  .enum(["true", "false", "1", "0", "yes", "no"])
  .transform((v) => v === "true" || v === "1" || v === "yes");

const emailList = z
  .string()
  .transform((v) =>
    v
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  )
  .pipe(z.array(z.email()));

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  EMAIL_PROVIDER: z.enum(["console", "resend", "smtp"]).optional(),
  EMAIL_FROM: z.string().min(3).optional(),
  RESEND_API_KEY: z.string().min(10).optional(),
  SMTP_HOST: z.string().min(1).optional(),
  SMTP_PORT: z.coerce.number().int().positive().optional(),
  SMTP_SECURE: bool.optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  CONTACT_EMAIL: emailList.optional(),
  BID_EMAIL: emailList.optional(),
  QUOTE_EMAIL: emailList.optional(),
  EMAIL_ATTACHMENT_MAX_MB: z.coerce.number().min(0).max(40).default(10),

  STORAGE_DRIVER: z.enum(["local", "s3"]).default("local"),
  STORAGE_LOCAL_DIR: z.string().min(1).optional(),
  S3_ENDPOINT: z.url().optional(),
  S3_REGION: z.string().default("auto"),
  S3_BUCKET: z.string().min(1).optional(),
  S3_ACCESS_KEY_ID: z.string().min(1).optional(),
  S3_SECRET_ACCESS_KEY: z.string().min(1).optional(),
  UPLOAD_LINK_TTL_HOURS: z.coerce.number().int().min(0).max(168).default(72),

  TURNSTILE_SECRET_KEY: z.string().min(1).optional(),
});

export interface ServerEnv {
  isProduction: boolean;
  email: {
    provider: "console" | "resend" | "smtp";
    from: string;
    resendApiKey?: string;
    smtp?: { host: string; port: number; secure: boolean; user?: string; password?: string };
    recipients: { contact: string[]; bid: string[]; quote: string[] };
    attachmentMaxBytes: number;
  };
  storage:
    | { driver: "local"; dir: string }
    | {
        driver: "s3";
        endpoint: string;
        region: string;
        bucket: string;
        accessKeyId: string;
        secretAccessKey: string;
      };
  uploadLinkTtlHours: number;
  turnstileSecretKey?: string;
}

let cached: ServerEnv | undefined;

function emptyToUndefined(env: NodeJS.ProcessEnv): Record<string, string | undefined> {
  const out: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(env)) out[k] = v === "" ? undefined : v;
  return out;
}

export function getServerEnv(): ServerEnv {
  if (cached) return cached;

  const parsed = schema.safeParse(emptyToUndefined(process.env));
  if (!parsed.success) {
    // Report which variables are invalid without echoing their values.
    const fields = Object.keys(z.flattenError(parsed.error).fieldErrors).join(", ");
    throw new Error(`Invalid server environment configuration: ${fields}`);
  }
  const env = parsed.data;
  const isProduction = env.NODE_ENV === "production";

  let provider = env.EMAIL_PROVIDER ?? "console";
  if (provider === "resend" && !env.RESEND_API_KEY) {
    logger.error("config.email", { reason: "EMAIL_PROVIDER=resend but RESEND_API_KEY is missing; using console" });
    provider = "console";
  }
  if (provider === "smtp" && !env.SMTP_HOST) {
    logger.error("config.email", { reason: "EMAIL_PROVIDER=smtp but SMTP_HOST is missing; using console" });
    provider = "console";
  }
  if (provider === "console" && isProduction) {
    logger.warn("config.email", {
      reason: "No email provider configured. Submissions are stored but no emails are sent.",
    });
  }

  const contact = env.CONTACT_EMAIL ?? [];
  const recipients = {
    contact,
    bid: env.BID_EMAIL ?? contact,
    quote: env.QUOTE_EMAIL ?? contact,
  };
  if (contact.length === 0 && provider !== "console") {
    logger.warn("config.email", { reason: "CONTACT_EMAIL is not set; internal notifications have no recipient" });
  }

  let storage: ServerEnv["storage"];
  if (env.STORAGE_DRIVER === "s3") {
    if (!env.S3_ENDPOINT || !env.S3_BUCKET || !env.S3_ACCESS_KEY_ID || !env.S3_SECRET_ACCESS_KEY) {
      throw new Error(
        "STORAGE_DRIVER=s3 requires S3_ENDPOINT, S3_BUCKET, S3_ACCESS_KEY_ID and S3_SECRET_ACCESS_KEY",
      );
    }
    storage = {
      driver: "s3",
      endpoint: env.S3_ENDPOINT.replace(/\/+$/, ""),
      region: env.S3_REGION,
      bucket: env.S3_BUCKET,
      accessKeyId: env.S3_ACCESS_KEY_ID,
      secretAccessKey: env.S3_SECRET_ACCESS_KEY,
    };
  } else {
    storage = {
      driver: "local",
      // Runtime-configured data directory, not a build asset.
      dir: path.resolve(/*turbopackIgnore: true*/ env.STORAGE_LOCAL_DIR ?? path.join(/*turbopackIgnore: true*/ process.cwd(), ".data", "storage")),
    };
  }

  cached = {
    isProduction,
    email: {
      provider,
      from: env.EMAIL_FROM ?? "MEK Construction <no-reply@mekdomain.ca>",
      resendApiKey: env.RESEND_API_KEY,
      smtp: env.SMTP_HOST
        ? {
            host: env.SMTP_HOST,
            port: env.SMTP_PORT ?? 587,
            secure: env.SMTP_SECURE ?? (env.SMTP_PORT === 465),
            user: env.SMTP_USER,
            password: env.SMTP_PASSWORD,
          }
        : undefined,
      recipients,
      attachmentMaxBytes: Math.round(env.EMAIL_ATTACHMENT_MAX_MB * 1024 * 1024),
    },
    storage,
    uploadLinkTtlHours: env.UPLOAD_LINK_TTL_HOURS,
    turnstileSecretKey: env.TURNSTILE_SECRET_KEY,
  };
  return cached;
}

/** Test helper. */
export function resetServerEnvCache() {
  cached = undefined;
}
