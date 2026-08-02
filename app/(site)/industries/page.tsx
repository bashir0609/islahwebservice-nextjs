"use client";

import Link from "next/link";
import { ShieldCheck, TrendingUp, Users, Briefcase, ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/site/related-guides";

const industries = [
  {
    href: "/industries/msp",
    icon: ShieldCheck,
    tint: "bg-cyan-500/15 text-cyan-400",
    title: "Managed Service Providers",
    tagline: "IT service companies that sell to other businesses",
    description:
      "We help MSPs build prospect lists of local and regional businesses that need outsourced IT, managed security, and support—with verified decision-maker contacts.",
  },
  {
    href: "/industries/saas",
    icon: TrendingUp,
    tint: "bg-purple-500/15 text-purple-400",
    title: "SaaS Companies",
    tagline: "Software businesses targeting other companies",
    description:
      "From cold email data to ICP-qualified prospect lists, we help SaaS teams fill their pipeline with companies ready for their platform.",
  },
  {
    href: "/industries/recruitment",
    icon: Users,
    tint: "bg-orange-500/15 text-orange-400",
    title: "Recruitment Firms",
    tagline: "Staffing and recruitment agencies",
    description:
      "We deliver verified company and hiring-decision-maker data so recruiters spend more time placing talent and less time researching targets.",
  },
  {
    href: "/industries/professional-services",
    icon: Briefcase,
    tint: "bg-emerald-500/15 text-emerald-400",
    title: "Professional Services",
    tagline: "Consultancies, agencies & advisory firms",
    description:
      "We build targeted prospect databases for B2B consultancies and agencies that need a steady flow of qualified business development opportunities.",
  },
];

export default function IndustriesPage() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl animate-pulse" />

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionReveal immediate delay={0.2} className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
                <Briefcase className="h-4 w-4" />
                B2B Lead Generation by Industry
              </div>
            </SectionReveal>

            <SectionReveal immediate delay={0.4} className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                Prospect Lists Built
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400">
                  For Your Industry
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal immediate delay={0.6} className="mb-8 mx-auto max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                Every industry has its own decision-makers, buying signals, and data sources. We build verified prospect lists tuned to yours.
              </p>
            </SectionReveal>

            <SectionReveal immediate delay={0.8} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Verified decision-maker contacts
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ICP research included
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                CRM-ready formatting
              </span>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(34,211,238,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Choose your industry to see how we build sales-ready prospect databases for your exact market.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <StaggerItem key={industry.href} className="h-full">
                  <Link href={industry.href} className="group block h-full">
                    <Card className="h-full p-8 border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                      <CardHeader className="p-0">
                        <div className={`w-14 h-14 rounded-2xl ${industry.tint} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-7 w-7" />
                        </div>
                        <CardTitle className="text-2xl mb-2 text-white group-hover:text-cyan-400 transition-colors">
                          {industry.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-cyan-400/80 font-medium mb-4">
                          {industry.tagline}
                        </CardDescription>
                      </CardHeader>
                      <CardDescription className="text-base leading-relaxed text-slate-400 mb-6">
                        {industry.description}
                      </CardDescription>
                      <span className="inline-flex items-center text-cyan-400 font-medium">
                        Explore industry solutions
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

      {/* Related guides */}
      <RelatedGuides
        tone="950"
        guides={[
          {
            href: "/blog/complete-guide-to-b2b-lead-generation",
            title: "The Complete Guide to B2B Lead Generation",
            description: "The pillar guide — from defining your ICP to delivering CRM-ready prospect lists with verified decision makers.",
          },
          {
            href: "/blog/sales-prospecting-playbook",
            title: "The B2B Sales Prospecting Playbook",
            description: "Find, qualify, and prioritize accounts that match your ICP so your outbound pipeline starts with real opportunities.",
          },
          {
            href: "/blog/how-to-build-b2b-prospect-lists",
            title: "How to Build B2B Prospect Lists That Convert",
            description: "Research, filtering, qualification, and verification — the four steps that turn a spreadsheet into a sales asset.",
          },
        ]}
      />

      {/* CTA */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,85,247,0.08),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Don&apos;t See Your Industry?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Our process works for any B2B market. Tell us your ideal customer profile and we&apos;ll build the prospect list to match.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg">
                <Link href="/free-consultation">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
