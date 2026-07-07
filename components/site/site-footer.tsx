"use client";

import Link from "next/link";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";
import { Twitter, Linkedin, Instagram, Facebook, Github } from "lucide-react";

const SOCIAL: Record<string, React.ReactNode> = {
  linkedin: <Linkedin className="h-4 w-4" />,
  twitter: <Twitter className="h-4 w-4" />,
  github: <Github className="h-4 w-4" />,
  facebook: <Facebook className="h-4 w-4" />,
  instagram: <Instagram className="h-4 w-4" />,
};

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
                      <Link href="/" className="flex items-center gap-2">
                        <Image
                          src="/Islah-logo.png"
                          alt="Islah Web Service"
                          width={36}
                          height={36}
                          className="h-9 w-9"
                        />
                        <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                          Islah Web Service
                        </span>
                      </Link>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Professional B2B services: Verified Contact Lists, Lead Generation
              Analysis, and Business Process Automation.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Services</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="/services" className="hover:text-cyan-600">Verified B2B Contact Lists</Link></li>
              <li><Link href="/services" className="hover:text-cyan-600">Lead Generation Analysis</Link></li>
              <li><Link href="/services" className="hover:text-cyan-600">Business Process Automation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="/about" className="hover:text-cyan-600">About</Link></li>
              <li><Link href="/portfolio" className="hover:text-cyan-600">Portfolio</Link></li>
              <li><Link href="/blog" className="hover:text-cyan-600">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-600">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="mailto:hello@islahwebservice.com" className="hover:text-cyan-600">hello@islahwebservice.com</Link></li>
              <li><span>123 Business Ave, Suite 100</span></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-200 dark:bg-slate-800" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Islah Web Service. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-slate-400 hover:text-cyan-600">
              {SOCIAL.linkedin}
            </Link>
            <Link href="#" className="text-slate-400 hover:text-cyan-600">
              {SOCIAL.twitter}
            </Link>
            <Link href="#" className="text-slate-400 hover:text-cyan-600">
              {SOCIAL.github}
            </Link>
            <Link href="#" className="text-slate-400 hover:text-cyan-600">
              {SOCIAL.facebook}
            </Link>
            <Link href="#" className="text-slate-400 hover:text-cyan-600">
              {SOCIAL.instagram}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
