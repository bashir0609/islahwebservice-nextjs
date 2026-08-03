"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Compass,
  FileText,
  Mail,
  SearchX,
  Target,
} from "lucide-react";
import { MotionConfig } from "framer-motion";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
import { SiteSettingsProvider } from "@/components/site/site-settings-provider";

const quickLinks = [
  {
    href: "/services",
    icon: Compass,
    title: "Our Services",
    description: "B2B prospect research, list building, decision-maker research, and contact enrichment.",
  },
  {
    href: "/b2b-lead-generation",
    icon: Target,
    title: "B2B Lead Generation",
    description: "Verified prospect databases with decision-maker contacts.",
  },
  {
    href: "/industries",
    icon: Building2,
    title: "Industries We Serve",
    description: "Prospect lists built for MSPs, SaaS, recruitment, and more.",
  },
  {
    href: "/blog",
    icon: FileText,
    title: "The Islah Journal",
    description: "Practical guides on prospecting, cold email, and lead scoring.",
  },
  {
    href: "/free-consultation",
    icon: SearchX,
    title: "Free Consultation",
    description: "Get a free sample of prospect data for your target criteria.",
  },
  {
    href: "/contact",
    icon: Mail,
    title: "Contact Us",
    description: "Talk to the team about your exact targeting needs.",
  },
];

export default function NotFound() {
  return (
    <SiteSettingsProvider>
      <MotionConfig reducedMotion="user">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            {/* Hero */}
            <section className="relative overflow-hidden bg-slate-950">
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.18),transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(45,212,191,0.10),transparent_50%)]" />
              <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
              <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
              <div className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />

              <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
                <div className="text-center">
                  <SectionReveal immediate delay={0.2} className="mb-6 flex justify-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
                      <SearchX className="h-4 w-4" />
                      Error 404 · Page Not Found
                    </div>
                  </SectionReveal>

                  <SectionReveal immediate delay={0.3} className="mb-4">
                    <div
                      aria-hidden="true"
                      className="text-8xl sm:text-9xl md:text-[11rem] font-bold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-teal-400 drop-shadow-[0_0_45px_rgba(34,211,238,0.25)]"
                    >
                      404
                    </div>
                  </SectionReveal>

                  <SectionReveal immediate delay={0.4} className="mb-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                      This page has moved or never existed
                    </h1>
                  </SectionReveal>

                  <SectionReveal immediate delay={0.5} className="mx-auto mb-10 max-w-2xl">
                    <p className="text-lg sm:text-xl text-slate-400 leading-relaxed">
                      The link you followed may be outdated, or the page was relocated during one of our site updates.
                      Let&apos;s get you back to finding verified leads for your sales team.
                    </p>
                  </SectionReveal>

                  <SectionReveal immediate delay={0.6} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                    <Button asChild size="lg">
                      <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white"
                    >
                      <Link href="/free-consultation">
                        Get a Free Consultation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </SectionReveal>
                </div>
              </div>
            </section>

            {/* Recovery links */}
            <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(34,211,238,0.06),transparent_55%)]" />
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionReveal className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                    Popular pages that might help
                  </h2>
                  <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
                    Everything you need for B2B prospect research — pick up where you left off.
                  </p>
                </SectionReveal>

                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quickLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <StaggerItem key={item.href} className="h-full">
                        <Link href={item.href} className="group block h-full">
                          <Card className="h-full p-6 border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                            <CardHeader className="p-0">
                              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Icon className="h-5 w-5 text-cyan-400" />
                              </div>
                              <CardTitle className="text-lg text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                {item.title}
                              </CardTitle>
                              <CardDescription className="text-sm leading-relaxed text-slate-400">
                                {item.description}
                              </CardDescription>
                            </CardHeader>
                            <span className="mt-4 inline-flex items-center text-cyan-400 text-sm font-medium">
                              Explore
                              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </Card>
                        </Link>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              </div>
            </section>
          </main>
          <SiteFooter />
        </div>
      </MotionConfig>
    </SiteSettingsProvider>
  );
}
