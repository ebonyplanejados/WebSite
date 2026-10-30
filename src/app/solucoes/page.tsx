import type { Metadata } from "next";
import Image from "next/image";
import { solutions } from "@/content/solutions";
import { PageIntro, Eyebrow, TextLink, Conversion } from "@/components/ui";
export const metadata: Metadata = {
  title: "Soluções em marcenaria",
  description:
    "Marcenaria residencial, comercial e corporativa em Brasília. Conheça as possibilidades de execução sob medida da Ebony.",
  alternates: { canonical: "/solucoes" },
};
export default function SolutionsPage() {
  return (
    <>
      <PageIntro
        label="Soluções · Cada espaço, uma intenção"
        title="Sob medida para o que importa."
      >
        <p>
          A função orienta. A matéria dá forma. Desenvolvemos a execução de
          marcenaria em diálogo com cada necessidade.
        </p>
      </PageIntro>
      <section className="solution-cards wrap">
        {solutions.map((s) => (
          <article className="solution-card" key={s.slug}>
            <div className="solution-card-image">
              {s.image ? (
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 50vw"
                />
              ) : (
                <div className="material-art">
                  <span>TRAÇO / MATÉRIA / FUNÇÃO</span>
                </div>
              )}
            </div>
            <div className="solution-card-content">
              <Eyebrow>
                {s.number} — {s.title}
              </Eyebrow>
              <h2>{s.phrase}</h2>
              <p>{s.description}</p>
              <TextLink href={`/solucoes/${s.slug}`}>
                Explorar {s.title.toLowerCase()}
              </TextLink>
            </div>
          </article>
        ))}
      </section>
      <Conversion />
    </>
  );
}
