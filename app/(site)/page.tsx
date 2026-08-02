"use client";

import Link from "next/link";
import { TrendingUp, Wrench, Users, ArrowRight, CheckCircle2, Globe2, MapPin, ShieldCheck, Mail, Star, Award, ChevronRight, Target, X } from "lucide-react";
import { SectionReveal } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HeroVisual from "@/components/site/hero-visual";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950">
        {/* Differentiated background treatment */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(45,212,191,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-teal-500/15 blur-3xl animate-pulse" />

        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Copy */}
            <div className="text-center lg:text-left">
              <SectionReveal delay={0.2} className="mb-5 sm:mb-6 flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-cyan-400">
                  <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-cyan-500" />
                  </span>
                  ACCEPTING NEW CLIENTS — Limited Availability
                </div>
              </SectionReveal>

              <SectionReveal delay={0.4} className="mb-6 sm:mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl">
                  AI-Powered B2B
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-teal-400">
                    Lead Generation
                  </span>
                  <span className="block text-white">for Sales Teams</span>
                </h1>
              </SectionReveal>

              <SectionReveal delay={0.6} className="mb-8 sm:mb-10 mx-auto lg:mx-0 max-w-xl">
                <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                  We help B2B companies identify their ideal customers, find verified decision-makers, enrich contact data, and build CRM-ready prospect lists that support successful outbound sales campaigns.
                </p>
              </SectionReveal>

              <SectionReveal delay={0.8} className="mb-8 flex flex-col gap-4 sm:flex-row sm:gap-5 justify-center lg:justify-start">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Book a Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white"
                >
                  <Link href="#process">View Our Process</Link>
                </Button>
              </SectionReveal>

              <SectionReveal delay={1} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-400 lg:justify-start">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span>190+ Completed Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-cyan-400" />
                  <span>100% Job Success Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>USA, UK & AU Markets</span>
                </div>
              </SectionReveal>
            </div>

            {/* Product mockup visual */}
            <SectionReveal delay={0.3}>
              <HeroVisual />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Proof Bar */}
      <section className="relative overflow-hidden bg-slate-950 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.07),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <SectionReveal className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
              <div className="flex items-center justify-center gap-1 text-amber-400 mb-3">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">190+</div>
              <div className="text-xs sm:text-sm text-slate-400">Projects Completed</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
              <div className="flex items-center justify-center gap-1 text-cyan-400 mb-3">
                <Award className="h-5 w-5" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-xs sm:text-sm text-slate-400">Job Success Score</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
              <div className="flex items-center justify-center gap-1 text-emerald-400 mb-3">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">USA, UK & AU</div>
              <div className="text-xs sm:text-sm text-slate-400">Markets Served</div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Who We Help */}
      <section className="relative overflow-hidden bg-slate-950 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Who We Help
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              We build prospect pipelines for B2B teams that sell to other businesses—across the industries where targeted outreach matters most.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                href: "/industries/msp",
                icon: ShieldCheck,
                title: "Managed Service Providers",
                desc: "Target businesses that need outsourced IT and managed services.",
              },
              {
                href: "/industries/saas",
                icon: TrendingUp,
                title: "SaaS Companies",
                desc: "Find companies ready for your software, platform, and tools.",
              },
              {
                href: "/industries/recruitment",
                icon: Users,
                title: "Recruitment Firms",
                desc: "Reach hiring decision-makers for staffing and recruitment solutions.",
              },
              {
                href: "/industries/professional-services",
                icon: Globe2,
                title: "Professional Services",
                desc: "Connect with consultancies, agencies, and advisory firms.",
              },
              {
                href: "/services",
                icon: Target,
                title: "B2B Sales Teams",
                desc: "Give your own team a repeatable flow of verified prospects.",
              },
            ].map((item, index) => (
              <SectionReveal key={item.title} delay={index * 0.1} className="h-full">
                <Link href={item.href} className="group block h-full">
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="h-6 w-6 text-cyan-400" />
                      </div>
                      <CardTitle className="text-lg text-white leading-snug">{item.title}</CardTitle>
                      <CardDescription className="text-sm text-slate-400 leading-relaxed">{item.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(45,212,191,0.06),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              B2B Lead Generation Services
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              From prospect discovery to verified, CRM-ready data—every service is built around one outcome: qualified opportunities for your sales team.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SectionReveal delay={0}>
              <Link href="/b2b-lead-generation" className="group block h-full">
                <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Globe2 className="h-6 w-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-white group-hover:text-cyan-400 transition-colors">B2B Lead Generation</CardTitle>
                    <CardDescription className="text-slate-400">Identify companies matching your ideal customer profile.</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <Link href="/prospect-list-building" className="group block h-full">
                <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-purple-500/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="h-6 w-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-white group-hover:text-cyan-400 transition-colors">Prospect List Building</CardTitle>
                    <CardDescription className="text-slate-400">Build targeted prospect databases for outbound campaigns.</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <Link href="/contact-enrichment" className="group block h-full">
                <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-orange-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-orange-500/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Wrench className="h-6 w-6 text-orange-400" />
                    </div>
                    <CardTitle className="text-white group-hover:text-cyan-400 transition-colors">Contact Enrichment</CardTitle>
                    <CardDescription className="text-slate-400">Find verified decision-makers and complete company data.</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </SectionReveal>

            <SectionReveal delay={0.3}>
              <Link href="/contact-enrichment" className="group block h-full">
                <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="h-6 w-6 text-emerald-400" />
                    </div>
                    <CardTitle className="text-white group-hover:text-cyan-400 transition-colors">Email Verification</CardTitle>
                    <CardDescription className="text-slate-400">Reduce bounce rates with validated business email addresses.</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </SectionReveal>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/services">
                See Full System
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Irresistible Offer */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.06),transparent_50%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400 mb-6">
              <CheckCircle2 className="h-4 w-4" />
              Limited-Time Offer
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Free AI Lead Generation Audit
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Get a personalized audit of your current lead generation process. We'll show you exactly where you're losing prospects and build a custom AI system to fix it—100% free.
            </p>
          </SectionReveal>

          <SectionReveal>
            <Card className="border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-md shadow-2xl shadow-cyan-500/10">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-white">What You'll Get</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    "Complete audit of your current lead sources",
                    "AI-powered analysis of your ideal customer profile",
                    "Custom roadmap to 2× qualified leads in 30 days",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href="/contact">
                      Claim Your Free Audit
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <p className="mt-3 text-xs text-slate-400">No credit card required. 15-minute strategy session.</p>
                </div>
              </CardContent>
            </Card>
          </SectionReveal>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(45,212,191,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.06),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Why Choose Islah Web Service
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              We combine B2B lead generation expertise, automation, and verified data quality so your team can focus on closing deals.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Verified Data",
                description: "Every contact list is validated through multi-step verification to reduce bounced emails and improve outreach accuracy.",
              },
              {
                icon: Globe2,
                title: "USA, UK & Australia Focus",
                description: "We specialize in B2B lead generation for American, British, and Australian markets, with campaigns tuned to each region's industries.",
              },
              {
                icon: MapPin,
                title: "Market Expertise",
                description: "Deep knowledge of US, UK, and Australian business directories, registries, and market-specific data sources for better targeting.",
              },
              {
                icon: TrendingUp,
                title: "Conversion Focused",
                description: "Our lead generation analysis doesn't just collect data—it improves lead scoring, segmentation, and cold email conversion.",
              },
              {
                icon: Wrench,
                title: "Automation Ready",
                description: "We design workflows that connect with your CRM and outreach stack, reducing manual work and repeatable errors.",
              },
              {
                icon: Users,
                title: "Dedicated Support",
                description: "A real team handles your campaigns, not a black-box tool. You get direct updates, QA checks, and campaign tuning.",
              },
            ].map((item, index) => (
              <SectionReveal key={item.title} delay={index * 0.1}>
                <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/15 flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why We're Different — comparison table */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.07),transparent_55%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Why Our Workflow Is Different
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Most list providers sell volume. We build a pipeline your sales team can actually act on.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="hidden sm:grid grid-cols-2 border-b border-white/10">
                <div className="px-5 py-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Traditional List Building
                </div>
                <div className="px-5 py-4 text-sm font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10">
                  Islah Web Service
                </div>
              </div>
              {[
                { traditional: "Generic databases", islah: "ICP-based research" },
                { traditional: "Unverified contacts", islah: "Multi-step verification" },
                { traditional: "Bulk exports", islah: "CRM-ready delivery" },
                { traditional: "Minimal qualification", islah: "AI + human quality review" },
              ].map((row, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-1 sm:grid-cols-2 ${index < 3 ? "border-b border-white/10" : ""}`}
                >
                  <div className="px-5 py-3 sm:py-4 flex items-start gap-2 text-slate-300">
                    <X className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{row.traditional}</span>
                  </div>
                  <div className="px-5 py-3 sm:py-4 flex items-start gap-2 text-white bg-cyan-500/10">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{row.islah}</span>
                  </div>
                </div>
              ))}
            </Card>
          </SectionReveal>
        </div>
      </section>

      {/* Visual Process */}
      <section id="process" className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.07),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A simple workflow to go from business goals to qualified B2B contacts and automated follow-up processes.
            </p>
          </SectionReveal>

          <div className="relative">
            {/* Connector line behind steps on desktop */}
            <div className="absolute left-0 right-0 top-1/2 hidden -translate-y-1/2 border-t-2 border-dashed border-cyan-500/30 lg:block" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-5 lg:gap-4">
              {[
                { step: "01", title: "Define Your ICP", desc: "Lock in your ideal customer profile, target industries, and company size." },
                { step: "02", title: "Research Target Companies", desc: "Find companies that match your ICP across your target markets." },
                { step: "03", title: "Identify Decision Makers", desc: "Locate the right people—by name, title, and role." },
                { step: "04", title: "Verify Contact Data", desc: "Validate emails and phone numbers to keep bounce rates low." },
                { step: "05", title: "Deliver CRM-Ready Prospect Lists", desc: "Hand off clean, verified lists ready for your CRM and outreach stack." },
              ].map((item, index) => (
                <SectionReveal key={item.step} delay={index * 0.08} className="md:last:col-start-2 lg:col-start-auto">
                  <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 p-4 md:p-6 text-center h-full backdrop-blur-sm">
                    <div className="text-cyan-400 text-xs font-semibold mb-2">STEP {item.step}</div>
                    <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    {item.step !== "05" && (
                      <ChevronRight className="absolute -right-4 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 rounded-full bg-cyan-600 text-white shadow-md lg:block" aria-hidden="true" />
                    )}
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,212,191,0.08),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Measurable Client Results
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Real outcomes from recent lead generation and outreach projects.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SectionReveal delay={0}>
              <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">Local Marketing Agency, USA</CardTitle>
                  <CardDescription className="text-cyan-400/80">Verified Prospect List Delivery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-slate-300">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Needed: 5,000 verified prospects</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Delivered: 5,600 verified contacts</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Bounce rate: under 2%</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Campaign launched in 3 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">SaaS Startup, UK</CardTitle>
                  <CardDescription className="text-cyan-400/80">Automated Lead Sourcing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-slate-300">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Built automated lead sourcing workflow</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Reduced manual research by 80%</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Saved 20+ hours per week</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Scaled outreach without adding headcount</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Testimonials / Case Studies */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.08),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Client Success Stories
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Real feedback from clients who trusted Islah Web Service with lead generation, research, and outreach-ready data.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SectionReveal delay={0}>
              <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">B2B Lead Generation</CardTitle>
                  <CardDescription className="text-cyan-400/80">Long-term Client, USA</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 leading-relaxed mb-4">
                    "Bashir has been an instrumental part in our lead-generation efforts. He brings a wealth of knowledge around SEO and Email Marketing infrastructure and strategies. His team is professional and gets tasks done in a timeline manner."
                  </p>
                  <div className="flex items-center gap-2 text-cyan-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">3+ years of ongoing collaboration</span>
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">Prospect Lists</CardTitle>
                  <CardDescription className="text-cyan-400/80">5-Star Rated Client, USA</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 leading-relaxed mb-4">
                    "Bashir is an excellent worker and I will hire him again."
                  </p>
                  <div className="flex items-center gap-2 text-cyan-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">5.0 rating</span>
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">Lead Generation & Virtual Assistant</CardTitle>
                  <CardDescription className="text-cyan-400/80">Returning Client, USA</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 leading-relaxed mb-4">
                    "It has been a pleasure working with Bashir. The only reason we're stopping this contract is that we are moving to a new larger contract. Looking forward to working with him again."
                  </p>
                  <div className="flex items-center gap-2 text-cyan-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Upgraded to a larger contract</span>
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.3}>
              <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">Email & Lead Outreach</CardTitle>
                  <CardDescription className="text-cyan-400/80">Repeat Client, USA</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 leading-relaxed mb-4">
                    "Bashir worked on a lead generation project for me for several months. I plan to hire him again in the future if I need additional leads."
                  </p>
                  <div className="flex items-center gap-2 text-cyan-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Long-term repeat engagement</span>
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is an AI lead generation system?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "An AI lead generation system automatically discovers, verifies, enriches, and qualifies prospects using data from Google Maps, company websites, and B2B datasets—so you get outreach-ready leads instead of generic contact lists.",
                },
              },
              {
                "@type": "Question",
                name: "How do you verify B2B contact lists?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We verify contacts through multi-step checks including email validation, phone verification, role confirmation, and source tracing. This reduces bounce rates and improves campaign deliverability.",
                },
              },
              {
                "@type": "Question",
                name: "Which countries do you serve?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We mainly serve businesses in the USA, UK, and Australia. Our research, data sources, and outreach strategies are tailored to these markets, though we can support campaigns targeting other English-speaking regions as well.",
                },
              },
              {
                "@type": "Question",
                name: "Can you automate my existing outreach workflow?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. We integrate CRM automation, email sequencing, and follow-up workflows to reduce manual effort and keep your sales team focused on high-value conversations.",
                },
              },
              {
                "@type": "Question",
                name: "How long does it take to build a verified lead list?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most projects deliver initial verified contact lists within 5–10 business days, depending on target industry, geography, and list size.",
                },
              },
              {
                "@type": "Question",
                name: "What is B2B lead generation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "B2B lead generation is the process of identifying and qualifying companies and decision-makers that match your ideal customer profile, so your sales team can focus on prospects most likely to buy.",
                },
              },
              {
                "@type": "Question",
                name: "Which industries do you specialize in?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We primarily build prospect pipelines for Managed Service Providers (MSPs), SaaS companies, recruitment firms, and B2B professional services—though our process works for any B2B market.",
                },
              },
              {
                "@type": "Question",
                name: "What information is included in a prospect list?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Each prospect list includes company name, website, industry, location, verified business email, and decision-maker contact details—formatted and ready for your CRM or cold email tool.",
                },
              },
            ],
          }),
        }}
      />

      {/* FAQ */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.06),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Common questions about AI lead generation systems, data enrichment, and automation with Islah Web Service.
            </p>
          </SectionReveal>

          <div className="space-y-6">
            {[
              {
                q: "What is an AI lead generation system?",
                a: "An AI lead generation system automatically discovers, verifies, enriches, and qualifies prospects using data from Google Maps, company websites, and B2B datasets—so you get outreach-ready leads instead of generic contact lists.",
              },
              {
                q: "How do you verify B2B contact lists?",
                a: "We verify contacts through multi-step checks including email validation, phone verification, role confirmation, and source tracing. This reduces bounce rates and improves campaign deliverability.",
              },
              {
                q: "Which countries do you serve?",
                a: "We mainly serve businesses in the USA, UK, and Australia. Our research, data sources, and outreach strategies are tailored to these markets, though we can support campaigns targeting other English-speaking regions as well.",
              },
              {
                q: "Can you automate my existing outreach workflow?",
                a: "Yes. We integrate CRM automation, email sequencing, and follow-up workflows to reduce manual effort and keep your sales team focused on high-value conversations.",
              },
              {
                q: "How long does it take to build a verified lead list?",
                a: "Most projects deliver initial verified contact lists within 5–10 business days, depending on target industry, geography, and list size.",
              },
              {
                q: "What is B2B lead generation?",
                a: "B2B lead generation is the process of identifying and qualifying companies and decision-makers that match your ideal customer profile, so your sales team can focus on prospects most likely to buy.",
              },
              {
                q: "Which industries do you specialize in?",
                a: "We primarily build prospect pipelines for Managed Service Providers (MSPs), SaaS companies, recruitment firms, and B2B professional services—though our process works for any B2B market.",
              },
              {
                q: "What information is included in a prospect list?",
                a: "Each prospect list includes company name, website, industry, location, verified business email, and decision-maker contact details—formatted and ready for your CRM or cold email tool.",
              },
            ].map((item, index) => (
              <SectionReveal key={item.q} delay={index * 0.05}>
                <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">{item.q}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400 leading-relaxed">{item.a}</p>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.15),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(45,212,191,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Ready to 2× Your Qualified Leads?
            </h2>
            <p className="text-xl text-slate-400 mb-4 max-w-2xl mx-auto">
              Book a free lead generation strategy call. We'll show you exactly how to build a system that delivers consistent, qualified prospects to your sales team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Book a Free Strategy Call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white"
              >
                <Link href="mailto:hello@islahwebservice.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Us
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-slate-400">Free consultation · No obligation · Sample data available</p>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
