import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { MarkdownHeading } from "@/lib/markdown-headings";

interface TableOfContentsProps {
  headings: MarkdownHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.filter((heading) => heading.level === 2).length < 4) {
    return null;
  }

  return (
    <nav
      aria-label="Table of contents"
      className="my-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm sm:p-6"
    >
      <p className="mb-3 font-semibold text-white">On this page</p>
      <ol className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "ml-4" : ""}>
            <Link
              href={`#${heading.id}`}
              className="flex items-center gap-1 text-slate-400 transition-colors hover:text-cyan-400"
            >
              <ChevronRight className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
              {heading.text}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
