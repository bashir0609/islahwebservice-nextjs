
import { Share2, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

type BlogShareProps = {
  title: string;
  absoluteUrl: string;
};

export default function BlogShare({ title, absoluteUrl }: BlogShareProps) {
  const encodedUrl = encodeURIComponent(absoluteUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
        <Share2 className="h-4 w-4" />
        Share
      </span>
      <Button asChild size="sm" variant="outline" className="gap-2">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Twitter className="h-4 w-4" />
          Share on X
        </a>
      </Button>
      <Button asChild size="sm" variant="outline" className="gap-2">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Linkedin className="h-4 w-4" />
          Share on LinkedIn
        </a>
      </Button>
    </div>
  );
}
