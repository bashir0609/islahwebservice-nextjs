"use client";

import Link from "next/link";
import {
  Building2,
  TrendingUp,
  Users,
  MapPin,
  Target,
  Shield,
  Clock,
  Award,
  ArrowRight,
  Star,
} from "lucide-react";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/animated-section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      {/* Hero Section — warm story hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,146,60,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(244,63,94,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl animate-pulse" />

        <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionReveal immediate delay={0.2} className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-400">
                <Building2 className="h-4 w-4" />
                Since 2016 · B2B Growth Partner
              </div>
            </SectionReveal>

            <SectionReveal immediate delay={0.4} className="mb-6 sm:mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                The partner behind
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">
                  190+ growth projects
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal immediate delay={0.6} className="mb-10 mx-auto max-w-2xl">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed">
                We build AI-powered systems that automatically discover, verify, enrich, and qualify prospects—so your sales team spends time closing deals, not searching for contacts.
              </p>
            </SectionReveal>

            <SectionReveal immediate delay={0.8} className="flex flex-wrap items-center justify-center gap-4">
              {[
                { icon: Award, value: "190+", label: "Projects delivered" },
                { icon: TrendingUp, value: "3.5×", label: "Avg. conversion lift" },
                { icon: MapPin, value: "US · UK · AU", label: "Markets served" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm"
                >
                  <stat.icon className="h-4 w-4 text-amber-400" />
                  <span className="text-sm font-semibold text-white">{stat.value}</span>
                  <span className="text-xs text-slate-400">{stat.label}</span>
                </div>
              ))}
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.07),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <SectionReveal delay={0.2} className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our Story & Mission
              </h2>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                Founded in 2016, Islah Web Service emerged from a simple
                observation: businesses were struggling to find reliable,
                verified contacts in an increasingly digital world. Our
                founders, experienced in both B2B sales and technology,
                recognized the opportunity to bridge this gap with data-driven
                solutions.
              </p>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                What started as a modest database of 500 verified contacts has
                grown into a comprehensive B2B solutions platform serving
                businesses across the USA, UK, and Australia. Today, we pride
                ourselves on being the trusted partner that bridges the gap
                between opportunity and achievement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                >
                  <Link href="/contact">Get Started</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                  <Link href="/portfolio">View Success</Link>
                </Button>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.4} className="order-1 lg:order-2 relative">
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 p-8 backdrop-blur-sm border border-white/10">
                  <div className="aspect-square rounded-xl bg-slate-900/80 border border-white/10 shadow-2xl flex items-center justify-center">
                    <div className="text-center">
                      <Building2 className="h-20 w-20 text-cyan-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">
                        2016-2026
                      </h3>
                      <p className="text-slate-400">
                        Years of Growth
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl opacity-40 blur-xl" />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(45,212,191,0.06),transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              The principles that guide everything we do and shape our approach
              to B2B excellence.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Trust",
                description:
                  "We believe in transparency and reliability, providing verified, high-quality contacts you can count on.",
                tint: "bg-blue-500/15 text-blue-400",
              },
              {
                icon: Target,
                title: "Precision",
                description:
                  "Our data is accurate, up-to-date, and targeted to help you connect with the right decision-makers.",
                tint: "bg-purple-500/15 text-purple-400",
              },
              {
                icon: Users,
                title: "Partnership",
                description:
                  "We’re your dedicated B2B partner, committed to your success and growth through customized solutions.",
                tint: "bg-orange-500/15 text-orange-400",
              },
              {
                icon: TrendingUp,
                title: "Innovation",
                description:
                  "Leveraging cutting-edge technology and AI to transform business operations and drive measurable results.",
                tint: "bg-emerald-500/15 text-emerald-400",
              },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={index}>
                  <Card className="p-8 text-center border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.08] hover:-translate-y-2 transition-all duration-300">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${value.tint} flex items-center justify-center`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl mb-4 text-white">
                      {value.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed text-slate-400">
                      {value.description}
                    </CardDescription>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-slate-400">
              Concrete results that speak to our commitment to excellence.
            </p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Verified Contacts", icon: Users },
              { value: "1K+", label: "Business Clients", icon: Building2 },
              { value: "50+", label: "Countries Served", icon: MapPin },
              { value: "95%", label: "Success Rate", icon: Award },
              {
                value: "80%",
                label: "Automation Efficiency",
                icon: TrendingUp,
              },
              { value: "24/7", label: "Data Availability", icon: Clock },
              { value: "4.9/5", label: "Client Satisfaction", icon: Star },
              { value: "100%", label: "Data Integrity", icon: Shield },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <StaggerItem key={index}>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Icon className="h-10 w-10 text-cyan-400" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.15),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(45,212,191,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl animate-pulse" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Experience the Islah Difference?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful businesses that trust Islah Web
              Service for their B2B contact and automation needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                size="lg"
              >
                <Link href="/contact">
                  Start Your Transformation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
