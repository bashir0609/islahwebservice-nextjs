import type { Metadata } from "next";
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import { SiteSettingsProvider } from "@/components/site/site-settings-provider";

export const metadata: Metadata = {
  title: {
    default: "Islah Web Service | B2B Lead Generation for USA, UK & Australia",
    template: "%s | Islah Web Service",
  },
  description:
    "Verified B2B contact lists, lead generation analysis, and business process automation for companies in the USA, UK, and Australia.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.islahwebservice.com",
    siteName: "Islah Web Service",
    title: "Islah Web Service | B2B Lead Generation for USA, UK & Australia",
    description:
      "Verified B2B contact lists, lead generation analysis, and business process automation for companies in the USA, UK, and Australia.",
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
      "Verified B2B contact lists, lead generation analysis, and business process automation for companies in the USA, UK, and Australia.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon-150x150.png",
    apple: "/favicon-150x150.png",
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteSettingsProvider>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </SiteSettingsProvider>
  );
}
