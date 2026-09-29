export interface EmailAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
}

export interface EmailMessage {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}

export interface EmailProvider {
  readonly name: "console" | "resend" | "smtp";
  send(message: EmailMessage & { from: string }): Promise<void>;
}
