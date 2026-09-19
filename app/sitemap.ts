import type { MetadataRoute } from "next";
import { getMachineIndex } from "@/lib/machine-index";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return (await getMachineIndex()).map(({ url, lastModified, images, changeFrequency, priority }) => ({
    url,
    lastModified,
    images,
    changeFrequency,
    priority,
  }));
}
