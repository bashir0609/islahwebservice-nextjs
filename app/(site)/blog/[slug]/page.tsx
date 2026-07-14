import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, FileText } from "lucide-react";
import { SectionReveal } from "@/components/motion/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug } from "@/lib/actions/blog";
import { formatDate } from "@/lib/utils";

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const tags: string[] = typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags;
  const readTime = post.readTime || Math.max(1, Math.ceil(post.content.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim().split(/\s+/).filter(Boolean).length / 200));
  const date = post.createdAt ? formatDate(new Date(post.createdAt)) : "";
  const gradient = "from-cyan-500/20 to-teal-500/20";

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
                  Let's discuss how we can help you implement these
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
