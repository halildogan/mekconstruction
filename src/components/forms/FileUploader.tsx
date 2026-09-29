"use client";

import { useCallback, useEffect, useId, useRef, useState, type DragEvent } from "react";
import { AlertCircle, CheckCircle2, FileText, Loader2, RotateCcw, Upload, X } from "lucide-react";
import {
  ACCEPT_ATTRIBUTE,
  ALLOWED_TYPES_LABEL,
  FAMILY_LABELS,
  UPLOAD_LIMITS,
  findAllowedType,
  formatBytes,
} from "@/lib/uploads/rules";
import { cn } from "@/lib/cn";

type ItemStatus = "uploading" | "done" | "error";

interface UploadItem {
  key: string;
  file: File;
  status: ItemStatus;
  progress: number;
  error?: string;
  uploadId?: string;
}

interface UploadResponse {
  ok: boolean;
  error?: string;
  upload?: { id: string };
}

export interface UploaderState {
  ids: string[];
  busy: boolean;
  failed: number;
}

interface FileUploaderProps {
  form: "bid" | "quote";
  label: string;
  description?: string;
  onChange: (state: UploaderState) => void;
  error?: string;
}

const MAX_MB = UPLOAD_LIMITS.maxFileBytes / (1024 * 1024);

function familyLabel(name: string): string {
  const type = findAllowedType(name);
  return type ? FAMILY_LABELS[type.family] : "File";
}

/**
 * Multi-file uploader for drawings, specifications and tender documents.
 *
 * Files upload one request each, so a failed or rejected file never affects
 * the rest of the form: it can be retried or removed on its own. Limits are
 * checked here for fast feedback and enforced again by the server.
 */
export function FileUploader({ form, label, description, onChange, error }: FileUploaderProps) {
  const inputId = useId();
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const inputRef = useRef<HTMLInputElement>(null);
  const requests = useRef(new Map<string, XMLHttpRequest>());
  const [items, setItems] = useState<UploadItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const [notice, setNotice] = useState<string>("");
  const [announcement, setAnnouncement] = useState("");

  const update = useCallback((key: string, patch: Partial<UploadItem>) => {
    setItems((current) => current.map((item) => (item.key === key ? { ...item, ...patch } : item)));
  }, []);

  useEffect(() => {
    onChange({
      ids: items.filter((i) => i.status === "done" && i.uploadId).map((i) => i.uploadId as string),
      busy: items.some((i) => i.status === "uploading"),
      failed: items.filter((i) => i.status === "error").length,
    });
  }, [items, onChange]);

  useEffect(() => {
    const active = requests.current;
    return () => active.forEach((xhr) => xhr.abort());
  }, []);

  const upload = useCallback(
    (item: UploadItem) => {
      const xhr = new XMLHttpRequest();
      requests.current.set(item.key, xhr);
      xhr.open("POST", `/api/uploads?form=${form}`);
      xhr.setRequestHeader("X-File-Name", encodeURIComponent(item.file.name));
      xhr.setRequestHeader("Content-Type", "application/octet-stream");
      xhr.responseType = "json";
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) update(item.key, { progress: Math.round((event.loaded / event.total) * 100) });
      };
      xhr.onload = () => {
        requests.current.delete(item.key);
        const body = (xhr.response ?? {}) as UploadResponse;
        if (xhr.status >= 200 && xhr.status < 300 && body.ok && body.upload) {
          update(item.key, { status: "done", progress: 100, uploadId: body.upload.id, error: undefined });
          setAnnouncement(`${item.file.name} uploaded.`);
        } else {
          const message = body.error ?? "The upload failed. Please try again.";
          update(item.key, { status: "error", error: message });
          setAnnouncement(`${item.file.name} could not be uploaded. ${message}`);
        }
      };
      xhr.onerror = () => {
        requests.current.delete(item.key);
        update(item.key, { status: "error", error: "Connection lost during upload. Check your connection and retry." });
        setAnnouncement(`${item.file.name} could not be uploaded.`);
      };
      xhr.send(item.file);
    },
    [form, update],
  );

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      const files = Array.from(fileList);
      if (files.length === 0) return;
      const problems: string[] = [];
      const accepted: UploadItem[] = [];
      let count = items.filter((i) => i.status !== "error").length;
      let total = items.filter((i) => i.status !== "error").reduce((sum, i) => sum + i.file.size, 0);

      for (const file of files) {
        if (!findAllowedType(file.name)) {
          problems.push(`${file.name}: file type not accepted.`);
        } else if (file.size === 0) {
          problems.push(`${file.name}: file is empty.`);
        } else if (file.size > UPLOAD_LIMITS.maxFileBytes) {
          problems.push(`${file.name}: larger than ${MAX_MB} MB. Share it as a link instead.`);
        } else if (count >= UPLOAD_LIMITS.maxFiles) {
          problems.push(`${file.name}: maximum of ${UPLOAD_LIMITS.maxFiles} files reached.`);
        } else if (total + file.size > UPLOAD_LIMITS.maxTotalBytes) {
          problems.push(`${file.name}: total upload size limit reached. Share remaining files as a link.`);
        } else {
          count += 1;
          total += file.size;
          accepted.push({
            key: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            file,
            status: "uploading",
            progress: 0,
          });
        }
      }

      setNotice(problems.join(" "));
      if (problems.length) setAnnouncement(problems.join(" "));
      if (accepted.length) {
        setItems((current) => [...current, ...accepted]);
        accepted.forEach(upload);
      }
    },
    [items, upload],
  );

  const remove = (item: UploadItem) => {
    requests.current.get(item.key)?.abort();
    requests.current.delete(item.key);
    if (item.uploadId) {
      void fetch(`/api/uploads/${item.uploadId}`, { method: "DELETE" }).catch(() => undefined);
    }
    setItems((current) => current.filter((i) => i.key !== item.key));
    setAnnouncement(`${item.file.name} removed.`);
    inputRef.current?.focus();
  };

  const retry = (item: UploadItem) => {
    const fresh: UploadItem = { ...item, status: "uploading", progress: 0, error: undefined };
    update(item.key, fresh);
    upload(fresh);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    addFiles(event.dataTransfer.files);
  };

  return (
    <div>
      <p id={`${inputId}-label`} className="mb-2 text-[0.9375rem] font-semibold text-ink">
        {label} <span className="ml-1 text-sm font-normal text-steel-600">(optional)</span>
      </p>
      {description && <p className="-mt-1 mb-3 text-sm leading-relaxed text-steel-600">{description}</p>}

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "relative flex flex-col items-center justify-center gap-3 border-2 border-dashed px-6 py-10 text-center transition-colors",
          dragging ? "border-ink bg-concrete-100" : "border-ink/25 bg-white",
          error && "border-danger",
        )}
      >
        <Upload aria-hidden="true" className="size-7 text-steel-600" />
        <p className="text-[0.9375rem] text-steel-700">
          <span className="hidden sm:inline">Drag files here, or </span>
          <label
            htmlFor={inputId}
            className="cursor-pointer font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 focus-within:outline-2"
          >
            <span className="sm:hidden">Choose files</span>
            <span className="hidden sm:inline">browse your computer</span>
          </label>
        </p>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          multiple
          accept={ACCEPT_ATTRIBUTE}
          aria-labelledby={`${inputId}-label`}
          aria-describedby={[hintId, error ? errorId : null].filter(Boolean).join(" ")}
          className="sr-only focus-visible:not-sr-only"
          onChange={(event) => {
            if (event.target.files) addFiles(event.target.files);
            event.target.value = "";
          }}
        />
        <p id={hintId} className="text-sm leading-relaxed text-steel-600">
          {ALLOWED_TYPES_LABEL}. Up to {UPLOAD_LIMITS.maxFiles} files, {MAX_MB} MB each.
        </p>
      </div>

      {notice && (
        <p className="mt-3 flex items-start gap-2 text-sm font-medium text-danger">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {notice}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-3 text-sm font-medium text-danger">
          {error}
        </p>
      )}

      {items.length > 0 && (
        <ul className="mt-4 divide-y divide-ink/10 border border-ink/15 bg-white" aria-label="Selected files">
          {items.map((item) => (
            <li key={item.key} className="flex items-start gap-3 px-4 py-3">
              <FileText aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-steel-600" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.9375rem] font-medium" title={item.file.name}>
                  {item.file.name}
                </p>
                <p className="mt-0.5 text-sm text-steel-600">
                  {familyLabel(item.file.name)} · {formatBytes(item.file.size)}
                  {item.status === "uploading" && <> · Uploading {item.progress}%</>}
                  {item.status === "done" && <> · Uploaded</>}
                </p>
                {item.status === "uploading" && (
                  <div
                    className="mt-2 h-1 bg-concrete-200"
                    role="progressbar"
                    aria-label={`Uploading ${item.file.name}`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={item.progress}
                  >
                    <div className="h-full bg-ink transition-[width] duration-200" style={{ width: `${item.progress}%` }} />
                  </div>
                )}
                {item.status === "error" && <p className="mt-1 text-sm font-medium text-danger">{item.error}</p>}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {item.status === "uploading" && <Loader2 aria-hidden="true" className="size-5 animate-spin text-steel-600" />}
                {item.status === "done" && <CheckCircle2 aria-hidden="true" className="size-5 text-success" />}
                {item.status === "error" && (
                  <button
                    type="button"
                    onClick={() => retry(item)}
                    className="inline-flex min-h-10 min-w-10 items-center justify-center text-ink hover:bg-concrete-100"
                    aria-label={`Retry uploading ${item.file.name}`}
                  >
                    <RotateCcw aria-hidden="true" className="size-4.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(item)}
                  className="inline-flex min-h-10 min-w-10 items-center justify-center text-ink hover:bg-concrete-100"
                  aria-label={`Remove ${item.file.name}`}
                >
                  <X aria-hidden="true" className="size-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="sr-only" aria-live="polite" role="status">
        {announcement}
      </p>
    </div>
  );
}
