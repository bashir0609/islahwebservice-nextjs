"use client";

import Link from "next/link";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";
import { Linkedin, Twitter, Instagram, Facebook, Github, ArrowUp } from "lucide-react";
import { useSiteSettings } from "@/components/site/site-settings-provider";
import { pushEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const SOCIAL_META: { key: string; label: string; icon: React.ReactNode }[] = [
  { key: "linkedin", label: "LinkedIn", icon: <Linkedin className="h-4 w-4" /> },
  { key: "twitter", label: "Twitter / X", icon: <Twitter className="h-4 w-4" /> },
  { key: "facebook", label: "Facebook", icon: <Facebook className="h-4 w-4" /> },
  { key: "instagram", label: "Instagram", icon: <Instagram className="h-4 w-4" /> },
  { key: "github", label: "GitHub", icon: <Github className="h-4 w-4" /> },
];

export default function SiteFooter() {
  const { settings } = useSiteSettings();

  // Only render social icons that have a real URL configured in the admin.
  const socials = SOCIAL_META.filter(
    (s) => settings.socialLinks && settings.socialLinks[s.key],
  );

  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/Islah-logo.png"
                alt="Islah Web Service"
                width={200}
                height={50}
                className="h-auto w-32 sm:w-40 md:w-44"
              />
            </Link>
            <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs">
              Islah Web Service builds customized B2B prospect databases through company research, decision-maker discovery, contact enrichment, verification, and CRM-ready data preparation.
            </p>
            <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs">
              Serving MSPs, SaaS companies, recruitment firms, and B2B sales teams with criteria-matched prospect data.
            </p>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li><Link href="/b2b-prospect-research" className="transition-colors hover:text-cyan-400">B2B Prospect Research</Link></li>
              <li><Link href="/contact-enrichment" className="transition-colors hover:text-cyan-400">Existing Database Enrichment</Link></li>
              <li><Link href="/industries" className="transition-colors hover:text-cyan-400">Industries We Research</Link></li>
              <li><Link href="/request-sample" className="transition-colors hover:text-cyan-400">Request a Free Sample</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
              Industries
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li><Link href="/industries/msp" className="transition-colors hover:text-cyan-400">Managed Service Providers</Link></li>
              <li><Link href="/industries/saas" className="transition-colors hover:text-cyan-400">SaaS Companies</Link></li>
              <li><Link href="/industries/recruitment" className="transition-colors hover:text-cyan-400">Recruitment Firms</Link></li>
              <li><Link href="/industries/professional-services" className="transition-colors hover:text-cyan-400">Professional Services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li><Link href="/about" className="transition-colors hover:text-cyan-400">About</Link></li>
              <li><Link href="/portfolio" className="transition-colors hover:text-cyan-400">Case Studies</Link></li>
              <li><Link href="/blog" className="transition-colors hover:text-cyan-400">Blog</Link></li>
              <li><Link href="/free-consultation" className="transition-colors hover:text-cyan-400">Free Consultation</Link></li>
              <li><Link href="/request-sample" className="transition-colors hover:text-cyan-400">Request a Free Sample</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-cyan-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <a
                  href={settings.contactEmail ? `mailto:${settings.contactEmail}` : undefined}
                  onClick={() => pushEvent("email_click", { type: "footer" })}
                  className="transition-colors hover:text-cyan-400"
                >
                  {settings.contactEmail}
                </a>
              </li>
              <li>
                <a
                  href={settings.contactPhone ? `tel:${settings.contactPhone.replace(/[^+\d]/g, "")}` : undefined}
                  onClick={() => pushEvent("phone_click", { type: "footer" })}
                  className="transition-colors hover:text-cyan-400"
                >
                  {settings.contactPhone}
                </a>
              </li>
              <li><span>{settings.contactAddress}</span></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            © {new Date().getFullYear()} Islah Web Service. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {socials.map(({ key, label, icon }) => (
              <a
                key={key}
                href={settings.socialLinks[key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all duration-200",
                  "hover:-translate-y-0.5 hover:bg-white/10 hover:text-cyan-400",
                )}
              >
                {icon}
              </a>
            ))}

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-all duration-200",
                "hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-400",
              )}
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
