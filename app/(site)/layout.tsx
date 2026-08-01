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
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </MotionConfig>
    </SiteSettingsProvider>
  );
}
