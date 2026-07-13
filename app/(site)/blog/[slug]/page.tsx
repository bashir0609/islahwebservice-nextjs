"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, FileText } from "lucide-react";
import { SectionReveal } from "@/components/motion/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug } from "@/lib/actions/blog";
import { formatDate, parseTags } from "@/lib/utils";
import { notFound } from "next/navigation";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string | Date | null;
  updatedAt: string | Date | null;
  published: number | null;
  excerpt?: string | null;
  readTime?: number | null;
  tags?: string[] | null;
  coverImage?: string | null;
  author?: string | null;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [mounted, setMounted] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      loadPost();
    }
  }, [mounted, params.slug]);

  const loadPost = async () => {
    let foundPost: Awaited<ReturnType<typeof getBlogPostBySlug>>;
    try {
      foundPost = await getBlogPostBySlug(params.slug);
    } catch (error) {
      console.error("Failed to load blog post:", error);
      setLoadError("We couldn't load this blog post. Please try again later.");
      return;
    }

    if (!foundPost) {
      notFound();
      return;
    }

    setPost({ ...foundPost, tags: parseTags(foundPost.tags) });
  };

  const calculateReadTime = (content: string): number => {
    const text = content
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  const formatContent = (html: string): string => {
    return html
      .replace(
        /<h2>/g,
        '<h2 class="text-3xl font-bold mt-12 mb-4 text-slate-900 dark:text-white">',
      )
      .replace(
        /<h3>/g,
        '<h3 class="text-2xl font-semibold mt-8 mb-3 text-slate-900 dark:text-white">',
      )
      .replace(
        /<p>/g,
        '<p class="text-lg leading-relaxed mb-6 text-slate-700 dark:text-slate-300">',
      )
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
  };

  if (!mounted) return null;
  if (loadError) {
    return (
      <main className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <p className="text-xl text-red-600 dark:text-red-400">{loadError}</p>
        <Link href="/blog" className="mt-6 text-cyan-600 hover:underline dark:text-cyan-400">
          Back to Blog
        </Link>
      </main>
    );
  }
  if (!post) return null;

  const readTime = post.readTime || calculateReadTime(post.content);
  const date = post.createdAt ? formatDate(new Date(post.createdAt)) : "";
  const gradient = `from-cyan-500/20 to-teal-500/20`;

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <SectionReveal delay={0.2}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </SectionReveal>
            <SectionReveal delay={0.3} className="mb-8">
              <div
                className={`relative h-64 md:h-96 w-full bg-gradient-to-br ${gradient} rounded-3xl overflow-hidden mb-8 max-w-4xl mx-auto`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="h-16 w-16 text-cyan-600 dark:text-cyan-400" />
                </div>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.4}>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                {post.title}
              </h1>
            </SectionReveal>
            <SectionReveal delay={0.5}>
              <div className="flex items-center justify-center gap-6 text-slate-400 mb-8">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {readTime} min read
                </span>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="prose prose-lg max-w-none">
            <div
              className="article-content text-slate-700 dark:text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </SectionReveal>

          <SectionReveal delay={0.3} className="mt-12">
            <Card className="bg-gradient-to-r from-cyan-600/10 to-teal-600/10 border-cyan-200 dark:border-cyan-800">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Ready to Apply These Insights?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Let&apos;s discuss how we can help you implement these
                  strategies for your business.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </CardContent>
            </Card>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
