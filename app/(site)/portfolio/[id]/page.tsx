import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Building2, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPortfolioItem } from "@/lib/actions/portfolio";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

interface PortfolioDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PortfolioDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = await getPortfolioItem(id);
  if (!item) return {};

  return pageMetadata({
    title: item.title,
    description: item.description || undefined,
    path: `/portfolio/${item.id}`,
    image: item.image || undefined,
    ogType: "article",
  });
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { id } = await params;
  const item = await getPortfolioItem(id);

  if (!item) {
    notFound();
  }

  let tags: string[] = [];
  try {
    tags = typeof item.tags === "string" ? JSON.parse(item.tags) : item.tags;
  } catch {
    tags = [];
  }

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {tags.slice(0, 4).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-cyan-500/90 text-white text-xs rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              {item.title}
            </h1>

            <div className="flex items-center justify-center gap-6 text-slate-400">
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Case Study
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {item.createdAt ? formatDate(item.createdAt) : "Recent"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      <section className="py-16 sm:py-24 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-white/10 bg-white/5">
            <div className="relative h-64 md:h-96 w-full">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-teal-500/20">
                  <Building2 className="h-16 w-16 text-cyan-400" />
                </div>
              )}
            </div>
          </Card>

          <div className="mt-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Project Overview
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed whitespace-pre-line">
              {item.description}
            </p>
          </div>

          {item.featured && (
            <div className="mt-8 inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full border border-cyan-500/30">
              <div className="w-2 h-2 bg-cyan-500 rounded-full" />
              <span className="text-sm font-medium text-cyan-400">
                Featured Project
              </span>
            </div>
          )}

          <Card className="mt-16 border-white/10 bg-white/5 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Want Results Like This?
              </h3>
              <p className="text-slate-400 mb-6">
                Let's discuss how we can build a lead generation system for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Start a Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:border-white/60 hover:bg-white/10 hover:text-white">
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
