import { Metadata } from "next";
import Link from "next/link";
import { Tag } from "lucide-react";
import { SectionReveal } from "@/components/motion/animated-section";
import BlogIndex from "@/components/site/blog-index";
import { listBlogPosts } from "@/lib/actions/blog";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const POSTS_PER_PAGE = 10;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: "B2B Prospecting & Research Blog",
    description:
      "Read practical guides to company research, contact enrichment, email verification, and data quality for building and maintaining useful B2B prospect lists.",
    path: "/blog",
  });
}

export default async function BlogPage() {
  const allPosts = await listBlogPosts();
  const publishedPosts = allPosts.filter((post) => post.published);

  const totalPages = Math.ceil(publishedPosts.length / POSTS_PER_PAGE);
  const posts = publishedPosts.slice(0, POSTS_PER_PAGE);

  // Create lighter post objects without content for client serialization
  const postSummaries = posts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    author: post.author,
    createdAt: post.createdAt,
    tags: post.tags,
    readTime: post.readTime,
  }));

  return (
    <main className="flex flex-col">
      {/* Hero Section — dark editorial hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(251,191,36,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl animate-pulse" />

        <div className="relative z-10 mx-auto flex min-h-[45vh] max-w-4xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionReveal immediate delay={0.2} className="mb-6 flex justify-center">
              <div data-md-exclude="true" className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-400">
                <Tag className="h-4 w-4" />
                The Islah Journal
              </div>
            </SectionReveal>

            <SectionReveal immediate delay={0.4} className="mb-6">
              <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
                Fresh insights for{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">
                  B2B growth teams
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal immediate delay={0.6} className="mx-auto max-w-2xl">
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                Practical B2B prospecting and data research insights from the
                team that researches and builds prospect databases for sales
                teams.
              </p>
            </SectionReveal>

            <SectionReveal immediate delay={0.7} className="mt-8">
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { href: "/b2b-prospect-research", label: "B2B Prospect Research" },
                  { href: "/industries", label: "Industries" },
                  { href: "/contact-enrichment", label: "Existing Database Enrichment" },
                  { href: "/industries/saas", label: "SaaS" },
                  { href: "/industries/msp", label: "MSP" },
                  { href: "/request-sample", label: "Request a Sample" },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm transition-all hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-300"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 sm:py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal delay={0.2} className="mb-12">
            <BlogIndex posts={postSummaries as any} />
          </SectionReveal>

          {/* Pagination */}
          {totalPages > 1 && (
            <SectionReveal delay={0.3} className="mt-12">
              <nav aria-label="Blog pagination" className="flex flex-wrap items-center justify-center gap-2">
                <span className="px-4 py-2 text-slate-400">
                  Page 1 of {totalPages}
                </span>
                {totalPages > 1 && (
                  <Link
                    href="/blog/page/2"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all"
                  >
                    Next
                  </Link>
                )}
              </nav>
            </SectionReveal>
          )}
        </div>
      </section>
    </main>
  );
}