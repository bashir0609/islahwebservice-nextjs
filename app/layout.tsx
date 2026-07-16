import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.islahwebservice.com"),
  title: {
    default: "Islah Web Service | B2B Lead Generation for USA, UK & Australia",
    template: "%s | Islah Web Service",
  },
  description:
    "Islah Web Service provides verified B2B contact lists, lead generation analysis, and business automation for growing companies in the USA, UK, and Australia. Contact us today.",
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
    url: "https://www.islahwebservice.com",
    siteName: "Islah Web Service",
    title: "Islah Web Service | B2B Lead Generation for USA, UK & Australia",
    description:
      "Islah Web Service provides verified B2B contact lists, lead generation analysis, and business automation for growing companies in the USA, UK, and Australia. Contact us today.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Islah Web Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Islah Web Service | B2B Lead Generation for USA, UK & Australia",
    description:
      "Islah Web Service provides verified B2B contact lists, lead generation analysis, and business automation for growing companies in the USA, UK, and Australia. Contact us today.",
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
  "@type": "Organization",
  name: "Islah Web Service",
  url: "https://www.islahwebservice.com",
  email: "mailto:hello@islahwebservice.com",
  description:
    "Professional B2B services for companies in the USA, UK, and Australia: verified contact lists, lead generation analysis, and business process automation.",
  areaServed: ["US", "GB", "AU"],
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, "min-h-screen bg-white text-slate-900 antialiased")}>
        {children}
        <Toaster />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
