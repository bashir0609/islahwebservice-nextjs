"use client";

import Link from "next/link";
import {
  Building2,
  Landmark,
  Users,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Briefcase,
  Search,
  MapPin,
} from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/site/related-guides";

const propertyCriteria = [
  "City · state · ZIP · geographic radius",
  "Asset type — office, retail, industrial, multifamily, hospitality, mixed-use",
  "Property count & portfolio size",
  "Number of buildings & estimated property size where researchable",
  "Ownership entity & property-management company",
  "Recent ownership changes where researchable",
];

const companyCriteria = [
  "Company type — owner, investor, operator, manager, broker, PropTech",
  "Industry · employee size · revenue",
  "Geography & number of locations",
  "Technology usage & hiring activity",
  "Growth indicators & client-defined criteria",
];

const decisionMakerRoles = [
  "Owner · Principal · Managing Partner · Founder · President",
  "Director of Acquisitions · VP of Acquisitions · Acquisition Manager",
  "Asset Manager · Director of Asset Management",
  "Property Manager · Regional Property Manager · Director of Property Management",
  "Operations Director · Facilities Director",
  "Development Director · Managing Director · Investment Director",
];

export default function RealEstateIndustryPage() {
  const faqs = [
    {
      q: "What types of real estate companies can you research?",
      a: "Commercial property owners, investors, operators, property-management companies, CRE brokers, PropTech companies, building-service and facilities-management providers, construction-related businesses, and other client-defined organizations.",
    },
    {
      q: "Can you research property ownership?",
      a: "Ownership information can be researched where reliable sources are available. We confirm what is verifiable for each property or portfolio and flag records that cannot be confirmed.",
    },
    {
      q: "Can you find companies based on portfolio size?",
      a: "Yes — portfolio and property-count criteria (such as number of buildings or units) can be used when the necessary information is publicly or commercially researchable.",
    },
    {
      q: "Can you find acquisition managers and property managers?",
      a: "Yes, when those roles can be identified and verified at the target organization. We research people matching the roles, functions, and seniority levels specified in your project brief.",
    },
    {
      q: "Can you research companies in a specific geographic radius?",
      a: "Yes, depending on the available property and business data for the area. City, state, ZIP, and radius criteria are standard filters.",
    },
    {
      q: "Do you provide homeowner or consumer real estate leads?",
      a: "No. Our research focuses on B2B and commercial property organizations — owners, investors, operators, and property-management companies. We do not provide homeowner, buyer, seller, or mortgage leads.",
    },
    {
      q: "Do you contact the prospects?",
      a: "No. Islah researches and delivers the prospect data. The client controls outreach and sales execution — we build the data, your team controls the outreach.",
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
            name: "Real Estate Lead Generation",
            serviceType: "B2B Prospect Research",
            description:
              "Real estate lead generation built on property and company research: property owners, investors, operators, managers, and other real estate organizations researched against your property and company criteria, with relevant decision-makers identified and verified.",
            provider: { "@type": "Organization", name: "Islah Web Service", url: "https://www.islahwebservice.com" },
            areaServed: ["US", "GB", "AU"],
            url: "https://www.islahwebservice.com/industries/real-estate",
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
              { "@type": "ListItem", position: 3, name: "Real Estate Lead Generation", item: "https://www.islahwebservice.com/industries/real-estate" },
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(45,212,191,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl animate-pulse" />

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionReveal immediate delay={0.2} className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm text-sky-400">
                <Building2 className="h-4 w-4" />
                For Real Estate & Property Organizations
              </div>
            </SectionReveal>

            <SectionReveal immediate delay={0.4} className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                Real Estate Lead Generation
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-400 to-cyan-400">
                  Built on Property and Company Research
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal immediate delay={0.6} className="mb-8 mx-auto max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                We research property owners, real estate companies, investors, operators, managers, and other
                target organizations using your specific property and company criteria, then identify relevant
                decision-makers and deliver verified, CRM-ready prospect data.
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(56,189,248,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Property and Company Research Built Around Your Criteria
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              We deliver criteria-matched property owners and companies — not claims about need or readiness to buy.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: "Property-based criteria", description: "Location, asset type, property count, portfolio size, and ownership characteristics researched where reliable sources exist." },
              { icon: Building2, title: "Company research", description: "Owners, investors, operators, managers, and brokers matched to your company and portfolio criteria." },
              { icon: Users, title: "Decision-maker discovery", description: "Acquisition, asset-management, and property-management roles identified and verified by current title." },
              { icon: Landmark, title: "Ownership research", description: "Owner entities and property-management companies identified where ownership information is publicly researchable." },
              { icon: Search, title: "Client-defined signals", description: "Technology usage, hiring activity, growth, and other indicators you specify — never treated as purchase intent." },
              { icon: ShieldCheck, title: "Verified, CRM-ready data", description: "Contact data enriched and business emails verified where available, formatted for your CRM and sales workflow." },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={index}>
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-sky-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-sky-500/15 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-sky-400" />
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

      {/* Custom research examples */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.07),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Custom Research Combinations
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Projects can combine property criteria, company criteria, and requested roles — here are the kinds of
              briefs we build around:
            </p>
          </SectionReveal>

          <div className="space-y-6">
            {[
              {
                title: "Portfolio owners in a target market",
                text: "Find commercial property owners in Chicago that own more than five buildings, then identify the person responsible for acquisitions or asset management.",
              },
              {
                title: "Multifamily operators by unit count",
                text: "Find multifamily property-management companies operating more than 1,000 units in selected US states and identify operations or property-management leadership.",
              },
              {
                title: "PropTech targets by technology",
                text: "Find commercial real estate firms using a specified property-management technology and identify relevant operations or technology contacts.",
              },
            ].map((item, index) => (
              <SectionReveal key={item.title} delay={index * 0.08}>
                <Card className="border-white/10 bg-white/5 backdrop-blur-sm hover:border-sky-500/40 transition-all duration-300">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/15 flex items-center justify-center flex-shrink-0">
                      <Search className="h-5 w-5 text-sky-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{item.text}</p>
                    </div>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Criteria + roles */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.06),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SectionReveal>
              <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-white mb-3 flex items-center gap-3">
                    <Building2 className="h-6 w-6 text-sky-400" />
                    Property & Company Research Criteria
                  </CardTitle>
                  <CardDescription className="text-base text-slate-400 leading-relaxed">
                    Example criteria real estate clients request — we confirm what is realistically researchable for each:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Property criteria</div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-slate-300">
                      {propertyCriteria.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-sky-400 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Company criteria</div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-slate-300">
                      {companyCriteria.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-sky-400 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-white mb-3 flex items-center gap-3">
                    <Users className="h-6 w-6 text-sky-400" />
                    Decision-Maker Roles
                  </CardTitle>
                  <CardDescription className="text-base text-slate-400 leading-relaxed">
                    Titles vary by organization — we research people matching the roles, functions, and seniority
                    levels specified in your project brief:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5 text-sm text-slate-300">
                    {decisionMakerRoles.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-sky-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                    We deliver criteria-matched property owners and target accounts showing client-defined property
                    signals — we do not claim that a person controls the budget, is the sole buyer, or is ready to
                    purchase.
                  </p>
                </CardContent>
              </Card>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(56,189,248,0.06),transparent_55%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              How a Real Estate Research Project Runs
            </h2>
            <p className="text-xl text-slate-400">
              The same core B2B prospect research workflow, applied to property and company criteria.
            </p>
          </SectionReveal>

          <div className="space-y-4">
            {[
              "Share your real estate targeting criteria",
              "Refine the research requirements",
              "Research matching properties and companies",
              "Identify requested decision-makers",
              "Enrich and verify contact data",
              "Clean and deliver CRM-ready records",
            ].map((step, index) => (
              <SectionReveal key={step} delay={index * 0.06}>
                <Card className="border-white/10 bg-white/5 backdrop-blur-sm hover:border-sky-500/40 transition-all duration-300">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/15 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-sky-400">{index + 1}</span>
                    </div>
                    <span className="text-slate-300 text-base leading-relaxed">{step}</span>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.07),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              What You&apos;ll Receive
            </h2>
            <p className="text-xl text-slate-400">
              A verified, CRM-ready prospect database built around your property and company criteria.
            </p>
          </SectionReveal>

          <SectionReveal>
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <div className="space-y-4">
                  {[
                    "Company or ownership entity, website, and property information where researchable",
                    "Property address, city, state, ZIP, asset type, and portfolio size",
                    "Owner entity and property-management company details",
                    "Decision-maker, current title, business email, and LinkedIn where available",
                    "Verification status, source field, and custom research fields",
                    "CRM-ready formatting in CSV, Excel, or Google Sheets",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-sky-400 mt-0.5 flex-shrink-0" />
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
                <Link href="/portfolio/property-management-prospect-list">See the Real Estate Case Study</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.06),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </SectionReveal>

          <div className="space-y-6">
            {faqs.map((item, index) => (
              <SectionReveal key={item.q} delay={index * 0.05}>
                <Card className="border-white/10 bg-white/5 backdrop-blur-sm hover:border-sky-500/40 transition-all duration-300">
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Other Industries We Research
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { href: "/industries/saas", title: "SaaS Companies", icon: TrendingUp },
              { href: "/industries/msp", title: "Managed Service Providers", icon: ShieldCheck },
              { href: "/industries/recruitment", title: "Recruitment Firms", icon: Users },
              { href: "/industries/professional-services", title: "Professional Services", icon: Briefcase },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <SectionReveal key={item.href} delay={index * 0.1}>
                  <Link href={item.href} className="group block">
                    <Card className="h-full p-6 border-white/10 bg-white/5 backdrop-blur-sm hover:border-sky-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-500/15 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-sky-400" />
                        </div>
                        <CardTitle className="text-lg text-white group-hover:text-sky-400 transition-colors">
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
              See how our property and company research applies to real estate organizations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* Related guides */}
      <RelatedGuides
        tone="950"
        accent={{ chip: "bg-sky-500/15 text-sky-400", border: "hover:border-sky-500/40", text: "group-hover:text-sky-400" }}
        guides={[
          {
            href: "/blog/how-to-research-recently-funded-companies",
            title: "How to Research Recently Funded Companies",
            description: "Using funding stage and date as research filters for criteria-matched accounts.",
          },
          {
            href: "/blog/how-to-find-decision-makers-in-b2b-companies",
            title: "How to Find Decision Makers in B2B Companies",
            description: "Mapping roles, functions, and seniority — and what research can and cannot confirm.",
          },
          {
            href: "/blog/how-to-build-b2b-prospect-lists",
            title: "How to Build Targeted B2B Prospect Lists",
            description: "Research, filtering, and verification — the steps that turn a spreadsheet into a sales asset.",
          },
        ]}
      />
    </main>
  );
}
