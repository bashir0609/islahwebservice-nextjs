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
                      More Sales Appointments.
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                        More Qualified Leads. More Revenue.
                      </span>
                    </h1>
                  </SectionReveal>

                  <SectionReveal delay={0.6} className="mb-8 sm:mb-12 max-w-3xl mx-auto">
                    <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                      We build AI-powered lead generation systems that automatically discover, verify, enrich, and prepare qualified prospects for cold outreach—so your sales team spends time closing deals, not searching for prospects.
                    </p>
                  </SectionReveal>

                  <SectionReveal delay={0.8} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                    <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white w-full sm:w-auto">
                      <Link href="/contact">
                        Claim Your Free AI Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900 w-full sm:w-auto">
                      <Link href="#how-it-works">See How It Works</Link>
                    </Button>
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
              One System. Complete Lead Generation.
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Stop buying contact lists. We build an AI-powered system that continuously finds, verifies, enriches, and qualifies prospects for your outreach campaigns.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SectionReveal delay={0}>
              <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Globe2 className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    Google Maps + Website Extraction
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <CardDescription className="text-base leading-relaxed mb-6">
                    We scrape Google Maps and company websites to discover real businesses in your target market—not generic databases or recycled lists.
                  </CardDescription>
                  <Link href="/services/verified-b2b-contact-lists" className="inline-flex items-center text-cyan-600 dark:text-cyan-400 font-medium hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    AI Analysis + ICP Filtering
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                                  <CardDescription className="text-base leading-relaxed mb-6">
                                     Our AI analyzes each prospect, filters by your ideal customer profile, and ranks leads by conversion potential—so you only reach out to the best fits.
                                  </CardDescription>
                                  <Link href="/services/lead-generation-analysis" className="inline-flex items-center text-cyan-600 dark:text-cyan-400 font-medium hover:gap-2 transition-all">
                                    Learn more
                                    <ArrowRight className="h-4 w-4 ml-1" />
                                  </Link>
                                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.4}>
              <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Wrench className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    Automated Outreach + Follow-Up
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                                  <CardDescription className="text-base leading-relaxed mb-6">
                                     Personalized cold email sequences, automated follow-ups, and CRM-ready workflows that turn leads into booked meetings on autopilot.
                                  </CardDescription>
                                  <Link href="/services/business-process-automation" className="inline-flex items-center text-cyan-600 dark:text-cyan-400 font-medium hover:gap-2 transition-all">
                                    Learn more
                                    <ArrowRight className="h-4 w-4 ml-1" />
                                  </Link>
                                </CardContent>
              </Card>
            </SectionReveal>
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

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              A simple workflow to go from business goals to qualified B2B contacts and automated follow-up processes.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Audit",
                description: "We analyze your market, competitors, and current outreach to build a custom lead generation strategy for your business.",
              },
              {
                step: "02",
                title: "Build Your Lead System",
                description: "We extract, enrich, and validate contact data from Google Maps, company websites, and B2B datasets—tailored to your ICP.",
              },
              {
                step: "03",
                title: "Automate & Scale Outreach",
                description: "Deploy personalized email sequences, follow-up workflows, and CRM automation that turns contacts into booked meetings.",
              },
            ].map((item, index) => (
              <SectionReveal key={item.step} delay={index * 0.15}>
                <Card className="h-full border-2 border-dashed border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <div className="text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-2">STEP {item.step}</div>
                    <CardTitle className="text-2xl">{item.title}</CardTitle>
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

      {/* Stats Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-cyan-100 dark:bg-cyan-900/30 rounded-2xl flex items-center justify-center">
                <Users className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                50K+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Business Contacts
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-cyan-100 dark:bg-cyan-900/30 rounded-2xl flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                95%
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Lead Accuracy
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-cyan-100 dark:bg-cyan-900/30 rounded-2xl flex items-center justify-center">
                <Wrench className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                80%
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Automation Efficiency
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-cyan-100 dark:bg-cyan-900/30 rounded-2xl flex items-center justify-center">
                <Building2 className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                24/7
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Data Refresh
              </div>
            </div>
          </SectionReveal>
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
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Claim your free AI lead generation audit today. We'll show you exactly how to build a system that delivers consistent, qualified prospects to your sales team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                <Link href="/contact">
                  Claim Your Free Audit
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
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
