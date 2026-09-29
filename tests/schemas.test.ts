import { describe, expect, it } from "vitest";
import { bidInvitationSchema, contactSchema, quoteRequestSchema, torontoToday } from "@/lib/forms/schemas";

const future = (() => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + 14);
  return d.toISOString().slice(0, 10);
})();

const validBid = {
  companyName: "Example Builders Ltd.",
  contactName: "Alex Estimator",
  email: " alex@example.com ",
  phone: "(416) 555-0100",
  projectName: "Office fit-out, Level 5",
  projectLocation: "Toronto, ON",
  projectType: "tenant-improvement",
  bidDueDate: future,
  bidDueTime: "14:00",
  trades: ["drywall", "metal-stud-framing"],
  tradesOther: "",
  projectDescription: "",
  documentsLink: "",
  message: "",
  attachments: [],
  consent: true,
};

describe("bid invitation schema", () => {
  it("accepts a complete invitation and trims input", () => {
    const result = bidInvitationSchema.safeParse(validBid);
    expect(result.success).toBe(true);
    expect(result.data?.email).toBe("alex@example.com");
  });

  it("requires at least one trade", () => {
    const result = bidInvitationSchema.safeParse({ ...validBid, trades: [] });
    expect(result.success).toBe(false);
  });

  it("requires a description when 'other' trade is selected", () => {
    const result = bidInvitationSchema.safeParse({ ...validBid, trades: ["other"], tradesOther: "" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["tradesOther"]);
  });

  it("rejects past or invalid bid dates", () => {
    expect(bidInvitationSchema.safeParse({ ...validBid, bidDueDate: "2020-01-01" }).success).toBe(false);
    expect(bidInvitationSchema.safeParse({ ...validBid, bidDueDate: "2026-02-30" }).success).toBe(false);
    expect(bidInvitationSchema.safeParse({ ...validBid, bidDueDate: torontoToday() }).success).toBe(true);
  });

  it("rejects invalid times, emails, phones and links", () => {
    expect(bidInvitationSchema.safeParse({ ...validBid, bidDueTime: "25:00" }).success).toBe(false);
    expect(bidInvitationSchema.safeParse({ ...validBid, email: "not-an-email" }).success).toBe(false);
    expect(bidInvitationSchema.safeParse({ ...validBid, phone: "call me" }).success).toBe(false);
    expect(bidInvitationSchema.safeParse({ ...validBid, documentsLink: "javascript:alert(1)" }).success).toBe(false);
    expect(bidInvitationSchema.safeParse({ ...validBid, documentsLink: "https://app.buildingconnected.com/x" }).success).toBe(true);
  });

  it("requires consent and rejects malformed attachment ids", () => {
    expect(bidInvitationSchema.safeParse({ ...validBid, consent: false }).success).toBe(false);
    expect(bidInvitationSchema.safeParse({ ...validBid, attachments: ["../../etc/passwd"] }).success).toBe(false);
    expect(bidInvitationSchema.safeParse({ ...validBid, attachments: ["a".repeat(32)] }).success).toBe(true);
  });

  it("rejects unknown project types", () => {
    expect(bidInvitationSchema.safeParse({ ...validBid, projectType: "villa" }).success).toBe(false);
  });
});

describe("quote and contact schemas", () => {
  it("requires location, service and a meaningful description for quotes", () => {
    const base = {
      name: "Sam",
      company: "",
      email: "sam@example.com",
      phone: "",
      projectName: "",
      projectLocation: "Mississauga",
      service: "painting",
      projectSize: "",
      desiredStartDate: "",
      projectDescription: "Repaint two office floors after hours.",
      documentsLink: "",
      attachments: [],
      consent: true,
    };
    expect(quoteRequestSchema.safeParse(base).success).toBe(true);
    expect(quoteRequestSchema.safeParse({ ...base, projectDescription: "short" }).success).toBe(false);
    expect(quoteRequestSchema.safeParse({ ...base, projectSize: "huge" }).success).toBe(false);
  });

  it("validates the contact form", () => {
    const base = { name: "Sam", company: "", email: "sam@example.com", phone: "", topic: "general", message: "Hello there, a question.", consent: true };
    expect(contactSchema.safeParse(base).success).toBe(true);
    expect(contactSchema.safeParse({ ...base, topic: "spam" }).success).toBe(false);
  });
});
