import "server-only";

import { getServerEnv } from "@/lib/server/env";
import { LocalStorage } from "@/lib/server/storage/local";
import { S3Storage } from "@/lib/server/storage/s3";
import type { ObjectStorage } from "@/lib/server/storage/types";

let instance: ObjectStorage | undefined;

export function getStorage(): ObjectStorage {
  if (instance) return instance;
  const { storage } = getServerEnv();
  instance = storage.driver === "s3" ? new S3Storage(storage) : new LocalStorage(storage.dir);
  return instance;
}

export type { ObjectStorage } from "@/lib/server/storage/types";
