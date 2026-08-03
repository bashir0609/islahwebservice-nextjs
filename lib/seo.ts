import type { Metadata } from "next";

export const SITE_NAME = "Islah Web Service";
export const SITE_URL = "https://www.islahwebservice.com";
export const SITE_DESCRIPTION =
  "B2B prospect research, list building, decision-maker discovery, contact enrichment, and email verification for sales teams. Receive accurate, CRM-ready prospect data built around your targeting criteria.";
export const HOME_TITLE = "B2B Prospect Research Services | Islah Web Service";

/** Append the brand suffix to a page title. */
export function withSiteName(title: string): string {
  return `${title} | ${SITE_NAME}`;
}

interface PageMetadataArgs {
  /** Page name without the brand suffix (it is added automatically). */
  title: string;
  description?: string;
  /** Canonical path, e.g. "/about" (resolved against metadataBase). */
  path: string;
  /** Optional OG/Twitter image path. */
  image?: string;
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
  ogType = "website",
  article,
}: PageMetadataArgs): Metadata {
  const fullTitle = withSiteName(title);

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      title: fullTitle,
      description,
      url: path,
      ...(image ? { images: [{ url: image }] } : {}),
      ...(article?.publishedTime ? { publishedTime: article.publishedTime } : {}),
      ...(article?.modifiedTime ? { modifiedTime: article.modifiedTime } : {}),
      ...(article?.authors ? { authors: article.authors } : {}),
    },
    twitter: {
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
