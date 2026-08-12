"use client";

import Link from "next/link";
import {
  Briefcase,
  Globe2,
  Users,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  LineChart,
  Search,
  Building2,
} from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/site/related-guides";

const researchCriteria = [
  "Industry & geography",
  "Employee count & revenue",
  "Recent expansion & new locations",
  "Technology & hiring activity",
  "Business model",
  "Growth events",
  "Client-specific service indicators",
];

const decisionMakerRoles = [
  "Owner · Partner · Founder",
  "CEO · Managing Director",
  "Department heads",
  "Practice leads",
];

export default function ProfessionalServicesIndustryPage() {
  const faqs = [
    {
      q: "What kinds of professional services firms benefit from this?",
      a: "Consultancies, marketing and creative agencies, accounting firms, IT consultancies, advisory firms, and other B2B service providers that need criteria-matched prospect research for their business development teams.",
    },
    {
      q: "How do you find companies matching our target criteria?",
      a: "Islah researches companies matching your target criteria — industry, geography, employee count, revenue, recent expansion, technology, hiring, business model, growth events, and client-specific service indicators — and identifies relevant business decision-makers for your outreach team.",
    },
    {
      q: "Who should our firm contact in a prospect company?",
      a: "We deliver owners, partners, founders, CEOs, managing directors, department heads, and practice leads — the people you request — with verified contact details.",
    },
    {
      q: "Does your research identify companies that need our service?",
      a: "No. We deliver potentially relevant companies and criteria-matched accounts showing client-defined research signals. We do not claim to identify buyers ready to purchase or build your pipeline for you.",
    },
  ];

  return (
    <main className="flex flex-col">
      {/* Service structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Lead Generation for Professional Services",
            serviceType: "B2B Prospect Research",
            description:
              "Lead generation research for professional services firms: companies researched against your target criteria, with relevant business decision-makers identified, enriched, verified, and delivered CRM-ready.",
            provider: { "@type": "Organization", name: "Islah Web Service", url: "https://www.islahwebservice.com" },
            areaServed: ["US", "GB", "AU"],
            url: "https://www.islahwebservice.com/industries/professional-services",
          }),
        }}
      />

      {/* Breadcrumbs structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.islahwebservice.com" },
              { "@type": "ListItem", position: 2, name: "Industries", item: "https://www.islahwebservice.com/industries" },
              { "@type": "ListItem", position: 3, name: "Lead Generation for Professional Services", item: "https://www.islahwebservice.com/industries/professional-services" },
            ],
          }),
        }}
      />

      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionReveal immediate delay={0.2} className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
                <Briefcase className="h-4 w-4" />
                For Professional Services
              </div>
            </SectionReveal>

            <SectionReveal immediate delay={0.4} className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                Lead Generation
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                  for Professional Services Firms
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal immediate delay={0.6} className="mb-8 mx-auto max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                Islah researches companies matching your target criteria and identifies relevant business
                decision-makers for your outreach team.
              </p>
            </SectionReveal>

            <SectionReveal immediate delay={0.8} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button asChild size="lg">
                <Link href="/request-sample">
                  Request a Free Sample
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                <Link href="/b2b-prospect-research">Explore B2B Prospect Research</Link>
              </Button>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* How we research */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Research Built Around Your Target Criteria
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              We deliver criteria-matched accounts and client-defined research signals — not claims about need or
              readiness to buy.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: LineChart, title: "Criteria-matched accounts", description: "Potentially relevant companies matched to the service indicators and criteria you define." },
              { icon: Users, title: "Partner & owner contacts", description: "Owners, partners, founders, and department heads identified at each company." },
              { icon: TrendingUp, title: "Growth-event research", description: "Companies showing hiring, expansion, or new-location events where you request them." },
              { icon: Building2, title: "Firmographic fit", description: "Industry, geography, employee count, revenue, and business model researched for fit." },
              { icon: Globe2, title: "Client-defined signals", description: "Technology, hiring, and other indicators you specify — never unproven purchase intent." },
              { icon: ShieldCheck, title: "Verified, CRM-ready data", description: "Every record enriched and email-validated, formatted for your CRM and follow-up workflows." },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={index}>
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-emerald-400" />
                      </div>
                      <CardTitle className="text-lg mb-3 text-white">{item.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed text-slate-400">{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Criteria + roles */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.07),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SectionReveal>
              <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-white mb-3 flex items-center gap-3">
                    <Search className="h-6 w-6 text-emerald-400" />
                    Research Criteria
                  </CardTitle>
                  <CardDescription className="text-base text-slate-400 leading-relaxed">
                    Example criteria professional services firms request:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-slate-300">
                    {researchCriteria.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-white mb-3 flex items-center gap-3">
                    <Users className="h-6 w-6 text-emerald-400" />
                    Decision-Maker Roles
                  </CardTitle>
                  <CardDescription className="text-base text-slate-400 leading-relaxed">
                    Example roles professional services firms request:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5 text-sm text-slate-300">
                    {decisionMakerRoles.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                    We deliver potentially relevant companies and criteria-matched accounts showing client-defined
                    research signals — we do not claim to identify buyers ready to purchase.
                  </p>
                </CardContent>
              </Card>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.07),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              What You&apos;ll Receive
            </h2>
            <p className="text-xl text-slate-400">
              A verified, CRM-ready prospect database built around your target criteria.
            </p>
          </SectionReveal>

          <SectionReveal>
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <div className="space-y-4">
                  {[
                    "Potentially relevant companies matching your target criteria",
                    "Verified business emails and phone numbers where available",
                    "Owner, partner, founder, and decision-maker contacts with LinkedIn profiles",
                    "Industry, size, and growth-signal data",
                    "CRM-ready formatting for your outreach stack",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-base leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </SectionReveal>

          <SectionReveal delay={0.2} className="mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/request-sample">
                  Get a Free Sample List
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                <Link href="/portfolio/contact-enrichment-uk-consultancy">See the Professional Services Case Study</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </SectionReveal>

          <div className="space-y-6">
            {faqs.map((item, index) => (
              <SectionReveal key={item.q} delay={index * 0.05}>
                <Card className="border-white/10 bg-white/5 backdrop-blur-sm hover:border-emerald-500/40 transition-all duration-300">
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

      {/* Related industries */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Other Industries We Research
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { href: "/industries/msp", title: "Managed Service Providers", icon: ShieldCheck },
              { href: "/industries/saas", title: "SaaS Companies", icon: TrendingUp },
              { href: "/industries/recruitment", title: "Recruitment Firms", icon: Users },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <SectionReveal key={item.href} delay={index * 0.1}>
                  <Link href={item.href} className="group block">
                    <Card className="h-full p-6 border-white/10 bg-white/5 backdrop-blur-sm hover:border-emerald-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-emerald-400" />
                        </div>
                        <CardTitle className="text-lg text-white group-hover:text-emerald-400 transition-colors">
                          {item.title}
                        </CardTitle>
                      </div>
                    </Card>
                  </Link>
                </SectionReveal>
              );
            })}
          </div>

          <SectionReveal delay={0.3} className="mt-10 text-center">
            <Link href="/b2b-prospect-research" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              See how our company and decision-maker research applies to professional services firms
              <ArrowRight className="h-4 w-4" />
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* Related guides */}
      <RelatedGuides
        tone="950"
        accent={{ chip: "bg-emerald-500/15 text-emerald-400", border: "hover:border-emerald-500/40", text: "group-hover:text-emerald-400" }}
        guides={[
          {
            href: "/blog/linkedin-outreach-for-b2b-sales",
            title: "LinkedIn Outreach for B2B Sales",
            description: "Reaching partners and founders the right way — personalized at scale, without the spam.",
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
    </main>
  );
}
