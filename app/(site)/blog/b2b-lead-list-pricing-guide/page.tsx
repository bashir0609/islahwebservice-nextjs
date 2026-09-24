import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

const path = "/blog/b2b-lead-list-pricing-guide";

export const metadata = pageMetadata({
  title: "B2B Lead List Pricing: What Changes the Quote",
  description: "Understand how list size, research criteria, contact fields, verification, and delivery requirements affect the price of a custom B2B prospect list.",
  path,
});

export default function LeadListPricingGuide() {
  return (
    <main className="bg-slate-950 text-slate-200">
      <article className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
        <Link href="/blog" className="text-sm text-cyan-400 hover:underline">← Back to the blog</Link>
        <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-cyan-400">Prospect research guide</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">B2B lead list pricing: what changes the quote?</h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-300">
          A list of 100 companies with public website details is a different research job from 100 companies
          matched to funding and hiring signals with current decision makers and verified business emails.
          The number of rows matters, but the criteria and required evidence often matter more.
        </p>

        <div className="mt-12 space-y-10 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white">What affects the price?</h2>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li><strong>Targeting depth:</strong> industry, location, employee size, technologies, recent funding, and hiring criteria all add research and cross-checking time.</li>
              <li><strong>Contact fields:</strong> company-only lists take less work than finding current people in specified roles, checking their LinkedIn profiles, and verifying business emails.</li>
              <li><strong>Availability:</strong> niche markets, small regions, and narrow combinations of criteria may yield fewer qualified companies than the requested volume.</li>
              <li><strong>Quality checks:</strong> deduplication, role confirmation, email verification, source notes, and CRM formatting change the work required per record.</li>
              <li><strong>Delivery:</strong> a one-time sample, a large batch, and regularly refreshed records need different schedules and review steps.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">How to compare quotes fairly</h2>
            <p className="mt-4">Ask each provider to define a qualified record. Compare the included columns, research date, source and verification method, treatment of missing fields, duplicate policy, and revision terms. A cheaper price per row is less useful if many rows fail your actual ICP or require your team to clean them again.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">What to send for a useful estimate</h2>
            <p className="mt-4">Specify your target industry and countries, company size, required signals, decision-maker roles, fields, exclusions, approximate volume, and preferred delivery date. Say whether an office phone or direct number is essential; availability varies by market and role, so phone coverage should be scoped separately.</p>
            <p className="mt-4">For a narrow ICP, a small sample can test the researchable company pool before either side commits to a large fixed count. We quote the agreed scope and deliverable rather than publish a universal price per lead.</p>
          </section>

          <section className="rounded-2xl border border-cyan-500/25 bg-cyan-500/10 p-6">
            <h2 className="text-2xl font-semibold text-white">Get a project-specific quote</h2>
            <p className="mt-3">Share your criteria and required fields. We will confirm what can be researched, the likely deliverable, and a timeline before quoting.</p>
            <Link href="/free-consultation" className="mt-5 inline-flex rounded-lg bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-500">Discuss your research brief</Link>
            <p className="mt-4 text-sm">Prefer to see records first? <Link href="/request-sample" className="text-cyan-300 underline">Request a free sample</Link>.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
