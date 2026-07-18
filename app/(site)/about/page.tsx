"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <SectionReveal delay={0.2} className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
                <Building2 className="h-4 w-4" />
                About Islah Web Service
              </div>
            </SectionReveal>

            <SectionReveal delay={0.4} className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                Your Trusted
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                  AI Lead Generation Partner
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal delay={0.6} className="mb-12 max-w-2xl mx-auto">
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                We build AI-powered systems that automatically discover, verify, enrich, and qualify prospects—so your sales team spends time closing deals, not searching for contacts.
              </p>
            </SectionReveal>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <SectionReveal delay={0.2} className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                Our Story & Mission
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Founded in 2020, Islah Web Service emerged from a simple
                observation: businesses were struggling to find reliable,
                verified contacts in an increasingly digital world. Our
                founders, experienced in both B2B sales and technology,
                recognized the opportunity to bridge this gap with data-driven
                solutions.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                What started as a modest database of 500 verified contacts has
                grown into a comprehensive B2B solutions platform serving
                businesses across the USA, UK, and Australia. Today, we pride
                ourselves on being the trusted partner that bridges the gap
                between opportunity and achievement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  <Link href="/contact">Get Started</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/portfolio">View Success</Link>
                </Button>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.4} className="order-1 lg:order-2 relative">
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 p-8 backdrop-blur-sm border border-slate-200 dark:border-slate-800">
                  <div className="aspect-square rounded-xl bg-white dark:bg-slate-900 shadow-2xl flex items-center justify-center">
                    <div className="text-center">
                      <Building2 className="h-20 w-20 text-cyan-600 dark:text-cyan-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        2020-2024
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        Years of Growth
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl opacity-80 blur-xl" />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
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
                color: "from-blue-500 to-cyan-600",
              },
              {
                icon: Target,
                title: "Precision",
                description:
                  "Our data is accurate, up-to-date, and targeted to help you connect with the right decision-makers.",
                color: "from-purple-500 to-pink-600",
              },
              {
                icon: Users,
                title: "Partnership",
                description:
                  "We’re your dedicated B2B partner, committed to your success and growth through customized solutions.",
                color: "from-orange-500 to-red-600",
              },
              {
                icon: TrendingUp,
                title: "Innovation",
                description:
                  "Leveraging cutting-edge technology and AI to transform business operations and drive measurable results.",
                color: "from-green-500 to-emerald-600",
              },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={index}>
                  <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl mb-4">
                      {value.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
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
      <section className="py-24 bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-teal-600/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
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
                    <div className="w-20 h-20 mx-auto mb-4 bg-white dark:bg-slate-900 rounded-2xl shadow-lg flex items-center justify-center">
                      <Icon className="h-10 w-10 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
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
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to Experience the Islah Difference?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful businesses that trust Islah Web
              Service for their B2B contact and automation needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                <Link href="/contact">
                  Start Your Transformation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
