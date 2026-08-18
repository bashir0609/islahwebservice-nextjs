"use client";

import Link from "next/link";
import {
  Building2,
  Users,
  ArrowRight,
  CheckCircle2,
  Globe2,
  MapPin,
  ShieldCheck,
  Mail,
  Star,
  Award,
  ChevronRight,
  Target,
  Search,
  Database,
  FileSpreadsheet,
  Filter,
  ClipboardCheck,
  BadgeCheck,
  TrendingUp,
  Briefcase,
} from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HeroVisual from "@/components/site/hero-visual";

const faqs = [
  {
    q: "What does Islah Web Service provide?",
    a: "We provide B2B prospect research and sales intelligence data. Clients tell us which companies and decision-makers they want to reach, and we deliver a customized, verified, CRM-ready prospect list built around those criteria.",
  },
  {
    q: "Do you run cold email campaigns or book meetings?",
    a: "No. We specialize in the research and data stage of outbound sales. We identify target companies, find relevant decision-makers, enrich and verify contact data, and deliver the researched prospect list in a CRM-ready format. Your team or outreach partner controls messaging, campaign execution, meetings, and sales.",
  },
  {
    q: "Can you help refine my targeting criteria?",
    a: "Yes. If your requirements are incomplete, we help clarify targeting criteria, suggest useful research filters, identify missing data requirements, explain which criteria can realistically be researched, and translate a general target market into an executable research brief.",
  },
  {
    q: "What company criteria can you research?",
    a: "Almost any realistically researchable requirement: industry, category, country, state, city, postal code, radius, employee count, revenue range, technologies used, CRM or software, funding stage and dates, hiring activity, office locations, property ownership, certifications, website characteristics, growth signals, and more.",
  },
  {
    q: "Which decision-maker titles can you find?",
    a: "You specify the functions or titles that matter to you—CEO, founder, CFO, VP of Sales, IT director, operations director, property manager, HR director, and many others. We find current people matching those requirements and verify names, roles, seniority, and employment status.",
  },
  {
    q: "What fields can be included?",
    a: "Full name, current job title, seniority, business email, LinkedIn profile, direct phone where legitimately available, company telephone, website, location, employee count, revenue, industry, technologies, funding information, and any other client-requested fields.",
  },
  {
    q: "Can you enrich an existing database?",
    a: "Yes. You can submit an existing list or CRM export and we fill missing fields, add contact discovery, verify emails, update job titles, deduplicate, complete company data, standardize records, and reformat for your CRM.",
  },
  {
    q: "How do you verify business emails?",
    a: "We use multi-source checks including format validation, domain verification, and inbox-level verification where available. Records are classified by verification status, and catch-all or uncertain addresses are clearly marked. Email status can change after verification.",
  },
  {
    q: "Can you guarantee a specific bounce rate?",
    a: "No. We verify each record against the checks available at the time, but email campaign behavior, sending infrastructure, catch-all domains, data age, and client activity can affect final bounce rates. We deliver verified, clean data—not a campaign performance guarantee.",
  },
  {
    q: "What format will I receive?",
    a: "CSV, Excel, or Google Sheets, with custom column formatting to match your CRM or workflow. We also deduplicate, standardize, and quality-check records before delivery.",
  },
  {
    q: "Which countries and industries can you research?",
    a: "We regularly research the USA, UK, and Australia across industries including manufacturing, real estate, SaaS, healthcare, MSP/IT services, recruitment, and professional services. Custom requirements in other markets are scoped on request.",
  },
  {
    q: "How long does a project take?",
    a: "Most projects deliver an initial verified prospect list within 5–10 business days, depending on target industry, geography, list size, and research complexity. Larger or multi-segment projects are scoped and delivered in phases.",
  },
  {
    q: "Do you use AI or automation?",
    a: "Yes, as a supporting method. We use tools like Clay, n8n, APIs, enrichment and verification tools, and custom scripts to improve research efficiency and consistency—always combined with human quality review. We are a research service, not a software platform.",
  },
  {
    q: "Can you work with unusual custom requirements?",
    a: "Yes. Handling unusual, multi-layered research criteria is one of our strongest differentiators—from property portfolios and association memberships to tech-stack and funding combinations. If a criterion is realistically researchable, we can build around it.",
  },
];

const coreServices = [
  {
    href: "/b2b-prospect-research",
    icon: Building2,
    tint: "bg-blue-500/15 text-blue-400",
    title: "Company Research",
    description: "Companies researched against your exact criteria—industry, geography, size, tech, funding, and more.",
  },
  {
    href: "/b2b-prospect-research",
    icon: Users,
    tint: "bg-orange-500/15 text-orange-400",
    title: "Decision-Maker Research",
    description: "Current people matching your requested titles and responsibilities, with roles and seniority verified.",
  },
  {
    href: "/b2b-prospect-research",
    icon: Mail,
    tint: "bg-emerald-500/15 text-emerald-400",
    title: "Contact Enrichment",
    description: "Business emails, LinkedIn profiles, titles, and company fields added to your records.",
  },
  {
    href: "/b2b-prospect-research",
    icon: ShieldCheck,
    tint: "bg-rose-500/15 text-rose-400",
    title: "Email Verification & Data Cleaning",
    description: "Verification, deduplication, standardization, and missing-field checks so records are clean and current.",
  },
  {
    href: "/b2b-prospect-research",
    icon: FileSpreadsheet,
    tint: "bg-cyan-500/15 text-cyan-400",
    title: "CRM-Ready Delivery",
    description: "CSV, Excel, or Google Sheets delivery with custom column formatting matched to your CRM.",
  },
  {
    href: "/contact-enrichment",
    icon: Database,
    tint: "bg-purple-500/15 text-purple-400",
    title: "Existing Database Enrichment",
    description: "Already have a list? We complete missing fields, verify emails, deduplicate, and clean your data.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Share Your Target Criteria",
    desc: "Provide your existing ICP, target account description, geography, company characteristics, desired titles, and required fields.",
  },
  {
    step: "02",
    title: "Refine the Research Brief",
    desc: "We clarify ambiguous criteria, confirm available data sources, define exclusions, and agree on the final deliverable.",
  },
  {
    step: "03",
    title: "Research Target Companies",
    desc: "We find companies matching the approved criteria using relevant business sources.",
  },
  {
    step: "04",
    title: "Identify Decision-Makers",
    desc: "We locate and verify people matching your requested roles or responsibilities.",
  },
  {
    step: "05",
    title: "Enrich and Verify the Data",
    desc: "We add contact details, company fields, LinkedIn profiles, and emails, validating across sources.",
  },
  {
    step: "06",
    title: "Clean and Deliver",
    desc: "We deduplicate, standardize, quality-check, and deliver the prospect list in your required format.",
  },
];

const whyChoose = [
  { icon: Search, title: "Research Built From Your Requirements", description: "Every prospect list starts from your criteria, not a generic template." },
  { icon: Filter, title: "Complex Filters Handled", description: "Multi-layered, unusual criteria are a strength—not a limitation." },
  { icon: Users, title: "Human Review Supported by Technology", description: "Automation improves efficiency; people verify the final records." },
  { icon: Globe2, title: "Multi-Source Validation", description: "Records are checked and compared across relevant sources." },
  { icon: Target, title: "Decision-Maker-Level Records", description: "Named people with current roles, not generic company inboxes." },
  { icon: FileSpreadsheet, title: "Fresh, Project-Specific Research", description: "Data researched for your project, not recycled from stock lists." },
  { icon: Database, title: "Custom Fields & Formatting", description: "Columns, segmentation, and delivery format matched to your CRM-ready workflow." },
  { icon: ClipboardCheck, title: "Transparent Scope & Direct Communication", description: "Clear deliverables, agreed criteria, and a single point of contact." },
  { icon: ShieldCheck, title: "CRM-Ready Delivery", description: "Clean, deduplicated, standardized records ready to load and use." },
];

const proofPoints = [
  {
    icon: Award,
    value: "190+",
    label: "Projects Completed",
    detail: "B2B prospect research and data delivery projects.",
  },
  {
    icon: Star,
    value: "100%",
    label: "Job Success Score",
    detail: "Current Upwork Job Success Score maintained over time.",
  },
  {
    icon: MapPin,
    value: "US · UK · AU",
    label: "Markets Researched",
    detail: "Business data research across American, British, and Australian markets.",
  },
  {
    icon: Users,
    value: "Long-Term",
    label: "Client Relationships",
    detail: "Returning clients across lead lists, enrichment, and research projects.",
  },
];

const provenStats = [
  {
    icon: Award,
    value: "Since 2016",
    label: "Serving B2B Teams",
    detail: "Long-running prospect research and data delivery for B2B teams.",
  },
  ...proofPoints,
];

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950">
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
              <SectionReveal immediate delay={0.2} className="mb-5 sm:mb-6 flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-cyan-400">
                  <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-cyan-500" />
                  </span>
                  Custom Research · Verified Data · CRM-Ready Delivery
                </div>
              </SectionReveal>

              <SectionReveal immediate delay={0.4} className="mb-6 sm:mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl">
                  ICP-Matched Prospect Lists
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-teal-400">
                    Researched to Your Requirements
                  </span>
                </h1>
              </SectionReveal>

              <SectionReveal immediate delay={0.6} className="mb-8 sm:mb-10 mx-auto lg:mx-0 max-w-xl">
                <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                  We research the companies and decision-makers your sales team wants to reach based on your ICP, target geography, account criteria, required roles, and data fields, then deliver an ICP-matched, CRM-ready prospect list.
                </p>
              </SectionReveal>

              <SectionReveal immediate delay={0.8} className="mb-8 flex flex-col gap-4 sm:flex-row sm:gap-5 justify-center lg:justify-start">
                <Button asChild size="lg">
                  <Link href="/request-sample">
                    Request an ICP-Matched Sample
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white"
                >
                  <Link href="/request-sample">Discuss Your Target Criteria</Link>
                </Button>
              </SectionReveal>

              <SectionReveal immediate delay={1} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-400 lg:justify-start">
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
                  <span>USA, UK & AU Research</span>
                </div>
              </SectionReveal>
            </div>

            {/* Prospect database visual */}
            <SectionReveal immediate delay={0.3}>
              <HeroVisual />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Proof Bar */}
      <section className="relative overflow-hidden bg-slate-950 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.07),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <SectionReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {proofPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.label} className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                  <div className="flex items-center justify-center gap-1 text-cyan-400 mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{point.value}</div>
                  <div className="text-xs sm:text-sm text-slate-400">{point.label}</div>
                  <div className="mt-1 text-[11px] text-slate-500">{point.detail}</div>
                </div>
              );
            })}
          </SectionReveal>
        </div>
      </section>

      {/* Built Around Exact Targeting Criteria */}
      <section className="relative overflow-hidden bg-slate-950 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Your Target Market Is Specific.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                Your Prospect List Should Match Your ICP.
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              We do not sell a generic database. We research a new prospect list around your ICP, target geography, company criteria, decision-maker roles, and required fields.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Building2,
                title: "Manufacturing + Tech Stack",
                description: "Find manufacturing companies in Texas using NetSuite, with 50–250 employees, funded within the last 18 months—and identify the CFO or VP of Finance.",
              },
              {
                icon: MapPin,
                title: "Property Portfolios",
                description: "Find commercial property owners in Chicago that own more than five buildings and identify the person responsible for acquisitions.",
              },
              {
                icon: Users,
                title: "Hiring Signals",
                description: "Find companies using HubSpot that have recently hired SDRs and identify the relevant sales leader.",
              },
              {
                icon: Globe2,
                title: "Local Business Discovery",
                description: "Find local businesses from Google Maps within a specific radius, verify their websites, and identify the owner or marketing decision-maker.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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

      {/* Core Services */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(45,212,191,0.06),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              What We Deliver
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              One core service — B2B prospect research — across the full workflow: company research, decision-maker
              discovery, contact enrichment, verification, and CRM-ready data delivery. Not outreach, meeting
              booking, or campaign management.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <StaggerItem key={service.title}>
                  <Link href={service.href} className="group block h-full">
                    <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-xl ${service.tint} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-white group-hover:text-cyan-400 transition-colors">{service.title}</CardTitle>
                        <CardDescription className="text-slate-400 text-sm leading-relaxed">{service.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Industries We Support */}
      <section className="relative overflow-hidden bg-slate-900 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.08),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Industries We Support
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Different industries need different research criteria. See how our prospect research applies to your market.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { href: "/industries/saas", icon: TrendingUp, tint: "bg-purple-500/15 text-purple-400", title: "SaaS", description: "Criteria-matched companies, funding and growth signals, and revenue roles." },
              { href: "/industries/msp", icon: ShieldCheck, tint: "bg-cyan-500/15 text-cyan-400", title: "Managed Service Providers", description: "Local businesses researched by geography, size, and IT-related criteria." },
              { href: "/industries/recruitment", icon: Users, tint: "bg-orange-500/15 text-orange-400", title: "Recruitment", description: "Companies with open roles and hiring signals, matched to your verticals." },
              { href: "/industries/professional-services", icon: Briefcase, tint: "bg-emerald-500/15 text-emerald-400", title: "Professional Services", description: "Criteria-matched accounts for consultancies, agencies, and advisory firms." },
              { href: "/industries/real-estate", icon: Building2, tint: "bg-sky-500/15 text-sky-400", title: "Real Estate", description: "Property owners, investors, and managers researched by ownership, portfolio size, and asset type." },
            ].map((industry, index) => {
              const Icon = industry.icon;
              return (
                <StaggerItem key={industry.href} className="h-full">
                  <Link href={industry.href} className="group block h-full">
                    <Card className="h-full p-6 border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                      <CardHeader className="p-0">
                        <div className={`w-12 h-12 rounded-xl ${industry.tint} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-lg text-white mb-2 group-hover:text-cyan-400 transition-colors">{industry.title}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed text-slate-400">{industry.description}</CardDescription>
                      </CardHeader>
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

      {/* How the Process Works */}
      <section id="process" className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.07),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              How the Process Works
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A transparent six-step workflow from your criteria to a verified, CRM-ready database.
            </p>
          </SectionReveal>

          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 hidden -translate-y-1/2 border-t-2 border-dashed border-cyan-500/30 lg:block" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6 md:gap-6 lg:gap-4">
              {processSteps.map((item, index) => (
                <SectionReveal key={item.step} delay={index * 0.08}>
                  <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 p-4 md:p-6 text-center h-full backdrop-blur-sm">
                    <div className="text-cyan-400 text-xs font-semibold mb-2">STEP {item.step}</div>
                    <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    {item.step !== "06" && (
                      <ChevronRight className="absolute -right-4 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 rounded-full bg-cyan-600 text-white shadow-md lg:block" aria-hidden="true" />
                    )}
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What the Client Receives */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,212,191,0.08),transparent_55%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
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
                    { icon: Users, label: "Decision-maker names" },
                    { icon: Search, label: "Job titles & seniority" },
                    { icon: Mail, label: "Business emails (verified)" },
                    { icon: Globe2, label: "LinkedIn profiles" },
                    { icon: MapPin, label: "Phone numbers where available" },
                    { icon: Database, label: "Firmographic data" },
                    { icon: Target, label: "Technographic data where requested" },
                    { icon: ShieldCheck, label: "Funding or growth information" },
                    { icon: BadgeCheck, label: "Verification status" },
                    { icon: FileSpreadsheet, label: "Source or confidence fields" },
                    { icon: ClipboardCheck, label: "Custom columns & CRM-ready formatting" },
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

      {/* Proven Experience */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Proven Experience
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Years of prospect research and data delivery for B2B teams across US, UK, and Australian markets.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {provenStats.map((point, index) => {
              const Icon = point.icon;
              return (
                <StaggerItem key={point.label}>
                  <Card className="h-full text-center border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] transition-all duration-300">
                    <CardHeader>
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/15 flex items-center justify-center mb-4">
                        <Icon className="h-7 w-7 text-cyan-400" />
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-white mb-1">{point.value}</div>
                      <CardTitle className="text-sm font-medium text-slate-300">{point.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-400 leading-relaxed">{point.detail}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <SectionReveal delay={0.3} className="mt-12 text-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  title: "Long-Term Client, USA",
                  quote: "Bashir has been an instrumental part in our lead-generation efforts. He brings a wealth of knowledge around SEO and Email Marketing infrastructure and strategies. His team is professional and gets tasks done in a timely manner.",
                  meta: "3+ years of ongoing collaboration",
                },
                {
                  title: "Returning Client, USA",
                  quote: "Bashir worked on a lead generation project for me for several months. I plan to hire him again in the future if I need additional leads.",
                  meta: "Long-term repeat engagement",
                },
                {
                  title: "5-Star Client, USA",
                  quote: "Bashir is an excellent worker and I will hire him again.",
                  meta: "5.0 rating",
                },
              ].map((item, index) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400 mb-3" />
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">&ldquo;{item.quote}&rdquo;</p>
                  <div className="text-xs font-semibold text-cyan-400">{item.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{item.meta}</div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Selected Project Examples */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,212,191,0.08),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Selected Project Examples
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Research challenges we&apos;ve translated into verified, ICP-matched prospect lists.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SectionReveal delay={0}>
              <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">Managed IT Provider, USA</CardTitle>
                  <CardDescription className="text-cyan-400/80">Custom ICP-Matched Prospect List</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-slate-300 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Requirement: SMB decision-makers for a managed cybersecurity retainer program</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Delivered: 1,240 verified contacts with direct dials and validated emails</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Research: 50–500 employee companies in target metro areas, IT director and vCISO roles</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">Staffing Firm, UK</CardTitle>
                  <CardDescription className="text-cyan-400/80">CRM-Ready Prospect List</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-slate-300 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Requirement: companies with active engineering hiring</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Delivered: 1,100 researched organizations with hiring-manager contacts</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Formatting: structured for direct CRM import and used the same day</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>
          </div>

          <SectionReveal delay={0.3} className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/portfolio">
                View the Full Portfolio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </SectionReveal>
        </div>
      </section>

      {/* Why Clients Choose Us */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(45,212,191,0.08),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Why Clients Choose Islah Web Service
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Research built from your requirements, checked by humans, delivered clean.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChoose.map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/15 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-cyan-400" />
                      </div>
                      <CardTitle className="text-xl text-white">{item.title}</CardTitle>
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

      {/* Scope Clarification */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <SectionReveal>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              We Research the List. Your Team Controls the Outreach.
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Our responsibility is to research the right companies, identify the requested people, enrich and verify the records, and deliver clean data. Your messaging, outreach system, sales conversations, meetings, and closed deals remain under your team&apos;s control.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Free Sample CTA */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.15),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(45,212,191,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              See the Research Quality Before Starting a Full Project
            </h2>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Share your targeting criteria and receive a small sample showing the type of companies, contacts, verification fields, and formatting available for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/request-sample">
                  Request a Free 20-Record Sample
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
            <p className="mt-4 text-sm text-slate-400">Free sample · No obligation · Your criteria stay private</p>
          </SectionReveal>
        </div>
      </section>

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

      {/* FAQ */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.06),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Common questions about B2B prospect research, data verification, and project scope.
            </p>
          </SectionReveal>

          <div className="space-y-6">
            {faqs.map((item, index) => (
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
    </main>
  );
}
