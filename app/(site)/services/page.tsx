"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Users,
  MapPin,
  TrendingUp,
  Target,
  BarChart3,
  Wrench,
  Settings,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  PencilRuler,
  ClipboardCheck,
  Rocket
} from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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
                Professional B2B Services
              </div>
            </SectionReveal>

            <SectionReveal delay={0.4} className="mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                Services That Drive
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                  Real Results
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal delay={0.6} className="mb-8 sm:mb-12 max-w-3xl mx-auto">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                From verified contact lists to intelligent process automation, we deliver tailored solutions that transform your B2B operations.
              </p>
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

      {/* Services Detail */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              What We Offer
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Specialized services designed to address the unique challenges of modern B2B enterprises.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Service 1: Verified B2B Contact Lists */}
            <SectionReveal delay={0.2} className="h-full">
              <Link href="/services/verified-b2b-contact-lists">
                <Card className="group relative overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader className="p-8 flex-grow">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      Verified B2B Contact Lists
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 flex-grow flex flex-col">
                    <CardDescription className="text-base leading-relaxed mb-6 flex-grow">
                      Access to comprehensive, verified databases of business contacts across industries and regions with accurate company hierarchies, ensuring you connect with the right decision-makers every time.
                    </CardDescription>
                    <div className="space-y-3 mt-auto">
                      {[
                        "Global coverage across 50+ countries",
                        "99% email deliverability rate",
                        "Real-time verification & enrichment",
                        "Multi-level contact hierarchy data"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </SectionReveal>

            {/* Service 2: Lead Generation Analysis */}
            <SectionReveal delay={0.4} className="h-full">
              <Link href="/services/lead-generation-analysis">
                <Card className="group relative overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader className="p-8 flex-grow">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      Lead Generation Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 flex-grow flex flex-col">
                    <CardDescription className="text-base leading-relaxed mb-6 flex-grow">
                      Advanced analytics and AI-driven insights to identify, qualify, and track high-value leads with conversion optimization. Transform raw data into qualified opportunities with precision targeting.
                    </CardDescription>
                    <div className="space-y-3 mt-auto">
                      {[
                        "AI-powered lead scoring & ranking",
                        "Behavioral pattern recognition",
                        "Real-time pipeline analytics",
                        "CRM integration support"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </SectionReveal>

            {/* Service 3: Business Process Automation */}
            <SectionReveal delay={0.6} className="h-full">
              <Link href="/services/business-process-automation">
                <Card className="group relative overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader className="p-8 flex-grow">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Wrench className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      Business Process Automation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 flex-grow flex flex-col">
                    <CardDescription className="text-base leading-relaxed mb-6 flex-grow">
                      End-to-end automation of recurring business processes, reducing manual effort by up to 80% and improving overall accuracy and team productivity across your organization.
                    </CardDescription>
                    <div className="space-y-3 mt-auto">
                      {[
                        "Custom workflow automation",
                        "Reduces manual effort by 80%",
                        "Eliminates human error",
                        "Continual improvement analysis"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Our Process
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              How we implement your custom solutions
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { step: 1, title: "Discovery", description: "Understanding your unique business requirements and challenges.", icon: PencilRuler },
              { step: 2, title: "Evaluation", description: "Analyzing data sources and identifying optimization opportunities.", icon: ClipboardCheck },
              { step: 3, title: "Implementation", description: "Deploying tailored solutions with minimal disruption to workflow.", icon: Rocket },
              { step: 4, title: "Optimization", description: "Continuous monitoring and refinement for maximum results.", icon: Settings }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={index} className="relative">
                  <Card className="h-full flex flex-col items-center text-center p-6 sm:p-8 hover:shadow-lg transition-shadow">
                    <div className="relative mb-6">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mx-auto">
                        <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-xs sm:text-sm font-bold text-cyan-600 dark:text-cyan-400 shadow">
                        {item.step}
                      </div>
                    </div>
                    <CardTitle className="text-lg sm:text-xl mb-3">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="flex-grow">
                      {item.description}
                    </CardDescription>
                  </Card>
                  {index < 3 && (
                    <div className="hidden sm:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
                    </div>
                  )}
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Recommendation CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Ready to Accelerate Your B2B Growth?
            </h2>
            <p className="text-lg sm:text-xl text-cyan-50 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Get started with our expert team today. We'll provide a free consultation to identify the perfect solution for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button asChild size="lg" className="bg-white text-cyan-600 hover:bg-slate-100 w-full sm:w-auto">
                <Link href="/contact">Contact Us Today</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-cyan-600 w-full sm:w-auto">
                <Link href="/portfolio">View Success Stories</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}