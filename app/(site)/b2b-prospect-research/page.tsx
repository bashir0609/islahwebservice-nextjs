"use client";

import Link from "next/link";
import {
  Target,
  Users,
  Mail,
  Linkedin,
  Building2,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  Search,
  MapPin,
  Database,
  CheckCircle2,
} from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/site/related-guides";

const faqs = [
  {
    q: "What does B2B prospect research include?",
    a: "We research target companies against your criteria, identify the decision-makers you request, enrich and verify their contact details, and deliver a clean, CRM-ready prospect database. Outreach and campaign execution stay with your team.",
  },
  {
    q: "Which company criteria can you research?",
    a: "Almost any realistically researchable requirement: industry, category, country, state, city, postal code, radius, employee count, revenue range, technologies used, CRM or software, funding stage and dates, hiring activity, office locations, property ownership, certifications, website characteristics, and more.",
  },
  {
    q: "Which decision-maker titles can you find?",
    a: "You specify the functions or titles that matter—CEO, founder, CFO, VP of Sales, IT director, operations director, property manager, HR director, and many others. We find current people matching those requirements and verify names, roles, seniority, and employment status.",
  },
  {
    q: "Can you work with unusual custom requirements?",
    a: "Yes. Handling unusual, multi-layered research criteria is one of our strongest differentiators—from property portfolios and association memberships to tech-stack and funding combinations. If a criterion is realistically researchable, we can build around it.",
  },
  {
    q: "Do you run cold email campaigns or book meetings?",
    a: "No. We specialize in the research and data stage of outbound sales. We identify target companies, find relevant decision-makers, enrich and verify contact data, and deliver the database in a CRM-ready format. Your team or outreach partner controls messaging, campaign execution, meetings, and sales.",
  },
  {
    q: "What format will I receive?",
    a: "CSV, Excel, or Google Sheets, with custom column formatting to match your CRM or workflow. We also deduplicate, standardize, and quality-check records before delivery.",
  },
];

export default function B2BProspectResearchPage() {
  return (
    <main className="flex flex-col">
      {/* Service structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "B2B Prospect Research Services",
            serviceType: "B2B Prospect Research",
            description:
              "B2B prospect research built around your criteria: companies researched against your requirements, requested decision-makers identified, contact details enriched and verified, and delivered CRM-ready.",
            provider: { "@type": "Organization", name: "Islah Web Service", url: "https://www.islahwebservice.com" },
            areaServed: ["US", "GB", "AU"],
            url: "https://www.islahwebservice.com/b2b-prospect-research",
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
              { "@type": "ListItem", position: 2, name: "Services", item: "https://www.islahwebservice.com/services" },
              { "@type": "ListItem", position: 3, name: "B2B Prospect Research", item: "https://www.islahwebservice.com/b2b-prospect-research" },
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(45,212,191,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />

        <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionReveal immediate delay={0.2} className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
                <Search className="h-4 w-4" />
                B2B Prospect Research
              </div>
            </SectionReveal>

            <SectionReveal immediate delay={0.4} className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                B2B Prospect Research
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-teal-400">
                  Services
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal immediate delay={0.6} className="mb-8 mx-auto max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                Islah Web Service researches the companies and decision-makers your sales team wants to reach. Each
                project is built around your industry, geography, company criteria, desired roles, and required data
                fields.
              </p>
            </SectionReveal>

            <SectionReveal immediate delay={0.8} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button asChild size="lg">
                <Link href="/free-consultation">
                  Request a Free Sample
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                <Link href="#how-we-work">Learn Our Process</Link>
              </Button>
            </SectionReveal>

            <SectionReveal immediate delay={1} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Research built around your criteria
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Verified contacts &amp; emails
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                CRM-ready delivery
              </span>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Built around your criteria */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(34,211,238,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Prospect Research for Complex
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                Targeting Requirements
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Generic databases force your team to filter thousands of irrelevant records. We build each database from
              your requirements, combining company research, decision-maker discovery, enrichment, and verification.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Building2,
                title: "Manufacturing + Tech Stack",
                description:
                  "Find manufacturing companies in Texas using NetSuite, with 50–250 employees, funded within the last 18 months—and identify the CFO or VP of Finance.",
              },
              {
                icon: MapPin,
                title: "Property Portfolios",
                description:
                  "Find commercial property owners in Chicago that own more than five buildings and identify the person responsible for acquisitions.",
              },
              {
                icon: Users,
                title: "Hiring Signals",
                description:
                  "Find companies using HubSpot that have recently hired SDRs and identify the relevant sales leader.",
              },
              {
                icon: Target,
                title: "Local Business Discovery",
                description:
                  "Find local businesses from Google Maps within a specific radius, verify their websites, and identify the owner or marketing decision-maker.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/15 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-cyan-400" />
                      </div>
                      <CardTitle className="text-lg text-white leading-snug">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-400 leading-relaxed text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* How We Work */}
      <section id="how-we-work" className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,212,191,0.07),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              How We Work
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A transparent six-step workflow from your criteria to a verified, CRM-ready database.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {[
              { step: 1, title: "Share Your Target Criteria", description: "Provide your existing ICP, target account description, geography, company characteristics, desired titles, and required fields." },
              { step: 2, title: "Refine the Research Brief", description: "We clarify ambiguous criteria, confirm available data sources, define exclusions, and agree on the final deliverable." },
              { step: 3, title: "Research Target Companies", description: "We find companies matching the approved criteria using relevant business sources." },
              { step: 4, title: "Identify Decision-Makers", description: "We locate and verify people matching your requested roles or responsibilities." },
              { step: 5, title: "Enrich and Verify the Data", description: "We add contact details, company fields, LinkedIn profiles, and emails, validating across sources." },
              { step: 6, title: "Clean and Deliver", description: "We deduplicate, standardize, quality-check, and deliver the database in your required format." },
            ].map((item, index) => (
              <StaggerItem key={index}>
                <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mb-4">
                      <span className="text-white font-bold">{item.step}</span>
                    </div>
                    <CardTitle className="text-sm mb-2 text-white leading-snug">{item.title}</CardTitle>
                    <CardDescription className="text-xs leading-relaxed text-slate-400">{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* What You'll Receive */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.06),transparent_55%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              What You&apos;ll Receive
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A customized database with the fields and formatting your workflow needs.
            </p>
          </SectionReveal>

          <SectionReveal>
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: Building2, label: "Target company information" },
                    { icon: Users, label: "Decision-maker names & titles" },
                    { icon: Mail, label: "Verified business emails" },
                    { icon: Linkedin, label: "LinkedIn profiles" },
                    { icon: Database, label: "Firmographic & technographic data" },
                    { icon: ShieldCheck, label: "Verification status" },
                    { icon: FileSpreadsheet, label: "Custom columns & CRM-ready formatting" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-cyan-400" />
                      </div>
                      <span className="text-slate-300 text-sm leading-relaxed">{item.label}</span>
                    </div>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </SectionReveal>
        </div>
      </section>

      {/* Scope */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <SectionReveal>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              We Build the Data. Your Team Controls the Outreach.
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Our responsibility is to research the right companies, identify the requested people, enrich and verify
              the records, and deliver clean data. Your messaging, outreach system, sales conversations, meetings, and
              closed deals remain under your team&apos;s control.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.06),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Frequently Asked Questions
            </h2>
          </SectionReveal>

          <div className="space-y-6">
            {faqs.map((item, index) => (
              <SectionReveal key={item.q} delay={index * 0.05}>
                <Card className="border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300">
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

      {/* Related guides */}
      <RelatedGuides
        tone="900"
        guides={[
          {
            href: "/blog/complete-guide-to-b2b-lead-generation",
            title: "The Complete Guide to B2B Lead Generation",
            description: "The pillar guide — from defining your ICP to delivering CRM-ready prospect lists with verified decision makers.",
          },
          {
            href: "/blog/how-to-build-b2b-prospect-lists",
            title: "How to Build B2B Prospect Lists",
            description: "Research-based methods for building target-account lists that match your exact criteria.",
          },
          {
            href: "/blog/contact-enrichment-guide",
            title: "The B2B Contact Enrichment Guide",
            description: "What enrichment adds to your records, and how verified fields improve your prospect data.",
          },
        ]}
      />

      {/* CTA */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.15),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(45,212,191,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              See the Research Quality Before Starting a Full Project
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Share your targeting criteria and receive a small sample showing the type of companies, contacts,
              verification fields, and formatting available for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button asChild size="lg">
                <Link href="/free-consultation">
                  Request a Free 20-Record Sample
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                <Link href="/portfolio">View Research Projects</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
