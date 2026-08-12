import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import { HOME_TITLE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "B2B lead generation",
    "B2B prospect research",
    "prospect data services",
    "decision-maker research",
    "contact enrichment",
    "email verification",
    "CRM-ready prospect data",
    "company research service",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon-150x150.png",
    apple: "/favicon-150x150.png",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
      },
      image: `${SITE_URL}/og-image.png`,
      email: "mailto:hello@islahwebservice.com",
      telephone: "+1-442-222-8258",
      foundingDate: "2016",
      founder: {
        "@type": "Person",
        name: "Bashir Ahmed",
        jobTitle: "Founder",
        url: "https://www.linkedin.com/in/bashir0609",
      },
      description:
        "B2B lead generation data services: Islah Web Service researches target companies, identifies requested decision-makers, enriches and verifies contacts, and delivers CRM-ready prospect databases for the USA, UK, and Australia.",
      areaServed: ["US", "GB", "AU"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sylhet",
        addressCountry: "BD",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+1-442-222-8258",
        email: "hello@islahwebservice.com",
        areaServed: ["US", "GB", "AU"],
        availableLanguage: ["English"],
      },
      sameAs: [
        "https://www.linkedin.com/in/bashir0609",
        "https://github.com/bashir0609",
        "https://www.upwork.com/freelancers/bashirahmed",
        "https://youtu.be/sCuJWWqi7S8",
      ],
      // Service hierarchy reflects the new architecture: one core service
      // (B2B Prospect Research) plus its distinct existing-database enrichment
      // application. No appointment setting, outreach, or pipeline claims.
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "B2B Prospect Research",
            serviceType: "B2B Prospect Research",
            description:
              "Company research, decision-maker discovery, contact enrichment, email verification, and CRM-ready data delivery built around client targeting criteria.",
            url: `${SITE_URL}/b2b-prospect-research`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Existing Database Enrichment & Contact Data Completion",
            serviceType: "B2B Contact Data Enrichment",
            description:
              "Complete and clean an existing prospect or CRM database: missing emails, phone numbers, LinkedIn URLs, job-title updates, company-field completion, verification, deduplication, and record standardization.",
            url: `${SITE_URL}/contact-enrichment`,
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, "min-h-screen bg-white text-slate-900 antialiased")}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W6Z7MHG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Toaster />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','GTM-W6Z7MHG');",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
