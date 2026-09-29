import "server-only";

import { AwsClient } from "aws4fetch";
import { assertSafeKey, type ObjectStorage } from "@/lib/server/storage/types";

export interface S3Config {
  endpoint: string;
  region: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
}

const encodeKey = (key: string) => key.split("/").map(encodeURIComponent).join("/");

/**
 * S3-compatible object storage (Cloudflare R2 recommended).
 *
 * Uses path-style requests signed with SigV4 via `aws4fetch` (a ~6 KB
 * dependency) instead of the full AWS SDK. The bucket must be private — do
 * not enable public access or an r2.dev subdomain for it.
 */
export class S3Storage implements ObjectStorage {
  readonly driver = "s3" as const;
  private readonly client: AwsClient;

  constructor(private readonly config: S3Config) {
    this.client = new AwsClient({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      service: "s3",
      region: config.region,
    });
  }

  private url(key: string): string {
    assertSafeKey(key);
    return `${this.config.endpoint}/${this.config.bucket}/${encodeKey(key)}`;
  }

  private async expectOk(response: Response, action: string): Promise<void> {
    if (!response.ok) {
      // Body may contain bucket details; don't surface it.
      await response.body?.cancel().catch(() => undefined);
      throw new Error(`Object storage ${action} failed with HTTP ${response.status}`);
    }
  }

  async put(key: string, body: Buffer, contentType: string): Promise<void> {
    const response = await this.client.fetch(this.url(key), {
      method: "PUT",
      body: new Uint8Array(body),
      headers: { "content-type": contentType, "content-length": String(body.byteLength) },
    });
    await this.expectOk(response, "put");
  }

  async get(key: string): Promise<Buffer | null> {
    const response = await this.client.fetch(this.url(key), { method: "GET" });
    if (response.status === 404) {
      await response.body?.cancel().catch(() => undefined);
      return null;
    }
    await this.expectOk(response, "get");
    return Buffer.from(await response.arrayBuffer());
  }

  async delete(key: string): Promise<void> {
    const response = await this.client.fetch(this.url(key), { method: "DELETE" });
    if (response.status !== 404) await this.expectOk(response, "delete");
  }

  async move(fromKey: string, toKey: string): Promise<void> {
    assertSafeKey(fromKey);
    const response = await this.client.fetch(this.url(toKey), {
      method: "PUT",
      headers: { "x-amz-copy-source": `/${this.config.bucket}/${encodeKey(fromKey)}` },
    });
    await this.expectOk(response, "copy");
    await this.delete(fromKey);
  }

  async getSignedDownloadUrl(key: string, ttlSeconds: number, downloadName: string): Promise<string | null> {
    const url = new URL(this.url(key));
    url.searchParams.set("X-Amz-Expires", String(ttlSeconds));
    url.searchParams.set(
      "response-content-disposition",
      `attachment; filename="${downloadName.replace(/["\\\r\n]/g, "_")}"`,
    );
    const signed = await this.client.sign(url.toString(), { method: "GET", aws: { signQuery: true } });
    return signed.url;
  }

  async purgeStaleStaging(): Promise<void> {
    // Configure an R2 lifecycle rule: delete objects with prefix "staging/" after 1 day.
  }
}
