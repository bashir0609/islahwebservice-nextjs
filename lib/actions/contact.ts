"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { createHash } from "node:crypto";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
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
  if (!ip) throw new Error("Unable to verify request. Please try again.");
  const ipHash = createHash("sha256").update(ip).digest("hex");
  // Shared database counter makes the limit effective across serverless instances.
  await db.execute(sql`CREATE TABLE IF NOT EXISTS contact_rate_limits (
    ip_hash text PRIMARY KEY, window_start timestamptz NOT NULL DEFAULT now(), attempts integer NOT NULL
  )`);
  const limit = await db.execute(sql`INSERT INTO contact_rate_limits (ip_hash, window_start, attempts)
    VALUES (${ipHash}, now(), 1)
    ON CONFLICT (ip_hash) DO UPDATE SET
      window_start = CASE WHEN contact_rate_limits.window_start < now() - interval '15 minutes' THEN now() ELSE contact_rate_limits.window_start END,
      attempts = CASE WHEN contact_rate_limits.window_start < now() - interval '15 minutes' THEN 1 ELSE contact_rate_limits.attempts + 1 END
    RETURNING attempts`);
  if (Number(limit.rows[0]?.attempts) > 5) throw new Error("Too many attempts. Please try again later.");
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
