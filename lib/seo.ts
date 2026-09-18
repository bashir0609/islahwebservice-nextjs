import type { Metadata } from "next";

export const SITE_NAME = "Islah Web Service";
export const TITLE_TEMPLATE = `%s | ${SITE_NAME}`;
export const SITE_URL = "https://www.islahwebservice.com";

export function absoluteUrl(path: string): string {
  return new URL(path, `${SITE_URL}/`).href;
}
export const SITE_DESCRIPTION =
  "Custom human research against your ICP — target companies, requested decision-makers, verified contacts, delivered CRM-ready. USA, UK, Australia.";
export const HOME_TITLE = "Custom B2B Prospect List Research | Islah Web Service";

/** Resolve the same branded title used by the root template and social metadata. */
export function withSiteName(title: string): string {
  return `${title} | ${SITE_NAME}`;
}


interface PageMetadataArgs {
  /** Page name without the brand suffix (it is added automatically). */
  title: string;
  /** Collection layouts must carry the template forward to their children. */
  templateChildren?: boolean;
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
 * Page titles are unbranded cores; the root layout applies the shared template.
 * Social metadata uses the resolved title because it does not inherit that template.
 */
export function pageMetadata({
  title,
  templateChildren = false,
  description,
  path,
  image,
  imageAlt = title,
  ogType = "website",
  article,
}: PageMetadataArgs): Metadata {
  const fullTitle = withSiteName(title);
  const imageUrl = absoluteUrl(image || "/og-image.png");
  const socialImage = {
    url: imageUrl,
    alt: imageAlt,
    ...(imageUrl === absoluteUrl("/og-image.png") ? { width: 1200, height: 630 } : {}),
  };

  return {
    title: templateChildren ? { default: title, template: TITLE_TEMPLATE } : title,
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
