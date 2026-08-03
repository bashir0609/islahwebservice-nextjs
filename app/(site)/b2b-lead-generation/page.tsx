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
  TrendingUp,
  ShieldCheck,
  Zap,
  Search,
} from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/site/related-guides";

const faqs = [
  {
    q: "What do I receive with B2B prospect research services?",
    a: "You receive a CRM-ready prospect database: target companies researched against your criteria, verified decision-makers, business emails, LinkedIn URLs, and company information—delivered as a spreadsheet or synced to your CRM.",
  },
  {
    q: "How are the companies matched?",
    a: "Every company is matched against the targeting criteria you provide—industry, company size, location, technology, funding, and other researchable requirements—so the database reflects your exact target market.",
  },
  {
    q: "How fast can you deliver a prospect database?",
    a: "Most projects deliver an initial verified database within 5–10 business days. Larger, multi-segment databases are scoped and delivered in phases.",
  },
  {
    q: "Which markets do you cover?",
    a: "We regularly research the USA, UK, and Australia, and can support research in other English-speaking markets on request.",
  },
];

export default function B2BLeadGenerationPage() {
  return (
    <main className="flex flex-col">
      {/* Service structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "B2B Lead Generation Data Services",
            serviceType: "B2B Prospect Research",
            description:
              "B2B lead generation data services: companies researched against your criteria, requested decision-makers identified, contact details enriched and verified, and delivered CRM-ready.",
            provider: { "@type": "Organization", name: "Islah Web Service", url: "https://www.islahwebservice.com" },
            areaServed: ["US", "GB", "AU"],
            url: "https://www.islahwebservice.com/b2b-lead-generation",
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
              { "@type": "ListItem", position: 3, name: "B2B Lead Generation Services", item: "https://www.islahwebservice.com/b2b-lead-generation" },
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
                <TrendingUp className="h-4 w-4" />
                B2B Prospect Research
              </div>
            </SectionReveal>

            <SectionReveal immediate delay={0.4} className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                B2B Lead Generation
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-teal-400">
                  and Data Services
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal immediate delay={0.6} className="mb-8 mx-auto max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                We research target companies, match them against your criteria, identify the requested decision-makers, enrich and verify contact details, and prepare the data for your sales workflow.
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
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(34,211,238,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Why B2B Teams Buy Generic Prospect Data
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Prepackaged databases waste time, budget, and domain reputation.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Generic lists, wasted calls",
                description:
                  "Recycled databases filled with stale or irrelevant contacts mean your sales team spends hours on companies that were never going to buy.",
              },
              {
                title: "No ICP fit",
                description:
                  "Volume lists ignore your ideal customer profile, so outreach lacks the targeting precision that drives reply rates.",
              },
              {
                title: "Bounces kill deliverability",
                description:
                  "Unverified emails bounce, damage your sending domain, and sink cold outreach before it reaches an inbox.",
              },
            ].map((item, index) => (
              <StaggerItem key={index}>
                <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-red-500/15 flex items-center justify-center mb-4">
                      <Search className="h-6 w-6 text-red-400" />
                    </div>
                    <CardTitle className="text-xl mb-3 text-white">{item.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed text-slate-400">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Solution */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,212,191,0.07),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              A Prospect Database Built Around Your Criteria
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              We combine company research, multi-source validation, and human quality review to deliver data your team can act on immediately.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Target, title: "Criteria-Based Research", description: "Companies matched to the targeting criteria you provide." },
              { icon: Users, title: "Decision-Maker Research", description: "Current people matching the titles you request—not generic inboxes." },
              { icon: ShieldCheck, title: "Verified Data", description: "Multi-step validation flags unverifiable or risky records." },
              { icon: FileSpreadsheet, title: "CRM-Ready Delivery", description: "Clean spreadsheets formatted for your CRM and workflow." },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={index}>
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/15 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-cyan-400" />
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

      {/* How We Work */}
      <section id="how-we-work" className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.06),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              How We Work
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A repeatable five-step process from goals to CRM-ready data.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { step: 1, title: "Define Your ICP", description: "We lock in target industries, company size, and decision-maker roles." },
              { step: 2, title: "Research Companies", description: "We find companies matching your ICP across your target markets." },
              { step: 3, title: "Identify Decision Makers", description: "We locate the right people by name, title, and role." },
              { step: 4, title: "Verify Contact Data", description: "Every email is validated to keep bounce rates low." },
              { step: 5, title: "Deliver CRM-Ready Lists", description: "You receive a clean, verified spreadsheet for outreach." },
            ].map((item, index) => (
              <StaggerItem key={index}>
                <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mb-4">
                      <span className="text-white font-bold">{item.step}</span>
                    </div>
                    <CardTitle className="text-lg mb-2 text-white">{item.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-slate-400">{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Deliverables */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.06),transparent_55%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              What You&apos;ll Receive
            </h2>
            <p className="text-xl text-slate-400">
              Every deliverable is complete, verified, and ready to use.
            </p>
          </SectionReveal>

          <SectionReveal>
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: Building2, label: "Target Companies" },
                    { icon: Users, label: "Decision Makers" },
                    { icon: Mail, label: "Verified Emails" },
                    { icon: Linkedin, label: "LinkedIn URLs" },
                    { icon: Target, label: "Company Information" },
                    { icon: FileSpreadsheet, label: "CRM-Ready Spreadsheet" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-cyan-400" />
                      </div>
                      <span className="text-slate-300">{item.label}</span>
                    </div>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </SectionReveal>
        </div>
      </section>

      {/* Who It's For */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(45,212,191,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Who It&apos;s For
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Built for B2B teams that sell to other businesses.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { href: "/industries/msp", title: "Managed Service Providers", description: "Local prospect lists for IT services companies." },
              { href: "/industries/saas", title: "SaaS Companies", description: "ICP-qualified lists for software sales teams." },
              { href: "/industries/recruitment", title: "Recruitment Firms", description: "Hiring-decision-maker data for staffing agencies." },
              { href: "/industries/professional-services", title: "Professional Services", description: "Targeted databases for consultancies and agencies." },
            ].map((item, index) => (
              <StaggerItem key={index}>
                <Link href={item.href} className="group block h-full">
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg mb-2 text-white group-hover:text-cyan-400 transition-colors">{item.title}</CardTitle>
                      <CardDescription className="text-sm text-slate-400">{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(56,189,248,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Why Choose Islah Web Service
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Proven process, verified data, and a decade of B2B experience.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Verified Data Quality", description: "Multi-source validation on every record, with unverifiable or risky addresses flagged." },
              { icon: Search, title: "Research Built From Your Criteria", description: "Companies and people researched against the requirements you provide." },
              { icon: TrendingUp, title: "Proven Delivery Record", description: "190+ projects delivered with a 100% Job Success Score and long-term client relationships." },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={index}>
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/15 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-cyan-400" />
                      </div>
                      <CardTitle className="text-xl mb-3 text-white">{item.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed text-slate-400">{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
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
            href: "/blog/sales-prospecting-playbook",
            title: "The B2B Sales Prospecting Playbook",
            description: "Find, qualify, and prioritize accounts that match your ICP so your outbound pipeline starts with real opportunities.",
          },
          {
            href: "/blog/what-is-b2b-lead-generation-a-2026-guide-for-growth-teams",
            title: "What Is B2B Lead Generation? A 2026 Guide",
            description: "The strategies, tools, and best practices growth teams use to generate qualified business leads in 2026.",
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
              Ready to See the Research Quality?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Request a free sample of prospect research for your target criteria—see the quality before you commit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button asChild size="lg">
                <Link href="/free-consultation">
                  Request a Free Sample
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                <Link href="/portfolio">View Case Studies</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
