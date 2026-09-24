"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { sendEmailToAdmin } from "./settings";

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
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) throw new Error("Contact form is temporarily unavailable.");
  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim();
  const body = new URLSearchParams({ secret, response: result.data.turnstileToken });
  if (ip) body.set("remoteip", ip);
  const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST", body, cache: "no-store", signal: AbortSignal.timeout(5000),
  }).then((res) => res.json() as Promise<{ success: boolean }>).catch(() => ({ success: false }));
  if (!verification.success) throw new Error("Security check failed. Please try again.");
  const { website, turnstileToken, ...contact } = result.data;
  await sendEmailToAdmin(contact);
  return { success: true, message: "Message sent successfully!" };
}
