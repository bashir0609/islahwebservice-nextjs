"use client";

import Link from "next/link";
import { ShieldCheck, TrendingUp, Users, Briefcase, Building2, ArrowRight, CheckCircle2, Search, Target } from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/site/related-guides";

const industries = [
  {
    href: "/industries/saas",
    icon: TrendingUp,
    tint: "bg-purple-500/15 text-purple-400",
    title: "SaaS",
    tagline: "Software companies targeting other businesses",
    description:
      "Criteria-matched company research for SaaS sales teams: technology stacks, funding stage, hiring activity, and the revenue roles your product supports.",
    criteria: ["Funding stage & last funding date", "Technologies used", "Employee growth & hiring activity", "SaaS category & company size"],
    roles: ["VP Sales · Head of Sales · CRO", "VP Marketing · Head of Growth · RevOps", "IT leadership", "Finance leadership"],
  },
  {
    href: "/industries/msp",
    icon: ShieldCheck,
    tint: "bg-cyan-500/15 text-cyan-400",
    title: "Managed Service Providers",
    tagline: "IT service companies that sell to other businesses",
    description:
      "Targeted company research for MSPs: businesses matching your geography, size, industry, and IT-related criteria — with the owners and IT leaders you want to reach.",
    criteria: ["Geographic radius · city · state", "Employee count & locations", "Technologies used & IT job openings", "Business growth & company age"],
    roles: ["Owner · CEO · COO", "Operations Director", "IT Manager · IT Director · CTO", "Office Manager"],
  },
  {
    href: "/industries/recruitment",
    icon: Users,
    tint: "bg-orange-500/15 text-orange-400",
    title: "Recruitment",
    tagline: "Staffing and recruitment agencies",
    description:
      "Hiring-signal research for recruitment firms: companies with open roles, hiring growth, and expansion — matched to the talent leaders your agency serves.",
    criteria: ["Active job postings & open roles", "Hiring growth & department hiring", "Seniority of open roles", "Geographic expansion & funding"],
    roles: ["HR Director · HR Manager", "Talent Acquisition Manager", "Head of Talent · People Director", "Recruitment Manager · Department Head"],
  },
  {
    href: "/industries/professional-services",
    icon: Briefcase,
    tint: "bg-emerald-500/15 text-emerald-400",
    title: "Professional Services",
    tagline: "Consultancies, agencies & advisory firms",
    description:
      "Criteria-matched account research for consultancies, agencies, and advisory firms — companies showing the growth events and business-model signals your firm specializes in.",
    criteria: ["Industry · geography · employee count", "Revenue & business model", "Recent expansion & new locations", "Hiring & growth events"],
    roles: ["Owner · Partner · Founder", "CEO · Managing Director", "Department heads", "Practice leads"],
  },
  {
    href: "/industries/real-estate",
    icon: Building2,
    tint: "bg-sky-500/15 text-sky-400",
    title: "Real Estate",
    tagline: "Commercial property & real estate organizations",
    description:
      "Research property owners, investors, property-management companies, and other real estate organizations using location, ownership, portfolio, property-type, and client-defined criteria.",
    criteria: ["Property ownership", "Portfolio size", "Asset type", "Geography", "Decision-maker role"],
    roles: ["Owner · Principal · Managing Partner", "Director of Acquisitions · Asset Manager", "Property Manager · Director of Property Management", "Operations · Facilities · Investment leadership"],
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
                B2B Lead Generation
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400">
                  by Industry
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal immediate delay={0.6} className="mb-8 mx-auto max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                Different industries require different research criteria. Islah Web Service builds targeted
                prospect databases using industry-specific company research, decision-maker discovery, contact
                enrichment, and verification.
              </p>
            </SectionReveal>

            <SectionReveal immediate delay={0.8} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Industry-specific research criteria
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Requested decision-maker roles
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Verified, CRM-ready delivery
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
              Industries We Research
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Choose an industry to see the research criteria and decision-maker roles we build prospect data around.
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

                      <div className="mb-6">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                          <Search className="h-3.5 w-3.5 text-cyan-400" />
                          Example research criteria
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-slate-300">
                          {industry.criteria.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-6">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                          <Target className="h-3.5 w-3.5 text-cyan-400" />
                          Typical decision-maker roles
                        </div>
                        <ul className="space-y-1.5 text-sm text-slate-300">
                          {industry.roles.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <span className="inline-flex items-center text-cyan-400 font-medium">
                        Explore industry research
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
            description: "The pillar guide — from defining target criteria to delivering CRM-ready prospect lists with verified decision makers.",
          },
          {
            href: "/blog/sales-prospecting-playbook",
            title: "The B2B Sales Prospecting Playbook",
            description: "Find accounts that match your target criteria and identify the right contacts for outreach.",
          },
          {
            href: "/blog/how-to-build-b2b-prospect-lists",
            title: "How to Build Targeted B2B Prospect Lists",
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
              Our process works for any B2B market. Tell us your ideal customer profile and we&apos;ll build the
              prospect research to match.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg">
                <Link href="/request-sample">
                  Request a Free Sample
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                <Link href="/b2b-prospect-research">Explore B2B Prospect Research</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
