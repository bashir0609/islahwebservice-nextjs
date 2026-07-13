import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function parseTags(tags: unknown): string[] {
  let value = tags;
  if (typeof value === "string") {
    try {
      value = JSON.parse(value);
    } catch (error) {
      console.error("Failed to parse tags JSON:", error);
      return [];
    }
  }
  if (!Array.isArray(value)) return [];
  return value.filter((tag): tag is string => typeof tag === "string" && Boolean(tag));
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}
