import {
  CheckCircle2,
  ShieldCheck,
  FileSpreadsheet,
  Search,
  Target,
  Mail,
  BadgeCheck,
} from "lucide-react";

// Clearly fictional sample records — never real clients or companies.
const sampleRows = [
  {
    company: "Apex Manufacturing Co.",
    industry: "Manufacturing",
    location: "Austin, TX",
    size: "50–250",
    tech: "NetSuite",
    funding: "Series B · 2025",
    decisionMaker: "Sarah Chen",
    title: "VP of Finance",
    email: "Verified",
  },
  {
    company: "Harborview Properties",
    industry: "Real Estate",
    location: "Chicago, IL",
    size: "250–500",
    tech: "Yardi",
    funding: "Private",
    decisionMaker: "Marcus Webb",
    title: "Acquisitions Manager",
    email: "Verified",
  },
  {
    company: "Brightline SaaS",
    industry: "Software",
    location: "London, UK",
    size: "10–50",
    tech: "HubSpot",
    funding: "Series A · 2025",
    decisionMaker: "Emily Turner",
    title: "Head of Sales",
    email: "Verified",
  },
  {
    company: "Cascade Dental Group",
    industry: "Healthcare",
    location: "Seattle, WA",
    size: "50–250",
    tech: "—",
    funding: "—",
    decisionMaker: "David Okafor",
    title: "Owner",
    email: "Verified",
  },
];

const columns = [
  "Company",
  "Industry",
  "Location",
  "Employee Size",
  "Technology",
  "Funding Signal",
  "Decision Maker",
  "Job Title",
  "Business Email",
];

export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
      {/* Glow behind the card */}
      <div className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-tr from-cyan-500/25 via-transparent to-teal-500/25 blur-3xl" />

      {/* Prospect database card */}
      <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-2xl backdrop-blur-md sm:p-6">
        {/* Window header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <FileSpreadsheet className="h-3.5 w-3.5 text-cyan-400" />
            Custom Prospect Database
          </div>
          <div className="flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-400">
            <BadgeCheck className="h-3 w-3" />
            Sample Data
          </div>
        </div>

        {/* Criteria strip */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-300">
            <Target className="h-3 w-3 text-cyan-400" />
            Industry
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-300">
            <Search className="h-3 w-3 text-cyan-400" />
            Location
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-300">
            <Target className="h-3 w-3 text-teal-400" />
            Tech Stack
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-300">
            <ShieldCheck className="h-3 w-3 text-emerald-400" />
            Funding
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
            Built to your criteria
          </span>
        </div>

        {/* Column header row */}
        <div className="mt-4 hidden overflow-hidden rounded-t-xl border border-white/10 bg-white/5 sm:block">
          <div className="grid grid-cols-9 gap-2 px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
            {columns.map((col) => (
              <span key={col} className="truncate">
                {col}
              </span>
            ))}
          </div>
        </div>

        {/* Data rows */}
        <div className="mt-2 space-y-2">
          {sampleRows.map((row, index) => (
            <div
              key={row.company}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/30 to-teal-500/30 text-[10px] font-bold text-cyan-300">
                    {row.company
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-white">
                      {row.company}
                    </div>
                    <div className="truncate text-[11px] text-slate-400">
                      {row.industry} · {row.location} · {row.size} employees
                    </div>
                  </div>
                </div>
                <div className="hidden flex-shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 md:flex">
                  <CheckCircle2 className="h-3 w-3" />
                  {row.email}
                </div>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] text-slate-400 sm:hidden">
                <span className="truncate">
                  <span className="text-slate-500">DM: </span>
                  {row.decisionMaker} · {row.title}
                </span>
                <span className="truncate text-right">
                  <span className="text-slate-500">Tech: </span>
                  {row.tech}
                </span>
              </div>

              <div className="mt-2 hidden items-center gap-3 text-[10px] text-slate-400 sm:flex">
                <span className="flex items-center gap-1 truncate">
                  <Mail className="h-3 w-3 flex-shrink-0 text-cyan-400" />
                  {row.decisionMaker} — {row.title}
                </span>
                <span className="truncate">{row.tech}</span>
                <span className="truncate">{row.funding}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer row */}
        <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            Verified emails · CRM-ready delivery
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
            Custom columns &amp; formatting
          </span>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -left-6 top-16 hidden animate-float rounded-xl border border-white/10 bg-slate-900/90 px-3 py-2 shadow-xl backdrop-blur md:block">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Verified</div>
            <div className="text-[10px] text-slate-400">Decision-maker emails</div>
          </div>
        </div>
      </div>

      <div className="absolute -right-4 -bottom-5 hidden animate-float rounded-xl border border-white/10 bg-slate-900/90 px-3 py-2 shadow-xl backdrop-blur md:block [animation-delay:1.5s]">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/15">
            <FileSpreadsheet className="h-4 w-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">CRM-Ready</div>
            <div className="text-[10px] text-slate-400">CSV · Excel · Sheets</div>
          </div>
        </div>
      </div>
    </div>
  );
}
