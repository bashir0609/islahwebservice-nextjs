"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Building2, TrendingUp, Wrench, Users, ArrowRight, ChevronRight } from "lucide-react";
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
                      Trusted B2B Solutions Partner
                    </div>
                  </SectionReveal>

                  <SectionReveal delay={0.4} className="mb-6 sm:mb-8">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                      Transform Business
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                        Through Data
                      </span>
                    </h1>
                  </SectionReveal>

                  <SectionReveal delay={0.6} className="mb-8 sm:mb-12 max-w-3xl mx-auto">
                    <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                      Professional B2B services: Verified Contact Lists, Lead Generation Analysis, and Business Process Automation for enterprise growth.
                    </p>
                  </SectionReveal>

                  <SectionReveal delay={0.8} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                    <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white w-full sm:w-auto">
                      <Link href="/services">
                        Explore Services
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900 w-full sm:w-auto">
                      <Link href="/contact">Get in Touch</Link>
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

      {/* Services Overview */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Our Core Services
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Comprehensive B2B solutions designed to accelerate your business growth and operational excellence.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SectionReveal delay={0}>
              <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    Verified B2B Contact Lists
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <CardDescription className="text-base leading-relaxed mb-6">
                    We build contact lists from your target criteria using Google Maps extraction, ICP research, and website-based enrichment—no generic databases, no recycled lists.
                  </CardDescription>
                  <Link href="/services/verified-b2b-contact-lists" className="inline-flex items-center text-cyan-600 dark:text-cyan-400 font-medium hover:gap-2 transition-all">
                    Learn more
                    <ChevronRight className="h-4 w-4 ml-1" />
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
                    Lead Generation Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                                  <CardDescription className="text-base leading-relaxed mb-6">
                                     Advanced analytics and AI-driven insights to identify, qualify, and track high-value leads with conversion optimization.
                                  </CardDescription>
                                  <Link href="/services/lead-generation-analysis" className="inline-flex items-center text-cyan-600 dark:text-cyan-400 font-medium hover:gap-2 transition-all">
                                    Learn more
                                    <ChevronRight className="h-4 w-4 ml-1" />
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
                    Business Process Automation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                                  <CardDescription className="text-base leading-relaxed mb-6">
                                     End-to-end automation of recurring processes, reducing manual effort by up to 80% and improving accuracy.
                                  </CardDescription>
                                  <Link href="/services/business-process-automation" className="inline-flex items-center text-cyan-600 dark:text-cyan-400 font-medium hover:gap-2 transition-all">
                                    Learn more
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                  </Link>
                                </CardContent>
              </Card>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Explore Our Services */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Explore Each Service
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Dive deeper into our specialized B2B solutions and discover how they can transform your business.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <SectionReveal delay={0}>
              <Card className="group h-full flex flex-col p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl mb-3">Verified B2B Contact Lists</CardTitle>
                <CardDescription className="text-base leading-relaxed mb-6 flex-grow">
                  Custom-built contact lists from Google Maps and company websites with ICP research and enrichment.
                </CardDescription>
                <Link href="/services/verified-b2b-contact-lists" className="inline-flex items-center text-cyan-600 dark:text-cyan-400 font-medium hover:gap-2 transition-all mt-auto">
                  Learn more
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <Card className="group h-full flex flex-col p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl mb-3">Lead Generation Analysis</CardTitle>
                <CardDescription className="text-base leading-relaxed mb-6 flex-grow">
                  AI-driven insights, predictive scoring, and real-time pipeline analytics to convert data into qualified opportunities.
                </CardDescription>
                <Link href="/services/lead-generation-analysis" className="inline-flex items-center text-cyan-600 dark:text-cyan-400 font-medium hover:gap-2 transition-all mt-auto">
                  Learn more
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.4}>
              <Card className="group h-full flex flex-col p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Wrench className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl mb-3">Business Process Automation</CardTitle>
                <CardDescription className="text-base leading-relaxed mb-6 flex-grow">
                  End-to-end automation of recurring processes, reducing manual effort by up to 80% and improving accuracy.
                </CardDescription>
                <Link href="/services/business-process-automation" className="inline-flex items-center text-cyan-600 dark:text-cyan-400 font-medium hover:gap-2 transition-all mt-auto">
                  Learn more
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Card>
            </SectionReveal>
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

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-teal-600/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to Transform Your B2B Operations?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Let's discuss how our verified contact lists, lead generation analytics, and process automation can drive your business forward.
            </p>
            <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white">
              <Link href="/contact">
                Start Your Transformation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}