"use server";

import { siteSettings } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { siteSettings as sqliteSiteSettings } from "@/lib/db/sqlite-schema";
import { sqlDb } from "@/lib/db/sqlite";
import { eq } from "drizzle-orm";

export async function getAllSettings() {
  try {
    // Try PostgreSQL first (production)
    const rows = await db.select().from(siteSettings);
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  } catch (pgError) {
    console.log("PostgreSQL unavailable, trying SQLite (local dev)...");
    try {
      // Fall back to SQLite (local development)
      const rows = await sqlDb.select().from(sqliteSiteSettings);
      return Object.fromEntries(rows.map((r) => [r.key, r.value]));
    } catch (sqliteError) {
      console.error("Failed to fetch site settings from both databases:", sqliteError);
      return {};
    }
  }
}

export async function getSetting(key: string) {
  try {
    const result = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
    if (result.length > 0) return result[0].value;
    
    // Try SQLite fallback
    const sqliteResult = await sqlDb.select().from(sqliteSiteSettings).where(eq(sqliteSiteSettings.key, key)).limit(1);
    if (sqliteResult.length > 0) return sqliteResult[0].value;
    
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
  } catch (pgError) {
    try {
      await sqlDb.insert(sqliteSiteSettings).values({ key, value }).onConflictDoUpdate({
              target: sqliteSiteSettings.key,
              set: { value, updatedAt: Date.now() }
            });
      return true;
    } catch (sqliteError) {
      console.error(`Failed to set setting ${key}:`, sqliteError);
      return false;
    }
  }
}