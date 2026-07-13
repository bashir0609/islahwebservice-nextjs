import { describe, it, expect } from "vitest";
import { cn, formatDate, generateSlug } from "./utils";

describe("cn", () => {
  it("joins multiple class name strings", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("ignores falsy values", () => {
    expect(cn("a", false, null, undefined, "", "b")).toBe("a b");
  });

  it("supports conditional object syntax", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });

  it("merges conflicting tailwind classes, keeping the last", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("returns an empty string with no arguments", () => {
    expect(cn()).toBe("");
  });
});

describe("formatDate", () => {
  it("formats a Date object as a long US date", () => {
    expect(formatDate(new Date("2024-01-15T00:00:00Z"))).toBe("January 15, 2024");
  });

  it("formats an ISO date string", () => {
    expect(formatDate("2023-12-25T00:00:00Z")).toBe("December 25, 2023");
  });

  it("handles single-digit days without padding", () => {
    expect(formatDate("2024-03-05T00:00:00Z")).toBe("March 5, 2024");
  });
});

describe("generateSlug", () => {
  it("lowercases and hyphenates a title", () => {
    expect(generateSlug("Hello World")).toBe("hello-world");
  });

  it("strips punctuation and special characters", () => {
    expect(generateSlug("Hello, World! & Friends?")).toBe("hello-world-friends");
  });

  it("collapses consecutive whitespace into a single hyphen", () => {
    expect(generateSlug("a   b\t c")).toBe("a-b-c");
  });

  it("trims leading and trailing hyphens", () => {
    expect(generateSlug("  --Spaced Out--  ")).toBe("spaced-out");
  });

  it("preserves existing hyphens and word characters", () => {
    expect(generateSlug("Next.js 14 Guide")).toBe("nextjs-14-guide");
  });

  it("returns an empty string for punctuation-only input", () => {
    expect(generateSlug("!!!")).toBe("");
  });
});
