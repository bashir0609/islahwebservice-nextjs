import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import { SiteSettingsProvider } from "@/components/site/site-settings-provider";

// Base canonical for the homepage; child layouts override it with their own.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteSettingsProvider>
      {/* Respect the user's OS-level reduced-motion setting site-wide. */}
      <MotionConfig reducedMotion="user">
        <div className="flex min-h-screen flex-col">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-cyan-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
          >
            Skip to main content
          </a>
          <SiteHeader />
          {/* Pages render their own <main>; this wrapper avoids nested landmarks. */}
          <div id="main-content" className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </MotionConfig>
    </SiteSettingsProvider>
  );
}
