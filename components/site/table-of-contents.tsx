"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const headingElements = document.querySelectorAll("main article h2, main article h3");
    const headingData: { id: string; text: string; level: number }[] = [];

    headingElements.forEach((el, index) => {
      const heading = el as HTMLElement;
      const id = heading.id || `heading-${index}`;
      if (!heading.id) heading.id = id;
      headingData.push({
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName[1]),
      });
    });

    setHeadings(headingData);
  }, [content]);

  if (headings.filter((h) => h.level === 2).length < 4) {
    return null;
  }

  return (
    <aside className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-8">
      <nav aria-label="Table of contents" className="text-sm">
        <p className="font-semibold text-white mb-3">On this page</p>
        <ol className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={heading.level === 3 ? "ml-4" : ""}
            >
              <Link
                href={`#${heading.id}`}
                className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
              >
                <ChevronRight className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                {heading.text}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}