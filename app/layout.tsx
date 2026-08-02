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
    "verified contact lists",
    "business automation",
    "B2B lead generation USA",
    "B2B lead generation UK",
    "B2B lead generation Australia",
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
        "AI-powered B2B lead generation agency for companies in the USA, UK, and Australia: prospect list building, contact enrichment, decision-maker research, and CRM-ready prospect databases for outbound sales campaigns.",
      areaServed: ["US", "GB", "AU"],
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
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "B2B Lead Generation",
            url: `${SITE_URL}/b2b-lead-generation`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Prospect List Building",
            url: `${SITE_URL}/prospect-list-building`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Contact Enrichment",
            url: `${SITE_URL}/contact-enrichment`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Decision Maker Research",
            url: `${SITE_URL}/decision-maker-research`,
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
