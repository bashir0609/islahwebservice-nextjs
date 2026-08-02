"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { portfolioItems, type NewPortfolioItem } from "@/lib/db/schema";
import { generateSlug } from "@/lib/utils";
import { requireAdmin } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";

export async function listPortfolioItems() {
  return db.select().from(portfolioItems).orderBy(desc(portfolioItems.createdAt));
}

export async function getPortfolioItem(id: string) {
  const [item] = await db.select().from(portfolioItems).where(eq(portfolioItems.id, id));
  return item ?? null;
}

export async function getPortfolioItemBySlug(slug: string) {
  const [item] = await db.select().from(portfolioItems).where(eq(portfolioItems.slug, slug));
  return item ?? null;
}

export async function createPortfolioItem(data: Omit<NewPortfolioItem, "id" | "slug">) {
  await requireAdmin();
  const id = crypto.randomUUID();
  // URL matches the title: always derive the slug from the title.
  const slug = generateSlug(data.title);
  await db.insert(portfolioItems).values({ id, slug, ...data });
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio", "layout");
  return id;
}

export async function updatePortfolioItem(
  id: string,
  data: Omit<Partial<NewPortfolioItem>, "slug"> & { slug?: string }
) {
  await requireAdmin();
  // Keep the URL matching the title: regenerate the slug on title changes
  // unless an explicit slug was provided.
  const patch = { ...data };
  if (data.title && !data.slug) {
    patch.slug = generateSlug(data.title);
  }
  await db.update(portfolioItems).set({ ...patch, updatedAt: new Date() }).where(eq(portfolioItems.id, id));
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio", "layout");
}

export async function deletePortfolioItem(id: string) {
  await requireAdmin();
  await db.delete(portfolioItems).where(eq(portfolioItems.id, id));
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
}
