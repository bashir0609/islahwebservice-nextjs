"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { portfolioItems, type NewPortfolioItem } from "@/lib/db/schema";
import { generateSlug } from "@/lib/utils";
import { eq, sql } from "drizzle-orm";

export async function listPortfolioItems() {
  return db.select().from(portfolioItems).orderBy(portfolioItems.createdAt);
}

export async function getPortfolioItem(id: string) {
  const [item] = await db.select().from(portfolioItems).where(eq(portfolioItems.id, id));
  return item ?? null;
}

export async function createPortfolioItem(data: Omit<NewPortfolioItem, "id">) {
  const id = crypto.randomUUID();
  await db.insert(portfolioItems).values({ id, ...data });
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  return id;
}

export async function updatePortfolioItem(id: string, data: Partial<NewPortfolioItem>) {
  await db.update(portfolioItems).set({ ...data, updatedAt: sql`(unixepoch())` }).where(eq(portfolioItems.id, id));
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
}

export async function deletePortfolioItem(id: string) {
  await db.delete(portfolioItems).where(eq(portfolioItems.id, id));
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
}
