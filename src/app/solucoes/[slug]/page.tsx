import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { solutions } from "@/content/solutions";
import {
  PageIntro,
  Eyebrow,
  EditorialImage,
  Conversion,
  TextLink,
} from "@/components/ui";
export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = solutions.find((s) => s.slug === slug);
  return s
    ? {
        title: `Marcenaria ${s.title.toLowerCase()} em Brasília`,
        description: s.description,
        alternates: { canonical: `/solucoes/${slug}` },
      }
    : {};
}
export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = solutions.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <>
      <PageIntro label={`Soluções · ${s.title}`} title={s.phrase}>
        <p>{s.description}</p>
      </PageIntro>
      <div className="wrap">
        {s.image ? (
          <EditorialImage src={s.image} alt={s.alt} priority />
        ) : (
          <div className="material-art" style={{ minHeight: 420 }}>
            <span>ORGANIZAÇÃO · MATÉRIA · PRECISÃO</span>
          </div>
        )}
      </div>
      <section className="split-editorial wrap">
        <div>
          <Eyebrow>Possibilidades de execução</Eyebrow>
          <h2>
            Uma solução começa
            <br />
            na escuta.
          </h2>
          <p style={{ marginTop: 30 }}>
            O ponto de partida é entender o uso do ambiente e a intenção do
            projeto. Materiais, ferragens, dimensões e acabamentos são avaliados
            antes de compor a proposta.
          </p>
          <TextLink href={`/contato?tipo=${s.slug}`}>
            Conversar sobre esta solução
          </TextLink>
        </div>
        <ol className="numbered-list">
          {s.items.map((item, i) => (
            <li key={item}>
              <span>0{i + 1}</span>
              <div>
                <h3>{item}</h3>
                <p>
                  Execução sob medida, com possibilidades e especificações
                  definidas após avaliação técnica.
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <Conversion context={s.slug} />
    </>
  );
}
