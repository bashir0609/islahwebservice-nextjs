import {
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Users,
  Mail,
  ArrowUpRight,
} from "lucide-react";

const leads = [
  {
    initials: "JD",
    name: "James Doyle",
    company: "Northwind Logistics",
    status: "Qualified",
    avatar: "from-cyan-500 to-blue-600",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  {
    initials: "SK",
    name: "Sarah Kim",
    company: "Bluebird SaaS",
    status: "Verified",
    avatar: "from-purple-500 to-pink-600",
    badge: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  },
  {
    initials: "AR",
    name: "Adam Reyes",
    company: "Atlas Dental Group",
    status: "Warm",
    avatar: "from-orange-500 to-red-600",
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
];

const bars = [42, 58, 48, 72, 64, 86, 100];

export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
      {/* Glow behind the card */}
      <div className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-tr from-cyan-500/25 via-transparent to-teal-500/25 blur-3xl" />

      {/* Dashboard card */}
      <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-2xl backdrop-blur-md sm:p-6">
        {/* Window header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Live Pipeline
          </div>
          <div className="flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-400">
            <Zap className="h-3 w-3" />
            AUTO
          </div>
        </div>

        {/* KPI row */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { icon: Users, label: "New Leads", value: "1,284", delta: "+12%", color: "text-cyan-400" },
            { icon: ShieldCheck, label: "Verified", value: "98.6%", delta: "+2.1%", color: "text-emerald-400" },
            { icon: TrendingUp, label: "Meetings", value: "43", delta: "+8", color: "text-purple-400" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/5 p-3"
            >
              <div className={`flex items-center gap-1.5 ${stat.color}`}>
                <stat.icon className="h-3.5 w-3.5" />
                <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  {stat.label}
                </span>
              </div>
              <div className="mt-1.5 text-lg font-bold text-white sm:text-xl">
                {stat.value}
              </div>
              <div className="text-[10px] font-medium text-emerald-400">
                {stat.delta} this week
              </div>
            </div>
          ))}
        </div>

        {/* Lead rows */}
        <div className="mt-4 space-y-2.5">
          {leads.map((lead) => (
            <div
              key={lead.initials}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5"
            >
              <div
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${lead.avatar} text-xs font-bold text-white`}
              >
                {lead.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
                  {lead.name}
                  <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-cyan-400" />
                </div>
                <div className="truncate text-xs text-slate-400">{lead.company}</div>
              </div>
              <span
                className={`flex-shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${lead.badge}`}
              >
                {lead.status}
              </span>
            </div>
          ))}
        </div>

        {/* Mini chart */}
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300">Qualified per week</span>
            <span className="flex items-center gap-1 text-xs font-semibold text-cyan-400">
              <ArrowUpRight className="h-3.5 w-3.5" />
              +38%
            </span>
          </div>
          <div className="flex h-20 items-end gap-1.5">
            {bars.map((height, index) => (
              <div
                key={index}
                className={`flex-1 rounded-t-sm bg-gradient-to-t ${
                  index === bars.length - 1
                    ? "from-cyan-600 to-teal-400 shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                    : "from-cyan-800/70 to-cyan-600/50"
                }`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        {/* Footer row */}
        <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-cyan-400" />
            5,600 contacts verified
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            Bounce rate &lt; 2%
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
            <div className="text-xs font-bold text-white">98.6%</div>
            <div className="text-[10px] text-slate-400">Data accuracy</div>
          </div>
        </div>
      </div>

      <div className="absolute -right-4 -bottom-5 hidden animate-float rounded-xl border border-white/10 bg-slate-900/90 px-3 py-2 shadow-xl backdrop-blur md:block [animation-delay:1.5s]">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/15">
            <TrendingUp className="h-4 w-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">3.5×</div>
            <div className="text-[10px] text-slate-400">Conversion lift</div>
          </div>
        </div>
      </div>
    </div>
  );
}
