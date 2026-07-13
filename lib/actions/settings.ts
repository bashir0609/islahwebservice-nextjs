"use server";

import { revalidatePath } from "next/cache";
import { siteSettings } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq, sql } from "drizzle-orm";
import { Resend } from "resend";
import { requireAdmin } from "@/lib/auth";

export async function getAdminSettings() {
  await requireAdmin();
  const rows = await db.select().from(siteSettings);
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export async function updateSettings(values: Record<string, string>) {
  await requireAdmin();
  for (const [key, value] of Object.entries(values)) {
    await db
      .insert(siteSettings)
      .values({ key, value: String(value) })
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: { value: String(value) },
      });
  }
  revalidatePath("/admin/settings");
}

export async function sendEmailToAdmin(data: {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL;
    const toEmail = process.env.TO_EMAIL;

    if (!apiKey || !toEmail) {
      throw new Error("Missing Resend config");
    }

    // Extract local part from FROM_EMAIL (e.g., "noreply" from "Islah Web Service <noreply@updates.islahwebservice.com>")
    // Use main verified domain islahwebservice.com instead of unverified subdomain
    const emailMatch = fromEmail?.match(/<([^@]+)@[^>]+>/);
    const localPart = emailMatch ? emailMatch[1] : "noreply";
    const verifiedFromEmail = `${localPart}@islahwebservice.com`;
    const fromDisplay = fromEmail?.replace(/<[^>]+>/, `<${verifiedFromEmail}>`) || `Islah Web Service <${verifiedFromEmail}>`;

    const resend = new Resend(apiKey);

    const subject = `New Contact Form Submission from ${data.name} - ${data.service}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e293b, #334155); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">New Contact Form Submission</h1>
        </div>

        <div style="padding: 30px; background: white; border: 1px solid #e2e8f0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 40%;">Name</td>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Email</td>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Company</td>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${data.company}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Service Interest</td>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${data.service}</td>
            </tr>
          </table>

          <div style="margin-top: 20px;">
            <p style="font-weight: bold; margin-bottom: 10px;">Message:</p>
            <div style="padding: 15px; background: #f8fafc; border-left: 4px solid #0ea5e9; white-space: pre-wrap;">
              ${data.message}
            </div>
          </div>
        </div>

        <div style="padding: 20px; text-align: center; color: #64748b; font-size: 14px;">
          <p>This email was sent from the Islah Web Service contact form.</p>
          <p>Submitted on ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    const { data: emailData, error } = await resend.emails.send({
      from: fromDisplay,
      to: [toEmail],
      reply_to: data.email,
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, emailId: emailData?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Email service error: ${message}`);
  }
}
