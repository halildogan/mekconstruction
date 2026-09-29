/**
 * Private object storage used for uploaded documents and submission records.
 *
 * Nothing stored here is ever served by a public URL. Implementations:
 * - LocalStorage: a directory on the server outside the web root (default).
 * - S3Storage: any S3-compatible bucket; Cloudflare R2 is the intended target.
 */
export interface ObjectStorage {
  readonly driver: "local" | "s3";
  put(key: string, body: Buffer, contentType: string): Promise<void>;
  get(key: string): Promise<Buffer | null>;
  delete(key: string): Promise<void>;
  move(fromKey: string, toKey: string): Promise<void>;
  /**
   * Time-limited private download link for internal notifications, or null
   * when the driver cannot issue one (local disk).
   */
  getSignedDownloadUrl(key: string, ttlSeconds: number, downloadName: string): Promise<string | null>;
  /** Remove abandoned staged uploads. S3 relies on a bucket lifecycle rule instead. */
  purgeStaleStaging(maxAgeMs: number): Promise<void>;
}

const KEY_PATTERN = /^[A-Za-z0-9][A-Za-z0-9/_.()-]*$/;

export function assertSafeKey(key: string): void {
  if (!KEY_PATTERN.test(key) || key.includes("..") || key.includes("//") || key.length > 512) {
    throw new Error("Unsafe storage key");
  }
}
