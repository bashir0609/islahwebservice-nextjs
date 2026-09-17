import type { Metadata } from "next";

export const SITE_NAME = "Islah Web Service";
export const SITE_URL = "https://www.islahwebservice.com";

export function absoluteUrl(path: string): string {
  return new URL(path, `${SITE_URL}/`).href;
}
export const SITE_DESCRIPTION =
  "Custom human research against your ICP — target companies, requested decision-makers, verified contacts, delivered CRM-ready. USA, UK, Australia.";
export const HOME_TITLE = "Custom B2B Prospect List Research | Islah Web Service";

/** Append the brand suffix to a page title (for pages that want it). */
export function withSiteName(title: string): string {
  return `${title} | ${SITE_NAME}`;
}

export const NO_BRAND_SUFFIX = "__NO_BRAND_SUFFIX__";

interface PageMetadataArgs {
  /** Page name without the brand suffix (it is added automatically). */
  title: string;
  description?: string;
  /** Canonical path, e.g. "/about" (resolved against metadataBase). */
  path: string;
  /** Optional OG/Twitter image path. */
  image?: string;
  imageAlt?: string;
  /** Set to "article" for blog posts and case studies. */
  ogType?: "website" | "article";
  /** Article-specific fields for structured social previews. */
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
  };
}

/**
 * Build complete, consistent page metadata (title, canonical, OpenGraph,
 * Twitter) so layouts and dynamic pages stop repeating the same copy.
 *
 * The title is emitted as an *absolute* title so it is never re-wrapped by a
 * parent layout's `title.template` (which would otherwise double the brand
 * suffix on pages nested below a layout that defines its own title).
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt = title,
  ogType = "website",
  article,
  includeBrandSuffix = false,
}: PageMetadataArgs & { includeBrandSuffix?: boolean }): Metadata {
  const fullTitle = includeBrandSuffix ? withSiteName(title) : title;
  const imageUrl = absoluteUrl(image || "/og-image.png");
  const socialImage = {
    url: imageUrl,
    alt: imageAlt,
    ...(imageUrl === absoluteUrl("/og-image.png") ? { width: 1200, height: 630 } : {}),
  };

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      title: fullTitle,
      description,
      url: path,
      images: [socialImage],
      ...(article?.publishedTime ? { publishedTime: article.publishedTime } : {}),
      ...(article?.modifiedTime ? { modifiedTime: article.modifiedTime } : {}),
      ...(article?.authors ? { authors: article.authors } : {}),
    },
    twitter: {
      title: fullTitle,
      description,
      card: "summary_large_image",
      images: [{ url: imageUrl, alt: imageAlt }],
    },
  };
}
