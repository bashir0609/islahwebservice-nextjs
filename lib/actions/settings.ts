"use server";

import { revalidatePath } from "next/cache";
import { siteSettings } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq, sql } from "drizzle-orm";
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

