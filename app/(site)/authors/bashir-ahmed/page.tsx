import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_AUTHOR } from "@/lib/author";
import { listBlogPosts } from "@/lib/actions/blog";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

const authorTitle = "Bashir Ahmed — Founder & Author";

export const metadata: Metadata = pageMetadata({
  title: authorTitle,
  description: "Meet Bashir Ahmed, founder of Islah Web Service, and read his guides to B2B prospect research, contact enrichment, email verification, and ICP definition.",
  path: BLOG_AUTHOR.path,
});

export default async function AuthorPage() {
  const posts = (await listBlogPosts()).filter((post) => post.published);
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BLOG_AUTHOR.url}#person`,
    name: BLOG_AUTHOR.name,
    url: BLOG_AUTHOR.url,
    jobTitle: BLOG_AUTHOR.jobTitle,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    sameAs: BLOG_AUTHOR.sameAs,
    knowsAbout: [
      "B2B prospect research",
      "B2B data enrichment",
      "ICP definition",
      "Email verification",
      "Decision-maker research",
    ],
  };

  return (
    <main className="bg-slate-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{authorTitle}</h1>
        <p className="mt-4 text-xl text-slate-300">{BLOG_AUTHOR.jobTitle}, Islah Web Service</p>
        <p className="mt-4 text-slate-400">TODO(human): Add a verified professional credential for Bashir Ahmed.</p>
        <nav aria-label="Author profiles" className="mt-6 flex gap-6">
          <a href={BLOG_AUTHOR.sameAs[0]} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline underline-offset-4">LinkedIn profile</a>
          <a href={BLOG_AUTHOR.sameAs[1]} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline underline-offset-4">Upwork profile</a>
        </nav>
        <section aria-labelledby="author-articles" className="mt-16">
          <h2 id="author-articles" className="text-2xl font-semibold">Research guides by Bashir Ahmed</h2>
          <ul className="mt-8 space-y-6">
            {posts.map((post) => (
              <li key={post.id} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <Link href={`/blog/${post.slug}`} className="text-lg font-semibold text-cyan-400 hover:text-cyan-300">{post.title}</Link>
                {post.createdAt && (
                  <p className="mt-2 text-sm text-slate-400">
                    Published <time dateTime={new Date(post.createdAt).toISOString()}>{formatDate(new Date(post.createdAt))}</time>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
