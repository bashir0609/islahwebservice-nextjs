import { sqliteTable, text, integer, int, real } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).default(new Date()),
});

export const portfolioItems = sqliteTable("portfolio_items", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  tags: text("tags").notNull().default("[]"),
  featured: integer("featured").notNull().default(0),
  createdAt: int("created_at", { mode: "timestamp" }).default(new Date()),
  updatedAt: int("updated_at", { mode: "timestamp" }).default(new Date()),
});

export const blogPosts = sqliteTable("blog_posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  published: integer("published").notNull().default(0),
  tags: text("tags").notNull().default("[]"),
  author: text("author"),
  readTime: integer("read_time"),
  createdAt: int("created_at", { mode: "timestamp" }).default(new Date()),
  updatedAt: int("updated_at", { mode: "timestamp" }).default(new Date()),
});

export const blogKeywords = sqliteTable("blog_keywords", {
  id: text("id").primaryKey(),
  keywords: text("keywords").notNull().default("[]"),
  category: text("category").notNull(),
  generatedAt: int("generated_at", { mode: "timestamp" }).default(new Date()),
});

export const aiSettings = sqliteTable("ai_settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  provider: text("provider").notNull().default("groq"),
  apiKey: text("api_key"),
  model: text("model").notNull(),
  temperature: integer("temperature"),
  updatedAt: int("updated_at", { mode: "timestamp" }).default(new Date()),
});

// Define relations
export const portfolioItemsRelations = relations(portfolioItems, ({ many }) => ({
  // future relations
}));

export const blogPostsRelations = relations(blogPosts, ({ many }) => ({
  // future relations
}));

export type Setting = typeof siteSettings.$inferSelect;
export type NewSetting = typeof siteSettings.$inferInsert;
export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type NewPortfolioItem = typeof portfolioItems.$inferInsert;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type BlogKeyword = typeof blogKeywords.$inferSelect;
export type NewBlogKeyword = typeof blogKeywords.$inferInsert;
export type AISetting = typeof aiSettings.$inferSelect;
export type NewAISetting = typeof aiSettings.$inferInsert;