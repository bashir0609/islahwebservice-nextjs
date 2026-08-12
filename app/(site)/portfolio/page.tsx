import { MapPin } from "lucide-react";
import { SectionReveal } from "@/components/motion/animated-section";
import PortfolioGallery from "@/components/site/portfolio-gallery";
import { listPortfolioItems } from "@/lib/actions/portfolio";

// Server component: fetches the case studies directly from the database so the
// page ships with content in the HTML (no client-side fetch dependency).
export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const projects = await listPortfolioItems();

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <SectionReveal immediate delay={0.2} className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
                <MapPin className="h-4 w-4" />
                Verified B2B Prospect Research
              </div>
            </SectionReveal>

            <SectionReveal immediate delay={0.4} className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                B2B Prospect Research
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                  Case Studies
                </span>
              </h1>
            </SectionReveal>

            <SectionReveal immediate delay={0.6} className="mb-8 max-w-2xl mx-auto">
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                How we research companies, identify decision-makers, verify
                contact data, and deliver CRM-ready prospect databases for
                businesses across the USA, UK, and Australia.
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

      {/* Projects Section */}
      <section className="py-16 sm:py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Selected Research Projects
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Verified record counts, research criteria, and deliverable facts
              for each project.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.2} className="mb-12">
            <PortfolioGallery projects={projects} />
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
