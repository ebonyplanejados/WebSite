import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/content/projects";
import { solutions } from "@/content/solutions";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/projetos",
    "/solucoes",
    "/o-atelier",
    "/para-arquitetos",
    "/para-corretores",
    "/contato",
    ...projects.map((p) => `/projetos/${p.slug}`),
    ...solutions.map((s) => `/solucoes/${s.slug}`),
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
