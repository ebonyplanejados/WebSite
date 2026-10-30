import type { Metadata } from "next";
import {
  PageIntro,
  Eyebrow,
  EditorialImage,
  Conversion,
} from "@/components/ui";
export const metadata: Metadata = {
  title: "O Ateliê — filosofia e processo",
  description:
    "Conheça o olhar Ebony: marcenaria sob medida com rigor técnico, cuidado artesanal e respeito à autoria de arquitetos e designers.",
  alternates: { canonical: "/o-atelier" },
};
const steps = [
  [
    "Escuta",
    "Entendemos o ambiente, a intenção criativa e as necessidades de uso. O diálogo orienta cada etapa.",
  ],
  [
    "Detalhamento",
    "Avaliamos dimensões, materiais e possibilidades de execução em conjunto com os responsáveis pelo projeto.",
  ],
  [
    "Fabricação",
    "A precisão técnica acompanha o cuidado com os painéis, as composições e os acabamentos definidos.",
  ],
  [
    "Montagem",
    "O olhar se volta ao ambiente: encaixes, ajustes e conferência da execução conforme o escopo contratado.",
  ],
];
export default function AtelierPage() {
  return (
    <>
      <PageIntro
        label="O Ateliê · A essência Ebony"
        title="Interpretar. Materializar. Cuidar."
      >
        <p>
          Somos uma empresa de execução de marcenaria sob medida em Brasília. O
          nosso trabalho começa onde uma intenção pede matéria.
        </p>
      </PageIntro>
      <div className="wrap">
        <EditorialImage
          src="/images/cafe-marcenaria.webp"
          alt="Detalhes de balcão e nichos do portfólio institucional Ebony"
          priority
        />
      </div>
      <section className="split-editorial wrap">
        <div>
          <Eyebrow>Nosso manifesto</Eyebrow>
          <h2>
            Ser a extensão
            <br />
            do seu traço.
          </h2>
        </div>
        <div>
          <p>
            Projetar é dar forma à identidade de alguém. Por trás de cada linha,
            existe um compromisso com a função e com a estética.
          </p>
          <p>
            Na Ebony, tratamos essa intenção com rigor técnico e cuidado
            artesanal. A escolha dos materiais, o detalhamento e a atenção ao
            acabamento são partes de um mesmo compromisso.
          </p>
          <p>
            Trabalhamos em diálogo com arquitetos e designers. A autoria do
            projeto pertence a quem o concebe; à Ebony cabe cuidar de sua
            materialização em marcenaria.
          </p>
        </div>
      </section>
      <section id="processo" className="process-page">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <Eyebrow>Do primeiro diálogo ao ajuste final</Eyebrow>
              <h2>O cuidado é um processo.</h2>
            </div>
          </div>
          <div className="process-steps">
            {steps.map(([title, text], i) => (
              <article className="process-step" key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Conversion />
    </>
  );
}
