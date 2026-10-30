import { Icon } from "@/components/icon";
import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro, Eyebrow, TextLink } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { whatsapp } from "@/lib/site";
export const metadata: Metadata = {
  title: "Para arquitetos e designers",
  description:
    "Parceria de marcenaria para arquitetos e designers em Brasília. Interpretação técnica, diálogo e respeito à autoria do seu projeto.",
  alternates: { canonical: "/para-arquitetos" },
};
const points = [
  [
    "Diálogo técnico",
    "Um canal para avaliar o detalhamento, discutir possibilidades e alinhar a execução ao que o projeto pede.",
  ],
  [
    "Materiais e acabamentos",
    "Escolhas avaliadas em conjunto, considerando estética, uso e possibilidades de fabricação.",
  ],
  [
    "Respeito à autoria",
    "A intenção criativa permanece com o profissional. A marcenaria trabalha para materializá-la com cuidado.",
  ],
];
export default function ArchitectsPage() {
  return (
    <>
      <PageIntro
        label="Para quem projeta · Arquitetos e designers"
        title="A fidelidade ao seu traço começa no detalhe."
      >
        <p>
          Um projeto carrega escolhas que merecem ser compreendidas. A nossa
          parceria começa nessa escuta.
        </p>
      </PageIntro>
      <section className="partner-hero">
        <div>
          <Eyebrow>Uma extensão do seu olhar</Eyebrow>
          <h2>
            Da intenção criativa
            <br />à matéria.
          </h2>
          <p>
            A Ebony oferece diálogo técnico para avaliar a execução de soluções
            de marcenaria, com atenção aos materiais e ao acabamento.
          </p>
          <TextLink href="#parceria">Apresente seu projeto</TextLink>
        </div>
        <div>
          <Image
            src="/images/cafe-marcenaria.webp"
            alt="Balcão e exposição integrados em marcenaria do portfólio Ebony"
            fill
            sizes="(max-width: 760px) 100vw, 45vw"
          />
        </div>
      </section>
      <section className="split-editorial wrap">
        <div>
          <Eyebrow>Relações construídas com cuidado</Eyebrow>
          <h2>
            Mais proximidade.
            <br />
            Mais precisão.
          </h2>
          <p style={{ marginTop: 30 }}>
            Consulte nossa equipe sobre as condições de parceria. Escopo,
            responsabilidades e condições comerciais são tratados diretamente,
            caso a caso.
          </p>
        </div>
        <ol className="numbered-list">
          {points.map(([title, text], i) => (
            <li key={title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section id="parceria" className="form-section wrap">
        <div className="form-aside">
          <Eyebrow>Vamos nos conhecer</Eyebrow>
          <h2>
            Um café técnico.
            <br />
            Novas possibilidades.
          </h2>
          <p>
            Conte sobre seu escritório ou sobre o projeto que deseja avaliar.
            Não envie informações confidenciais ou dados de clientes nesta
            primeira conversa.
          </p>
          <a
            className="text-link"
            href={whatsapp("arquitetos")}
            target="_blank"
            rel="noreferrer"
          >
            Conversar pelo WhatsApp{" "}
            <span aria-hidden="true">
              <Icon direction="diagonal" />
            </span>
          </a>
        </div>
        <ContactForm defaultType="arquitetos" partner />
      </section>
    </>
  );
}
