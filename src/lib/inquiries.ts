import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";

export const PROJECT_TYPES = [
  { value: "brand-film", label: "Brand film / promo" },
  { value: "social-content", label: "Social content system" },
  { value: "event-coverage", label: "Event / meetup coverage" },
  { value: "product-merch", label: "Product / merch shoot" },
  { value: "creative-direction", label: "Creative direction only" },
  { value: "other", label: "Something else" },
] as const;

export const BUDGET_RANGES = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-3k", label: "$1,000 – $3,000" },
  { value: "3k-7k", label: "$3,000 – $7,000" },
  { value: "7k-plus", label: "$7,000+" },
  { value: "tbd", label: "Not sure yet" },
] as const;

export const TIMELINES = [
  { value: "asap", label: "ASAP / this month" },
  { value: "1-2-months", label: "1–2 months" },
  { value: "3-plus", label: "3+ months" },
  { value: "flexible", label: "Flexible" },
] as const;

export const CONTACT_METHODS = [
  { value: "instagram", label: "Instagram DM" },
  { value: "phone", label: "Phone / text" },
  { value: "email", label: "Email" },
] as const;

export const inquirySchema = z.object({
  fullName: z.string().trim().min(2, "Name is required").max(120),
  email: z.string().trim().email("Valid email required").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  instagram: z.string().trim().max(80).optional().or(z.literal("")),
  otherSocials: z.string().trim().max(240).optional().or(z.literal("")),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  projectType: z.string().min(1, "Pick a project type"),
  budgetRange: z.string().optional().or(z.literal("")),
  timeline: z.string().optional().or(z.literal("")),
  location: z.string().trim().max(160).optional().or(z.literal("")),
  preferredContact: z.string().optional().or(z.literal("")),
  goals: z
    .string()
    .trim()
    .min(20, "Give a little more detail (20+ characters)")
    .max(4000),
  referral: z.string().trim().max(200).optional().or(z.literal("")),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const submitProjectInquiry = createServerFn({ method: "POST" })
  .validator(inquirySchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<{ id: number }>`
      insert into project_inquiries (
        full_name, email, phone, company, instagram, other_socials, website,
        project_type, budget_range, timeline, location, preferred_contact,
        goals, referral
      ) values (
        ${data.fullName},
        ${data.email},
        ${data.phone || null},
        ${data.company || null},
        ${data.instagram || null},
        ${data.otherSocials || null},
        ${data.website || null},
        ${data.projectType},
        ${data.budgetRange || null},
        ${data.timeline || null},
        ${data.location || null},
        ${data.preferredContact || null},
        ${data.goals},
        ${data.referral || null}
      )
      returning id
    `;
    const id = rows[0]?.id;
    if (!id) throw new Error("Could not save inquiry");
    return { ok: true as const, id };
  });
