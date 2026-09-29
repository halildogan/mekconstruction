import "server-only";

import { getServerEnv } from "@/lib/server/env";
import {
  ConsoleEmailProvider,
  ResendEmailProvider,
  SmtpEmailProvider,
} from "@/lib/server/email/providers";
import type { EmailMessage, EmailProvider } from "@/lib/server/email/types";

let provider: EmailProvider | undefined;

function getProvider(): EmailProvider {
  if (provider) return provider;
  const { email, isProduction } = getServerEnv();
  if (email.provider === "resend" && email.resendApiKey) {
    provider = new ResendEmailProvider(email.resendApiKey);
  } else if (email.provider === "smtp" && email.smtp) {
    provider = new SmtpEmailProvider(email.smtp);
  } else {
    provider = new ConsoleEmailProvider(!isProduction);
  }
  return provider;
}

/** Strip characters that could inject additional headers. */
export function sanitizeHeaderValue(value: string, maxLength = 200): string {
  return value.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim().slice(0, maxLength);
}

export async function sendEmail(message: EmailMessage): Promise<{ delivered: boolean }> {
  const { email } = getServerEnv();
  const active = getProvider();
  if (message.to.length === 0) return { delivered: false };
  await active.send({
    ...message,
    subject: sanitizeHeaderValue(message.subject),
    replyTo: message.replyTo ? sanitizeHeaderValue(message.replyTo, 254) : undefined,
    from: email.from,
  });
  return { delivered: active.name !== "console" };
}

export type { EmailMessage, EmailAttachment } from "@/lib/server/email/types";
