"use client";

import Link from "next/link";
import {
  Filter,
  Search,
  ShieldCheck,
  FileSpreadsheet,
  ArrowRight,
  Target,
  Users,
  Database,
  TrendingUp,
  Building2,
  Zap,
} from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/site/related-guides";

const faqs = [
  {
    q: "How are companies selected for my prospect list?",
    a: "We start from your targeting criteria—industry, company size, location, and other signals—then research each company against real business data sources so only criteria-matched targets make the list.",
  },
  {
    q: "Why do custom criteria matter in list building?",
    a: "A list built around your target requirements is more relevant than a generic database. Every record is filtered against the criteria you provide.",
  },
  {
    q: "How do you verify the data?",
    a: "Each list passes multi-step validation: email format and domain checks, role confirmation, and source tracing. Records that cannot be verified are clearly flagged.",
  },
  {
    q: "Can you build lists for a specific market or territory?",
    a: "Yes. We build prospect lists by city, state, or country—including the USA, UK, and Australia—down to a specific radius if needed.",
  },
];

export default function ProspectListBuildingPage() {
  return (
    <main className="flex flex-col">
      {/* Service structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Prospect List Building Service",
            serviceType: "Prospect List Building",
            description:
              "Researched, filtered, and qualified prospect databases built around your ideal customer profile, with verified contact data for outbound campaigns.",
            provider: { "@type": "Organization", name: "Islah Web Service", url: "https://www.islahwebservice.com" },
            areaServed: ["US", "GB", "AU"],
            url: "https://www.islahwebservice.com/prospect-list-building",
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
              { "@type": "ListItem", position: 3, name: "Prospect List Building", item: "https://www.islahwebservice.com/prospect-list-building" },
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />

        <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionReveal immediate delay={0.2} className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
                <Database className="h-4 w-4" />
                Prospect List Building
              </div>
            </SectionReveal>

            <SectionReveal immediate delay={0.4} className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                Custom
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-purple-400">
                  Prospect List Building
                </span>
                Service
              </h1>
            </SectionReveal>

            <SectionReveal immediate delay={0.6} className="mb-8 mx-auto max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                We research, filter, and match companies against your targeting criteria—so you receive a database built for your exact requirements, not just volume.
              </p>
            </SectionReveal>

            <SectionReveal immediate delay={0.8} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button asChild size="lg">
                <Link href="/free-consultation">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                <Link href="/b2b-lead-generation">See the Full System</Link>
              </Button>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* What makes it different */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              What Makes Our Lists Different
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Most list sellers give you volume. We give you criteria-matched research.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Target, title: "Criteria-First Research", description: "Every company is researched against the targeting criteria you provide." },
              { icon: Filter, title: "Multi-Criteria Filtering", description: "Industry, size, location, tech stack, and other signals narrow the list to real fits." },
              { icon: ShieldCheck, title: "Decision-Maker Contact Data", description: "Records with verified decision-maker details, not generic company inboxes." },
              { icon: FileSpreadsheet, title: "Database Quality", description: "Clean, deduplicated, and formatted for your CRM—ready for immediate use." },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={index}>
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-blue-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-blue-400" />
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

      {/* How lists are built */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.07),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              How Your Prospect List Is Built
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A transparent, repeatable process you can audit at every stage.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: 1, title: "ICP Definition", description: "We map your ideal customer: industries, size, geography, and buyer roles." },
              { step: 2, title: "Company Discovery", description: "We find real companies matching your ICP from trusted business sources." },
              { step: 3, title: "Qualification & Filtering", description: "Each company is scored and filtered against your ICP criteria." },
              { step: 4, title: "Verification & Delivery", description: "Contact data is verified and the clean list is delivered CRM-ready." },
            ].map((item, index) => (
              <StaggerItem key={index}>
                <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-blue-500/40 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4">
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
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.07),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              What You&apos;ll Receive
            </h2>
            <p className="text-xl text-slate-400">
              A qualified database, not a spreadsheet of random companies.
            </p>
          </SectionReveal>

          <SectionReveal>
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: Building2, label: "ICP-qualified companies" },
                    { icon: Users, label: "Decision-maker contacts" },
                    { icon: Search, label: "Verified business emails" },
                    { icon: TrendingUp, label: "Company size & industry data" },
                    { icon: Zap, label: "Growth & fit signals" },
                    { icon: FileSpreadsheet, label: "CRM-ready spreadsheet" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-blue-400" />
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

      {/* Why choose us */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Ten years of building B2B prospect databases—with the proof to show it.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Multi-Step Validation", description: "Each record passes format, domain, and role checks, with unverifiable records flagged." },
              { icon: Filter, title: "Research Built From Your Criteria", description: "Companies are matched against the requirements you provide, not a generic template." },
              { icon: TrendingUp, title: "Proven Track Record", description: "190+ projects and a 100% Job Success Score across US, UK, and AU markets." },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={index}>
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-blue-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-blue-400" />
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Frequently Asked Questions
            </h2>
          </SectionReveal>

          <div className="space-y-6">
            {faqs.map((item, index) => (
              <SectionReveal key={item.q} delay={index * 0.05}>
                <Card className="border-white/10 bg-white/5 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300">
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
        accent={{ chip: "bg-blue-500/15 text-blue-400", border: "hover:border-blue-500/40", text: "group-hover:text-blue-400" }}
        guides={[
          {
            href: "/blog/how-to-build-b2b-prospect-lists",
            title: "How to Build B2B Prospect Lists That Convert",
            description: "Research, filtering, qualification, and verification — the four steps that turn a spreadsheet into a sales asset.",
          },
          {
            href: "/blog/sales-prospecting-playbook",
            title: "The B2B Sales Prospecting Playbook",
            description: "Find, qualify, and prioritize accounts that match your ICP so your outbound pipeline starts with real opportunities.",
          },
          {
            href: "/blog/how-to-build-a-clean-b2b-lead-list-for-cold-email",
            title: "How to Build a Clean B2B Lead List for Cold Email",
            description: "Verified emails, deduplicated records, and the right decision makers — built for deliverability and replies.",
          },
        ]}
      />

      {/* CTA */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,85,247,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Get a Sample of Your Prospect List
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              See the quality of a qualified, verified prospect list built for your ICP—free, before you commit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button asChild size="lg">
                <Link href="/free-consultation">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                <Link href="/contact-enrichment">Explore Contact Enrichment</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
