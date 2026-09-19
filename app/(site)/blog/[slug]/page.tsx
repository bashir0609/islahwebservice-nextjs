import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown, { type Components } from "react-markdown";
import { ArrowLeft, Clock, Calendar, ChevronRight } from "lucide-react";
import { SectionReveal } from "@/components/motion/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug } from "@/lib/actions/blog";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { BLOG_SEO } from "@/lib/blog-seo";
import { BLOG_AUTHOR } from "@/lib/author";
import { AuthorByline } from "@/components/site/author-byline";
import { formatDate } from "@/lib/utils";
import BlogShare from "@/components/blog-share";
import { RelatedServices } from "@/components/site/related-services";
import TableOfContents from "@/components/site/table-of-contents";
import { extractMarkdownHeadings, splitBeforeFirstH2 } from "@/lib/markdown-headings";
import { ContentVisuals } from "@/components/site/content-visuals";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  const seo = BLOG_SEO[post.slug];

  return pageMetadata({
    title: seo?.title || post.title,
    description: seo?.description || post.excerpt || undefined,
    path: `/blog/${post.slug}`,
    // TODO(og): Restore per-post generated images only after a production-safe route is proven.
    image: "/og-image.png",
    ogType: "article",
    article: {
      publishedTime: post.createdAt
        ? new Date(post.createdAt).toISOString()
        : undefined,
      modifiedTime: post.updatedAt
        ? new Date(post.updatedAt).toISOString()
        : undefined,
      authors: [BLOG_AUTHOR.url],
    },
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const plainText = post.content.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const readTime = post.readTime || Math.max(1, Math.ceil(wordCount / 200));
  const date = post.createdAt ? formatDate(new Date(post.createdAt)) : "";
  const headings = extractMarkdownHeadings(post.content);
  const [introduction, remainingContent] = splitBeforeFirstH2(post.content);
  let headingIndex = 0;
  const markdownComponents: Components = {
    a: ({ href, children }) => {
      const isExternal = typeof href === "string" && /^https?:\/\//.test(href);
      return isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      );
    },
    h2: ({ children }) => {
      const heading = headings[headingIndex++];
      return <h2 id={heading?.id}>{children}</h2>;
    },
    h3: ({ children }) => {
      const heading = headings[headingIndex++];
      return <h3 id={heading?.id}>{children}</h3>;
    },
  };

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
            image: [absoluteUrl(post.coverImage || "/og-image.png")],
            datePublished: post.createdAt
              ? new Date(post.createdAt).toISOString()
              : undefined,
            dateModified: post.updatedAt
              ? new Date(post.updatedAt).toISOString()
              : undefined,
            author: {
              "@type": "Person",
              name: BLOG_AUTHOR.name,
              url: BLOG_AUTHOR.url,
              jobTitle: BLOG_AUTHOR.jobTitle,
            },
            publisher: {
              "@type": "Organization",
              "@id": "https://www.islahwebservice.com/#organization",
              name: "Islah Web Service",
              url: "https://www.islahwebservice.com",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.islahwebservice.com/blog/${post.slug}`,
            },
            ...(post.tags && post.tags.length > 0 ? { keywords: post.tags } : {}),
            wordCount: wordCount || undefined,
            timeRequired: readTime ? `PT${readTime}M` : undefined,
          }),
        }}
      />

      {/* Breadcrumbs structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.islahwebservice.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://www.islahwebservice.com/blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `https://www.islahwebservice.com/blog/${post.slug}`,
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <SectionReveal immediate delay={0.2}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </SectionReveal>
            <SectionReveal immediate delay={0.3} className="mb-8">
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
            <SectionReveal immediate delay={0.4}>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                {post.title}
              </h1>
            </SectionReveal>
            <SectionReveal immediate delay={0.5}>
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500" vocab="https://schema.org/" typeof="BreadcrumbList">
                  <li property="itemListElement" typeof="ListItem">
                    <Link property="item" typeof="WebPage" href="/" className="hover:text-cyan-400 transition-colors">
                      <span property="name">Home</span>
                    </Link>
                    <meta property="position" content="1" />
                    <ChevronRight className="h-3 w-3" aria-hidden="true" />
                  </li>
                  <li property="itemListElement" typeof="ListItem">
                    <Link property="item" typeof="WebPage" href="/blog" className="hover:text-cyan-400 transition-colors">
                      <span property="name">Blog</span>
                    </Link>
                    <meta property="position" content="2" />
                    <ChevronRight className="h-3 w-3" aria-hidden="true" />
                  </li>
                  <li property="itemListElement" typeof="ListItem" aria-current="page">
                    <span property="name" className="text-slate-400">{post.title}</span>
                    <meta property="position" content="3" />
                  </li>
                </ol>
              </nav>
              <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 mb-8">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.createdAt ? new Date(post.createdAt).toISOString() : ""}>{date}</time>
                </span>
                {post.updatedAt && post.updatedAt !== post.createdAt && (
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={new Date(post.updatedAt).toISOString()}>Updated {formatDate(new Date(post.updatedAt))}</time>
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {readTime} min read
                </span>
                <AuthorByline />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 sm:py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <SectionReveal className="prose prose-lg prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:text-white prose-a:text-cyan-400 prose-strong:text-white prose-blockquote:border-cyan-500/40 prose-blockquote:text-slate-300 prose-code:text-cyan-300">
              <ReactMarkdown components={markdownComponents}>{introduction}</ReactMarkdown>
              <TableOfContents headings={headings} />
              {remainingContent && (
                <ReactMarkdown components={markdownComponents}>{remainingContent}</ReactMarkdown>
              )}
            </SectionReveal>
          </div>
          <SectionReveal delay={0.3} className="mt-12">
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Need Prospect Data for Your Target Market?
                </h3>
                <p className="text-slate-400 mb-6">
                  Request a free sample and we&apos;ll research companies and decision-makers that match your criteria.
                </p>
                <Button asChild size="lg">
                  <Link href="/request-sample">Request a Free Sample</Link>
                </Button>
              </CardContent>
            </Card>
          </SectionReveal>

          <SectionReveal delay={0.4} className="mt-8">
            <div className="flex justify-center">
              <BlogShare title={post.title} absoluteUrl={absoluteUrl(`/blog/${post.slug}`)} />
            </div>
          </SectionReveal>
        </div>
      </section>

      <ContentVisuals pathname={`/blog/${post.slug}`} />

      {/* Reciprocal links back to the matching service and industry pages */}
      <RelatedServices slug={post.slug} tone="900" />
    </main>
  );
}
