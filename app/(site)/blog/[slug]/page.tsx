import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { SectionReveal } from "@/components/motion/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug } from "@/lib/actions/blog";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import BlogShare from "@/components/blog-share";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: post.excerpt || undefined,
    path: `/blog/${post.slug}`,
    image: post.coverImage || undefined,
    ogType: "article",
    article: {
      publishedTime: post.createdAt
        ? new Date(post.createdAt).toISOString()
        : undefined,
      modifiedTime: post.updatedAt
        ? new Date(post.updatedAt).toISOString()
        : undefined,
      authors: post.author ? [post.author] : undefined,
    },
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readTime = post.readTime || Math.max(1, Math.ceil(post.content.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim().split(/\s+/).filter(Boolean).length / 200));
  const date = post.createdAt ? formatDate(new Date(post.createdAt)) : "";

  return (
    <main className="flex flex-col">
      {/* Article structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt || undefined,
            image: post.coverImage
              ? [post.coverImage]
              : ["https://www.islahwebservice.com/og-image.png"],
            datePublished: post.createdAt
              ? new Date(post.createdAt).toISOString()
              : undefined,
            dateModified: post.updatedAt
              ? new Date(post.updatedAt).toISOString()
              : undefined,
            author: {
              "@type": "Person",
              name: post.author || "Islah Web Service",
            },
            publisher: {
              "@type": "Organization",
              name: "Islah Web Service",
              url: "https://www.islahwebservice.com",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.islahwebservice.com/blog/${post.slug}`,
            },
          }),
        }}
      />

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
              <div className="relative h-64 md:h-96 w-full rounded-3xl overflow-hidden mb-8 max-w-4xl mx-auto border border-white/10">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-teal-500/20">
                    <span className="text-cyan-400 text-sm font-semibold">
                      {post.title}
                    </span>
                  </div>
                )}
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
      <section className="py-16 sm:py-24 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-a:text-cyan-400 prose-strong:text-white prose-blockquote:border-cyan-500/40 prose-blockquote:text-slate-300 prose-code:text-cyan-300">
            <ReactMarkdown
              components={{
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </SectionReveal>

          <SectionReveal delay={0.3} className="mt-12">
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Apply These Insights?
                </h3>
                <p className="text-slate-400 mb-6">
                  Let's discuss how we can help you implement these
                  strategies for your business.
                </p>
                <Button
                  asChild
                  size="lg"
                >
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </CardContent>
            </Card>
          </SectionReveal>

          <SectionReveal delay={0.4} className="mt-8">
            <div className="flex justify-center">
              <BlogShare title={post.title} />
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
