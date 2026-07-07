import { pgTable, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const portfolioItems = pgTable("portfolio_items", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  tags: jsonb("tags").notNull().default("[]").$type<string[]>(),
  featured: integer("featured").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  published: integer("published").notNull().default(0),
  tags: jsonb("tags").notNull().default("[]").$type<string[]>(),
  author: text("author"),
  readTime: integer("read_time"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const blogKeywords = pgTable("blog_keywords", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  keywords: jsonb("keywords").notNull().default("[]").$type<string[]>(),
  category: text("category").notNull(),
  generatedAt: timestamp("generated_at").defaultNow(),
});

export const aiSettings = pgTable("ai_settings", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  provider: text("provider").notNull().default("groq"),
  apiKey: text("api_key"),
  model: text("model").notNull(),
  temperature: integer("temperature"),
  updatedAt: timestamp("updated_at").defaultNow(),
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