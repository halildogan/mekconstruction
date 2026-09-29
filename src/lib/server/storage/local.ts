import "server-only";

import { mkdir, readdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { assertSafeKey, type ObjectStorage } from "@/lib/server/storage/types";

/**
 * Stores objects on the server's disk under STORAGE_LOCAL_DIR.
 *
 * Use a directory outside the repository and outside any web-served path,
 * e.g. /var/lib/mek-website/storage, owned by the service user with 0700
 * permissions. Files are written 0600.
 */
export class LocalStorage implements ObjectStorage {
  readonly driver = "local" as const;

  constructor(private readonly root: string) {}

  private resolve(key: string): string {
    assertSafeKey(key);
    const full = path.resolve(this.root, key);
    if (!full.startsWith(this.root + path.sep)) throw new Error("Unsafe storage key");
    return full;
  }

  async put(key: string, body: Buffer): Promise<void> {
    const file = this.resolve(key);
    await mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
    await writeFile(file, body, { mode: 0o600 });
  }

  async get(key: string): Promise<Buffer | null> {
    try {
      return await readFile(this.resolve(key));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw error;
    }
  }

  async delete(key: string): Promise<void> {
    await rm(this.resolve(key), { force: true });
  }

  async move(fromKey: string, toKey: string): Promise<void> {
    const to = this.resolve(toKey);
    await mkdir(path.dirname(to), { recursive: true, mode: 0o700 });
    await rename(this.resolve(fromKey), to);
  }

  async getSignedDownloadUrl(): Promise<string | null> {
    return null;
  }

  async purgeStaleStaging(maxAgeMs: number): Promise<void> {
    const stagingDir = path.join(this.root, "staging");
    let entries: string[];
    try {
      entries = await readdir(stagingDir);
    } catch {
      return;
    }
    const cutoff = Date.now() - maxAgeMs;
    await Promise.all(
      entries.map(async (entry) => {
        const dir = path.join(stagingDir, entry);
        try {
          const info = await stat(dir);
          if (info.mtimeMs < cutoff) await rm(dir, { recursive: true, force: true });
        } catch {
          // Already removed by a concurrent request.
        }
      }),
    );
  }
}
