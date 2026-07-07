"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { blogPosts, type NewBlogPost } from "@/lib/db/schema";
import { generateSlug } from "@/lib/utils";
import { eq, sql } from "drizzle-orm";

export async function listBlogPosts() {
  return db.select().from(blogPosts).orderBy(blogPosts.createdAt);
}

export async function getBlogPostBySlug(slug: string) {
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
  return post ?? null;
}

export async function createBlogPost(data: Omit<NewBlogPost, "id" | "slug">) {
  const id = crypto.randomUUID();
  const slug = generateSlug(data.title);
  const [existing] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
  const finalSlug = existing ? `${slug}-${id.slice(0, 6)}` : slug;

  await db.insert(blogPosts).values({ id, slug: finalSlug, ...data });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return id;
}

export async function updateBlogPost(id: string, data: Partial<NewBlogPost>) {
  await db
    .update(blogPosts)
    .set({ ...data, updatedAt: sql`(unixepoch())` })
    .where(eq(blogPosts.id, id));
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function deleteBlogPost(id: string) {
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function toggleBlogPostPublished(id: string) {
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
  if (!post) return;
  await db
    .update(blogPosts)
    .set({ published: post.published ? 0 : 1, updatedAt: sql`(unixepoch())` })
    .where(eq(blogPosts.id, id));
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
