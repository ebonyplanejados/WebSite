import { Icon } from "@/components/icon";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { PageIntro, EditorialImage, Conversion } from "@/components/ui";
import { Gallery } from "@/components/gallery";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p
    ? {
        title: p.title,
        description: p.description,
        alternates: { canonical: `/projetos/${p.slug}` },
        openGraph: {
          title: p.title,
          description: p.description,
          images: [{ url: p.image, alt: p.alt }],
        },
      }
    : {};
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <>
      <PageIntro label={`${p.category} · Seleção do portfólio`} title={p.title}>
        <p>{p.description}</p>
      </PageIntro>
      <div className="wrap project-hero">
        <EditorialImage src={p.image} alt={p.alt} priority />
      </div>
      <section className="project-detail wrap">
        <dl className="project-facts">
          <div>
            <dt>Tipologia</dt>
            <dd>{p.category}</dd>
          </div>
          <div>
            <dt>Especialidade</dt>
            <dd>Marcenaria sob medida</dd>
          </div>
          <div>
            <dt>Acervo</dt>
            <dd>Portfólio institucional Ebony</dd>
          </div>
          {p.location && (
            <div>
              <dt>Localização</dt>
              <dd>{p.location}</dd>
            </div>
          )}
        </dl>
        <div className="project-narrative">
          <p>
            A execução é um encontro entre as escolhas do projeto e as
            possibilidades dos materiais.
          </p>
          <ul>
            {p.details
              .filter((d) => !d.includes("Categoria editorial"))
              .map((d) => (
                <li key={d}>{d}</li>
              ))}
          </ul>
          <p className="credit-note">
            Imagens fornecidas no portfólio Ebony. Título editorial descritivo.
            Créditos de arquitetura e fotografia não informados no material; a
            autoria arquitetônica não é atribuída à Ebony.
          </p>
        </div>
      </section>
      <section className="wrap" aria-label="Fotografias do ambiente">
        <Gallery images={p.images} />
        <Link className="text-link back-link" href="/projetos">
          <Icon direction="left" /> Voltar para os projetos
        </Link>
      </section>
      <Conversion context={p.category.toLowerCase()} />
    </>
  );
}
