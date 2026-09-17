import Link from "next/link";
import { BLOG_AUTHOR } from "@/lib/author";

export function AuthorByline() {
  return (
    <div className="text-sm text-slate-300">
      By{" "}
      <Link href={BLOG_AUTHOR.path} rel="author" className="font-semibold text-cyan-400 underline underline-offset-4 hover:text-cyan-300">
        {BLOG_AUTHOR.name}
      </Link>
      <span className="text-slate-400"> · {BLOG_AUTHOR.jobTitle}, Islah Web Service</span>
    </div>
  );
}
