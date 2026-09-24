"use server";

import { z } from "zod";
import { sendEmailToAdmin } from "@/lib/contact-email";
import { verifyContactRequest } from "@/lib/contact-protection";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  company: z.string().trim().min(2).max(120),
  service: z.enum(["B2B Prospect Research", "Existing Database Enrichment", "B2B Lead Generation Data Services", "Not sure yet — recommend a solution"]),
  message: z.string().trim().min(20).max(5000),
  website: z.string().max(0),
  turnstileToken: z.string().min(1).max(2048),
});

export async function submitContactForm(data: unknown) {
  const result = schema.safeParse(data);
  if (!result.success) throw new Error("Please check the form fields and try again.");
  await verifyContactRequest(result.data.turnstileToken, result.data.website);
  const { website, turnstileToken, ...contact } = result.data;
  await sendEmailToAdmin(contact);
  return { success: true, message: "Message sent successfully!" };
}
