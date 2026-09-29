import { describe, expect, it } from "vitest";
import { inspectUpload, listZipEntries } from "@/lib/server/uploads/inspect";
import { displayFilename, sanitizeFilename } from "@/lib/server/uploads/filename";

/** Build a minimal stored (uncompressed) ZIP containing empty entries. */
function makeZip(names: string[]): Buffer {
  const locals: Buffer[] = [];
  const centrals: Buffer[] = [];
  let offset = 0;
  for (const name of names) {
    const n = Buffer.from(name, "utf8");
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(n.length, 26);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(n.length, 28);
    central.writeUInt32LE(offset, 42);
    locals.push(local, n);
    centrals.push(central, n);
    offset += 30 + n.length;
  }
  const cd = Buffer.concat(centrals);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(names.length, 8);
  eocd.writeUInt16LE(names.length, 10);
  eocd.writeUInt32LE(cd.length, 12);
  eocd.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, cd, eocd]);
}

const pdf = Buffer.from("%PDF-1.7\n1 0 obj\n");
const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0]);
const exe = Buffer.from("MZ\x90\x00\x03\x00\x00\x00", "latin1");

describe("inspectUpload", () => {
  it("accepts files whose content matches the extension", () => {
    expect(inspectUpload("drawings.pdf", pdf).ok).toBe(true);
    expect(inspectUpload("site.PNG", png).ok).toBe(true);
    expect(inspectUpload("plan.dwg", Buffer.from("AC1032....")).ok).toBe(true);
    expect(inspectUpload("specs.docx", makeZip(["[Content_Types].xml", "word/document.xml"])).ok).toBe(true);
    expect(inspectUpload("pricing.xlsx", makeZip(["[Content_Types].xml", "xl/workbook.xml"])).ok).toBe(true);
    expect(inspectUpload("package.zip", makeZip(["A-101.pdf", "specs/09 21 16.pdf"])).ok).toBe(true);
  });

  it("rejects executables disguised with an allowed extension", () => {
    expect(inspectUpload("drawings.pdf", exe)).toEqual({ ok: false, reason: "signature-mismatch" });
    expect(inspectUpload("photo.jpg", exe)).toEqual({ ok: false, reason: "signature-mismatch" });
  });

  it("rejects disallowed extensions and empty files", () => {
    expect(inspectUpload("setup.exe", exe)).toEqual({ ok: false, reason: "extension-not-allowed" });
    expect(inspectUpload("script.js", Buffer.from("alert(1)"))).toEqual({ ok: false, reason: "extension-not-allowed" });
    expect(inspectUpload("empty.pdf", Buffer.alloc(0))).toEqual({ ok: false, reason: "empty" });
  });

  it("rejects macro-enabled Office documents", () => {
    const docm = makeZip(["[Content_Types].xml", "word/document.xml", "word/vbaProject.bin"]);
    expect(inspectUpload("specs.docx", docm)).toEqual({ ok: false, reason: "macro-enabled" });
  });

  it("rejects archives containing executables or path traversal", () => {
    expect(inspectUpload("package.zip", makeZip(["A-101.pdf", "run.exe"]))).toEqual({
      ok: false,
      reason: "dangerous-archive-entry",
    });
    expect(inspectUpload("package.zip", makeZip(["../../evil.pdf"]))).toEqual({
      ok: false,
      reason: "dangerous-archive-entry",
    });
  });

  it("rejects a ZIP renamed to docx without Office structure", () => {
    expect(inspectUpload("specs.docx", makeZip(["readme.txt"]))).toEqual({ ok: false, reason: "signature-mismatch" });
  });

  it("lists zip entries and flags corrupt archives", () => {
    expect(listZipEntries(makeZip(["a.pdf", "b.pdf"]))).toEqual(["a.pdf", "b.pdf"]);
    expect(inspectUpload("x.zip", Buffer.from("PK\x03\x04garbage", "latin1"))).toEqual({
      ok: false,
      reason: "corrupt-archive",
    });
  });
});

describe("filename handling", () => {
  it("sanitizes names for storage", () => {
    expect(sanitizeFilename("../../etc/passwd")).toBe("passwd");
    expect(sanitizeFilename("C:\\Users\\me\\Plans Rev 3 (IFT).PDF")).toBe("Plans-Rev-3-(IFT).pdf");
    expect(sanitizeFilename("Spécifications éàü.docx")).toBe("Specifications-eau.docx");
    expect(sanitizeFilename(".hidden.pdf")).toBe("hidden.pdf");
    expect(sanitizeFilename("<script>.pdf")).toBe("script.pdf");
    expect(sanitizeFilename("a".repeat(300) + ".pdf").length).toBeLessThanOrEqual(120);
  });

  it("keeps a readable display name without control characters", () => {
    expect(displayFilename("Plan\u0000\u0007.pdf")).toBe("Plan.pdf");
    expect(displayFilename("")).toBe("document");
  });
});
