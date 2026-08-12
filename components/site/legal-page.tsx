import type { ReactNode } from "react";

/**
 * Shared shell for static legal pages (Privacy Policy, Terms of Use).
 * Server-rendered, matches the site's dark slate design system, and keeps the
 * two legal pages visually consistent without duplicating layout markup.
 */
export default function LegalPage({
  title,
  subtitle,
  updatedLabel,
  children,
}: {
  title: string;
  subtitle: string;
  updatedLabel: string;
  children: ReactNode;
}) {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="relative z-10 mx-auto flex min-h-[45vh] max-w-4xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4 text-xs sm:text-sm font-medium uppercase tracking-wider text-cyan-400">
              {updatedLabel}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-slate-400 leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative overflow-hidden bg-slate-950 py-14 sm:py-20">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">{children}</div>
        </div>
      </section>
    </main>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-sm">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">{heading}</h2>
      <div className="space-y-4 text-sm sm:text-base text-slate-400 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc pl-5 space-y-2">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
