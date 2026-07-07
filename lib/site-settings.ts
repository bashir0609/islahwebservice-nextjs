"use server";

import { siteSettings } from "@/lib/db/schema";
import { db } from "@/lib/db";

export async function getAllSettings() {
  const rows = await db.select().from(siteSettings);
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}
