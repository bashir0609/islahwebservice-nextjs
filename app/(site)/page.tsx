"use client";

import Link from "next/link";
import Image from "next/image";
import { Building2, TrendingUp, Wrench, Users, ArrowRight, CheckCircle2, Globe2, MapPin, ShieldCheck, Mail, Phone, Star, Award } from "lucide-react";
import { SectionReveal } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center">
                  <SectionReveal delay={0.2} className="mb-4 sm:mb-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-cyan-400">
                      <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-cyan-500" />
                      </span>
                      ACCEPTING NEW CLIENTS — Limited Availability
                    </div>
                  </SectionReveal>

                  <SectionReveal delay={0.4} className="mb-6 sm:mb-8">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                      AI-Powered Lead Generation Systems That Deliver
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                        Qualified B2B Prospects Every Week
                      </span>
                    </h1>
                  </SectionReveal>

                  <SectionReveal delay={0.6} className="mb-8 sm:mb-12 max-w-3xl mx-auto">
                    <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                      We build automated systems that find, verify, enrich, and prepare sales-ready leads—so your sales team spends time closing deals, not searching for prospects.
                    </p>
                  </SectionReveal>

                  <SectionReveal delay={0.8} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8">
                    <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white w-full sm:w-auto">
                      <Link href="/contact">
                        Book a Free Strategy Call
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" className="bg-transparent border border-white text-white hover:bg-white hover:text-slate-900 w-full sm:w-auto">
                      <Link href="#process">See Our Process</Link>
                    </Button>
                  </SectionReveal>

                  <SectionReveal delay={1} className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
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
              </div>

              {/* Floating Elements - hidden on mobile for performance */}
              <div className="hidden md:block absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />
              </div>
            </section>

      {/* Proof Bar */}
      <section className="py-12 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">190+</div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Projects Completed</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-cyan-600 dark:text-cyan-400 mb-2">
                <Award className="h-5 w-5" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">100%</div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Job Success Score</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 mb-2">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">USA, UK & AU</div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Markets Served</div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Services Overview */}

      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              One Complete Lead Generation System
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Stop buying disconnected lists. Our end-to-end system finds the right companies, enriches contacts, qualifies prospects, and prepares outreach-ready leads for your sales team.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SectionReveal delay={0}>
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                    <Globe2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Find & Extract</CardTitle>
                  <CardDescription>Discover real businesses from Google Maps and company websites—not generic databases.</CardDescription>
                </CardHeader>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>AI Qualification</CardTitle>
                  <CardDescription>Analyze prospects, filter by your ICP, and rank leads by conversion potential.</CardDescription>
                </CardHeader>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                    <Wrench className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle>Outreach & Automation</CardTitle>
                  <CardDescription>Deploy personalized email sequences, follow-ups, and CRM-ready workflows.</CardDescription>
                </CardHeader>
              </Card>
            </SectionReveal>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white">
              <Link href="/services">
                See Full System
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Irresistible Offer */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-600 dark:text-emerald-400 mb-6">
              <CheckCircle2 className="h-4 w-4" />
              Limited-Time Offer
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Free AI Lead Generation Audit
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Get a personalized audit of your current lead generation process. We'll show you exactly where you're losing prospects and build a custom AI system to fix it—100% free.
            </p>
          </SectionReveal>

          <SectionReveal>
            <Card className="border-2 border-cyan-200 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-950/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center">What You'll Get</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    "Complete audit of your current lead sources",
                    "AI-powered analysis of your ideal customer profile",
                    "Custom roadmap to 2x qualified leads in 30 days",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white w-full sm:w-auto">
                    <Link href="/contact">
                      Claim Your Free Audit
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">No credit card required. 15-minute strategy session.</p>
                </div>
              </CardContent>
            </Card>
          </SectionReveal>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose Islah Web Service
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
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
                <Card className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Process */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              A simple workflow to go from business goals to qualified B2B contacts and automated follow-up processes.
            </p>
          </SectionReveal>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-2">
              {[
                { step: "01", title: "Target Market", desc: "Define your ideal customer profile and target industries." },
                { step: "02", title: "Google Maps", desc: "Discover real businesses in your target locations." },
                { step: "03", title: "Website Analysis", desc: "Extract contact data from company websites." },
                { step: "04", title: "AI Qualification", desc: "Filter leads by conversion potential and fit." },
                { step: "05", title: "Contact Enrichment", desc: "Validate emails, phone numbers, and decision-makers." },
                { step: "06", title: "Personalized Outreach", desc: "Create custom cold email sequences per prospect." },
                { step: "07", title: "CRM Delivery", desc: "Sync everything into your CRM and outreach stack." },
              ].map((item, index) => (
                <SectionReveal key={item.step} delay={index * 0.08}>
                  <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4 md:p-6 text-center h-full">
                    <div className="text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-2">STEP {item.step}</div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{item.title}</div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Case Studies */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Measurable Client Results
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Real outcomes from recent lead generation and outreach projects.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SectionReveal delay={0}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Local Marketing Agency, USA</CardTitle>
                  <CardDescription>Verified Prospect List Delivery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-slate-700 dark:text-slate-300">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Needed: 5,000 verified prospects</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Delivered: 5,600 verified contacts</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Bounce rate: under 2%</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Campaign launched in 3 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>SaaS Startup, UK</CardTitle>
                  <CardDescription>Automated Lead Sourcing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-slate-700 dark:text-slate-300">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Built automated lead sourcing workflow</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Reduced manual research by 80%</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Saved 20+ hours per week</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
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
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Client Success Stories
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Real feedback from clients who trusted Islah Web Service with lead generation, research, and outreach-ready data.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SectionReveal delay={0}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>B2B Lead Generation</CardTitle>
                  <CardDescription>Upwork Client, USA</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    "Bashir has been an instrumental part in our lead-generation efforts. He brings a wealth of knowledge around SEO and Email Marketing infrastructure and strategies. His team is professional and gets tasks done in a timeline manner."
                  </p>
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">3+ years of ongoing collaboration</span>
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Prospect Lists</CardTitle>
                  <CardDescription>Upwork Client, USA</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    "Bashir is an excellent worker and I will hire him again."
                  </p>
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">5.0 rating</span>
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Lead Generation & Virtual Assistant</CardTitle>
                  <CardDescription>Upwork Client, USA</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    "It has been a pleasure working with Bashir. The only reason we're stopping this contract is that we are moving to a new larger contract. Looking forward to working with him again."
                  </p>
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Upgraded to a larger contract</span>
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.3}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Email & Lead Outreach</CardTitle>
                  <CardDescription>Upwork Client, USA</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    "Bashir worked on a lead generation project for me for several months. I plan to hire him again in the future if I need additional leads."
                  </p>
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Long-term repeat engagement</span>
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
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
            ].map((item, index) => (
              <SectionReveal key={item.q} delay={index * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.q}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.a}</p>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-teal-600/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to 2x Your Qualified Leads?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-4 max-w-2xl mx-auto">
              Book a free lead generation strategy call. We'll show you exactly how to build a system that delivers consistent, qualified prospects to your sales team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                <Link href="/contact">
                  Book a Free Strategy Call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-slate-900 dark:text-white border-slate-300 dark:border-slate-700">
                <Link href="mailto:hello@islahwebservice.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Us
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Free consultation · No obligation · Sample data available</p>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
