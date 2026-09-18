import type { MetadataRoute } from "next";
import { getMachineIndex } from "@/lib/machine-index";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return (await getMachineIndex()).map(({ url, changeFrequency, priority }) => ({
    url,
    changeFrequency,
    priority,
  }));
}
