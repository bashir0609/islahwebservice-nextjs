"use client";

import Link from "next/link";
import {
  Search,
  Database,
  ArrowRight,
  CheckCircle2,
  Target,
  Building2,
  Users,
  FileSpreadsheet,
  ShieldCheck,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HeroVisual from "@/components/site/hero-visual";
import { INDUSTRIES } from "@/lib/industries";

// Industry icons paired with the shared industry config (lib/industries.ts).
const INDUSTRY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "/industries/saas": TrendingUp,
  "/industries/msp": ShieldCheck,
  "/industries/recruitment": Users,
  "/industries/professional-services": Briefcase,
  "/industries/real-estate": Building2,
};

export default function ServicesPage() {
  const services = [
    {
      href: "/b2b-prospect-research",
      title: "B2B Prospect Research",
      icon: Search,
      tint: "bg-blue-500/15 text-blue-400",
      description:
        "The core service: companies researched against your criteria, requested decision-makers identified, and contact data enriched, verified, and delivered CRM-ready.",
      features: [
        "Company research built around your targeting criteria",
        "Decision-maker discovery by requested title and role",
        "Contact enrichment, email verification, and data cleaning",
        "CRM-ready delivery in CSV, Excel, or Google Sheets",
      ],
    },
    {
      href: "/contact-enrichment",
      title: "Existing Database Enrichment",
      icon: Database,
      tint: "bg-purple-500/15 text-purple-400",
      description:
        "Already have a list? We complete and clean your existing prospect or CRM data: missing emails, phones, LinkedIn URLs, updated titles, verification, and deduplication.",
      features: [
        "Missing emails, phones, and LinkedIn URLs added",
        "Job-title updates and contact replacement",
        "Company-field completion and record standardization",
        "Email verification, deduplication, and database cleanup",
      ],
    },
  ];

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl animate-pulse" />

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <SectionReveal immediate delay={0.2} className="mb-5 sm:mb-6 flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-blue-400">
                  <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-blue-500" />
                  </span>
                  Custom Research · Verified Data · CRM-Ready Delivery
                </div>
              </SectionReveal>

              <SectionReveal immediate delay={0.4} className="mb-6 sm:mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl">
                  B2B Research &amp; Data
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-teal-400">
                    Capabilities
                  </span>
                </h1>
              </SectionReveal>

              <SectionReveal immediate delay={0.6} className="mb-8 sm:mb-10 mx-auto lg:mx-0 max-w-xl">
                <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                  We research target companies, match them against your criteria, identify the requested
                  decision-makers, enrich and verify contact details, and prepare the data for your sales workflow.
                </p>
              </SectionReveal>

              <SectionReveal immediate delay={0.8} className="mb-8 flex flex-col gap-4 sm:flex-row sm:gap-5 justify-center lg:justify-start">
                <Button asChild size="lg">
                  <Link href="/request-sample">
                    Request a Free Sample
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white"
                >
                  <Link href="/portfolio">View Research Projects</Link>
                </Button>
              </SectionReveal>

              <SectionReveal immediate delay={1} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-400 lg:justify-start">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Verified data
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  USA · UK · AU
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Human-reviewed research
                </span>
              </SectionReveal>
            </div>

            <SectionReveal immediate delay={0.3}>
              <HeroVisual />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.07),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              What We Offer
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              One core service — B2B prospect research — plus a distinct service for clients who already have a list.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <SectionReveal delay={index * 0.2} className="h-full" key={service.href}>
                <Card className="group relative overflow-hidden h-full flex flex-col border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                  <CardHeader className="p-8 flex-grow">
                    <div className={`w-16 h-16 rounded-2xl ${service.tint} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl mb-4 text-white">
                      <Link
                        href={service.href}
                        className="group-hover:text-cyan-400 transition-colors hover:underline"
                      >
                        {service.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 flex-grow flex flex-col">
                    <CardDescription className="text-base leading-relaxed mb-6 flex-grow text-slate-400">
                      {service.description}
                    </CardDescription>
                    <div className="space-y-3 mt-auto">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-300 text-sm leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={service.href}
                      className="inline-flex items-center text-cyan-400 font-medium hover:gap-2 transition-all mt-6"
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Research by Industry
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              The same research process, applied with industry-specific criteria and decision-maker roles.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {INDUSTRIES.map((industry, index) => {
              const Icon = INDUSTRY_ICONS[industry.href] ?? Briefcase;
              return (
                <StaggerItem key={industry.href} className="h-full">
                  <Link href={industry.href} className="group block h-full">
                    <Card className="h-full p-6 border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center mb-4">
                        <Icon className="h-5 w-5 text-cyan-400" />
                      </div>
                      <CardTitle className="text-lg text-white mb-2 group-hover:text-cyan-400 transition-colors">{industry.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed text-slate-400">{industry.description}</CardDescription>
                    </Card>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <SectionReveal delay={0.3} className="mt-10 text-center">
            <Link href="/industries" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              Explore all industry research
              <ArrowRight className="h-4 w-4" />
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* Process Steps */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Our Process
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              From your target criteria to verified, CRM-ready data — a repeatable workflow.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {[
              { step: 1, title: "Share Your Criteria", description: "Provide your target accounts, geography, company characteristics, and required fields.", icon: Target },
              { step: 2, title: "Refine the Brief", description: "We clarify ambiguous criteria and confirm the deliverable.", icon: CheckCircle2 },
              { step: 3, title: "Research Companies", description: "Find companies matching the approved criteria.", icon: Building2 },
              { step: 4, title: "Identify Decision Makers", description: "Locate and verify people matching the requested roles.", icon: Users },
              { step: 5, title: "Enrich, Verify, Deliver", description: "Add fields, validate records, and deliver CRM-ready.", icon: FileSpreadsheet },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={index} className="relative">
                  <Card className="h-full flex flex-col items-center text-center p-6 sm:p-8 border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300">
                    <div className="relative mb-6">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mx-auto">
                        <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center text-xs sm:text-sm font-bold text-cyan-400 shadow">
                        {item.step}
                      </div>
                    </div>
                    <CardTitle className="text-lg sm:text-xl mb-3 text-white">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="flex-grow text-slate-400">
                      {item.description}
                    </CardDescription>
                  </Card>
                  {index < 4 && (
                    <div className="hidden sm:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
                    </div>
                  )}
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Scope + CTA */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(45,212,191,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              We Build the Data. Your Team Controls the Outreach.
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Tell us who you want to target — or describe your ideal customer — and we will help refine the
              research criteria before building a customized, verified prospect database.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/request-sample">Request a Free Sample</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white w-full sm:w-auto">
                <Link href="/portfolio">View Research Projects</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
