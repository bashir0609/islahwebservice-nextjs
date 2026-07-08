"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Users,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Globe,
  Mail,
  Database,
  Shield,
  Zap,
  BarChart3,
} from "lucide-react";
import { SectionReveal, StaggerContainer, StaggerItem } from "@/components/motion/animated-section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VerifiedB2BContactListsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const features = [
    { icon: Globe, title: "Global Coverage", description: "Access verified contacts across 50+ countries with comprehensive regional databases." },
    { icon: Mail, title: "99% Deliverability", description: "Industry-leading email verification ensures your outreach reaches the right inboxes." },
    { icon: Database, title: "Real-time Enrichment", description: "Continuous data updates with company hierarchies, tech stacks, and buying signals." },
    { icon: Shield, title: "GDPR & CCPA Compliant", description: "All data sourced and maintained with full regulatory compliance." },
    { icon: Zap, title: "Instant Access", description: "API and dashboard access for immediate integration into your workflow." },
    { icon: BarChart3, title: "Advanced Filtering", description: "Filter by industry, company size, revenue, technology, location, and more." },
  ];

  const useCases = [
    { title: "Sales Prospecting", description: "Build targeted prospect lists with verified decision-maker contacts." },
    { title: "Market Expansion", description: "Identify and validate new market opportunities with accurate company data." },
    { title: "Account-Based Marketing", description: "Enrich target accounts with complete organizational hierarchies." },
    { title: "Recruiting", description: "Find and verify top talent across industries and geographies." },
  ];

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <SectionReveal delay={0.2} className="mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-blue-400">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-blue-500" />
                </span>
                Verified B2B Contact Lists
              </div>
            </SectionReveal>

            <SectionReveal delay={0.4} className="mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                Verified B2B
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Contact Lists
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal delay={0.6} className="mb-8 sm:mb-12 max-w-3xl mx-auto">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                Access 50M+ verified business contacts across 50+ countries. Real-time enrichment, 99% deliverability, and complete organizational hierarchies.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.8} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                <Link href="/contact">Start Free Trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900 w-full sm:w-auto">
                <Link href="/portfolio">View Case Studies</Link>
              </Button>
            </SectionReveal>
          </div>
        </div>

        {/* Floating Elements - hidden on mobile for performance */}
        <div className="hidden md:block absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <StaggerItem className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                <Globe className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">50M+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Business Contacts</div>
            </StaggerItem>

            <StaggerItem className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                <Mail className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">99%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Email Deliverability</div>
            </StaggerItem>

            <StaggerItem className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                <MapPin className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">50+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Countries Covered</div>
            </StaggerItem>

            <StaggerItem className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">100%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">GDPR Compliant</div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose Our Contact Lists
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Every contact is verified, enriched, and organized for immediate outreach.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="p-6 sm:p-8">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-6">
                      <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl mb-3">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 sm:p-8 pt-0 flex-grow">
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Perfect For
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our contact lists power growth across multiple business functions.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {useCases.map((useCase, index) => (
              <StaggerItem key={index}>
                <Card className="h-full p-6 sm:p-8 hover:shadow-lg transition-shadow">
                  <CardTitle className="text-lg sm:text-xl mb-3">{useCase.title}</CardTitle>
                  <CardDescription className="flex-grow">{useCase.description}</CardDescription>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Data Quality Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Data You Can Trust
            </h2>
            <p className="text-lg sm:text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Multi-source verification, continuous enrichment, and compliance-first approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-slate-100 w-full sm:w-auto">
                <Link href="/contact">Request Sample Data</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600 w-full sm:w-auto">
                <Link href="/portfolio">See Results</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}