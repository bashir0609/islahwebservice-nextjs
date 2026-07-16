"use server";

import { siteSettings } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function getAllSettings() {
  try {
    const rows = await db.select().from(siteSettings);
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return {};
  }
}

export async function getSetting(key: string) {
  try {
    const result = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
    if (result.length > 0) return result[0].value;
    return null;
  } catch (error) {
    console.error(`Failed to fetch setting ${key}:`, error);
    return null;
  }
}

export async function setSetting(key: string, value: string) {
  try {
    await db.insert(siteSettings).values({ key, value }).onConflictDoUpdate({
      target: siteSettings.key,
      set: { value, updatedAt: new Date() }
    });
    return true;
  } catch (error) {
    console.error(`Failed to set setting ${key}:`, error);
    return false;
  }
}
