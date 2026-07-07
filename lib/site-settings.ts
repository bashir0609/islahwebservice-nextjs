"use server";

import { siteSettings } from "@/lib/db/schema";
import { db } from "@/lib/db";

export async function getAllSettings() {
  try {
    const rows = await db.select().from(siteSettings);
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    // Return empty object if database is unavailable
    return {};
  }
}
