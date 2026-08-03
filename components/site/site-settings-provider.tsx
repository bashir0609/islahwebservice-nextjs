"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getAllSettings } from "@/lib/site-settings";
import type { SiteSettings } from "@/types";

interface SiteSettingsContextValue {
  settings: SiteSettings;
  loading: boolean;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null);

const defaultSettings: SiteSettings = {
  siteName: "Islah Web Service",
  siteDescription:
    "B2B prospect research — company research, decision-maker discovery, contact enrichment, and verified, CRM-ready prospect databases.",
  contactEmail: "hello@islahwebservice.com",
  contactPhone: "+1 (442) 222-8258",
  contactAddress: "Sylhet, Bangladesh",
  socialLinks: {},
  headerLinks: [
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  footerLinks: [
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

export function SiteSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const rows = await getAllSettings();
        if (mounted) {
          const parsed: SiteSettings = { ...defaultSettings, ...rows, socialLinks: {} };
          const social: Record<string, string> = {};
          for (const [k, v] of Object.entries(rows)) {
            if (k.startsWith("social")) {
              const key = k.replace(/^social(.)/, (_, c) => c.toLowerCase());
              social[key] = v;
            }
          }
          parsed.socialLinks = social;
          setSettings(parsed);
        }
      } catch (error) {
        console.error("Failed to fetch site settings:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <SiteSettingsContext.Provider value={{ settings: defaultSettings, loading }}>
        {children}
      </SiteSettingsContext.Provider>
    );
  }

  return (
    <SiteSettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) throw new Error("useSiteSettings must be used within provider");
  return ctx;
}
