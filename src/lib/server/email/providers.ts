import "server-only";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { EmailMessage, EmailProvider } from "@/lib/server/email/types";
import { logger } from "@/lib/server/log";

/**
 * Console provider — used when no email provider is configured.
 *
 * It never logs message contents. In development it writes each rendered
 * email to .data/outbox/ so templates can be previewed in a browser.
 */
export class ConsoleEmailProvider implements EmailProvider {
  readonly name = "console" as const;

  constructor(private readonly writeOutbox: boolean) {}

  async send(message: EmailMessage & { from: string }): Promise<void> {
    logger.info("email.console", {
      recipients: message.to.length,
      attachments: message.attachments?.length ?? 0,
      note: "Email provider not configured; message not delivered",
    });
    if (!this.writeOutbox) return;
    const dir = path.join(process.cwd(), ".data", "outbox");
    await mkdir(dir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const header = `<!-- to: ${message.to.join(", ")} | reply-to: ${message.replyTo ?? "-"} | subject: ${message.subject} | attachments: ${(message.attachments ?? []).map((a) => a.filename).join(", ") || "-"} -->\n`;
    await writeFile(path.join(dir, `${stamp}.html`), header + message.html);
  }
}

/** Resend (https://resend.com) via its REST API — no SDK dependency. */
export class ResendEmailProvider implements EmailProvider {
  readonly name = "resend" as const;

  constructor(private readonly apiKey: string) {}

  async send(message: EmailMessage & { from: string }): Promise<void> {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${this.apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: message.from,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
        reply_to: message.replyTo,
        attachments: message.attachments?.map((a) => ({
          filename: a.filename,
          content: a.content.toString("base64"),
          content_type: a.contentType,
        })),
      }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) {
      await response.body?.cancel().catch(() => undefined);
      throw new Error(`Resend rejected the message with HTTP ${response.status}`);
    }
  }
}

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  password?: string;
}

/** Any SMTP server (Microsoft 365, Google Workspace, Postmark, SES, …) via Nodemailer. */
export class SmtpEmailProvider implements EmailProvider {
  readonly name = "smtp" as const;

  constructor(private readonly config: SmtpConfig) {}

  async send(message: EmailMessage & { from: string }): Promise<void> {
    const nodemailer = await import("nodemailer");
    const transport = nodemailer.createTransport({
      host: this.config.host,
      port: this.config.port,
      secure: this.config.secure,
      auth: this.config.user ? { user: this.config.user, pass: this.config.password } : undefined,
      connectionTimeout: 15_000,
      greetingTimeout: 15_000,
      socketTimeout: 30_000,
    });
    await transport.sendMail({
      from: message.from,
      to: message.to,
      replyTo: message.replyTo,
      subject: message.subject,
      html: message.html,
      text: message.text,
      attachments: message.attachments?.map((a) => ({
        filename: a.filename,
        content: a.content,
        contentType: a.contentType,
      })),
    });
  }
}
