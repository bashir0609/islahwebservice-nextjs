import Image from "next/image";
import { contentImagesFor } from "@/lib/content-images";

interface ContentVisualsProps {
  pathname: string;
}

export function ContentVisuals({ pathname }: ContentVisualsProps) {
  const images = contentImagesFor(pathname);
  if (!images.length) return null;

  return (
    <section aria-label="Research process visuals" className="bg-slate-950 py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {images.map((image) => (
          <figure key={image.src} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70">
            <Image
              src={image.src}
              alt={image.alt}
              width={1200}
              height={675}
              loading="lazy"
              className="h-auto w-full"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
