import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: real("updated_at").default(Date.now()),
});

export const portfolioItems = sqliteTable("portfolio_items", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  tags: text("tags").notNull().default("[]"),
  featured: integer("featured").notNull().default(0),
  createdAt: real("created_at").default(Date.now()),
  updatedAt: real("updated_at").default(Date.now()),
});

export const blogPosts = sqliteTable("blog_posts", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  published: integer("published").notNull().default(0),
  tags: text("tags").notNull().default("[]"),
  author: text("author"),
  readTime: integer("read_time"),
  createdAt: real("created_at").default(Date.now()),
  updatedAt: real("updated_at").default(Date.now()),
});

export const blogKeywords = sqliteTable("blog_keywords", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  keywords: text("keywords").notNull().default("[]"),
  category: text("category").notNull(),
  generatedAt: real("generated_at").default(Date.now()),
});

export const aiSettings = sqliteTable("ai_settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  provider: text("provider").notNull().default("groq"),
  apiKey: text("api_key").notNull(),
  model: text("model").notNull(),
  temperature: integer("temperature"),
  updatedAt: real("updated_at").default(Date.now()),
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