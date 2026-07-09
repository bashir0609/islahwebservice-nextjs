import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://islahwebservice.com"),
  title: {
    default: "Islah Web Service — B2B Solutions Agency",
    template: "%s | Islah Web Service",
  },
  description:
    "Professional B2B services: Verified Contact Lists, Lead Generation Analysis, and Business Process Automation.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://islahwebservice.com",
    siteName: "Islah Web Service",
    title: "Islah Web Service — B2B Solutions Agency",
    description:
      "Professional B2B services: Verified Contact Lists, Lead Generation Analysis, and Business Process Automation.",
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
    title: "Islah Web Service — B2B Solutions Agency",
    description:
      "Professional B2B services: Verified Contact Lists, Lead Generation Analysis, and Business Process Automation.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon-150x150.png",
    apple: "/favicon-150x150.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, "min-h-screen bg-white text-slate-900 antialiased")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
