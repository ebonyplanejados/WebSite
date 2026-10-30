import { Icon } from "@/components/icon";
import type { Metadata } from "next";
import { PageIntro, Eyebrow, TextLink } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { whatsapp } from "@/lib/site";
export const metadata: Metadata = {
  title: "Para corretores e imobiliárias",
  description:
    "Conheça a proposta de relacionamento da Ebony para corretores e imobiliárias: marcenaria sob medida após a compra ou entrega do imóvel.",
  alternates: { canonical: "/para-corretores" },
};
const steps = [
  [
    "A apresentação",
    "Você apresenta a Ebony à pessoa interessada, respeitando sua autorização e seus dados de contato.",
  ],
  [
    "A avaliação",
    "A equipe conversa com o interessado e entende as necessidades de marcenaria do imóvel.",
  ],
  [
    "A proposta",
    "A Ebony avalia o escopo, elabora a proposta e conduz a eventual contratação diretamente.",
  ],
  [
    "O relacionamento",
    "Condições comerciais de indicação são discutidas entre as partes. A indicação, por si só, não garante contratação nem remuneração.",
  ],
];
export default function BrokersPage() {
  return (
    <>
      <PageIntro
        label="Para corretores e imobiliárias"
        title="A entrega das chaves é só o começo."
      >
        <p>
          Depois da escolha do imóvel, vem a oportunidade de torná-lo pessoal. A
          marcenaria sob medida faz parte dessa nova etapa.
        </p>
      </PageIntro>
      <section className="partner-hero">
        <div>
          <Eyebrow>Conexões que fazem sentido</Eyebrow>
          <h2>
            Um novo espaço.
            <br />
            Uma nova forma de viver.
          </h2>
          <p>
            Aproxime seus clientes de uma conversa sobre as possibilidades do
            imóvel, com soluções avaliadas conforme a necessidade de cada
            ambiente.
          </p>
          <TextLink href="#parceria">Conhecer a parceria</TextLink>
        </div>
        <div className="material-art">
          <span>HABITAR · PERSONALIZAR · PERTENCER</span>
        </div>
      </section>
      <section className="split-editorial wrap">
        <div>
          <Eyebrow>Um relacionamento transparente</Eyebrow>
          <h2>
            Da apresentação
            <br />à possibilidade.
          </h2>
          <p style={{ marginTop: 30 }}>
            Uma jornada simples, com papéis definidos e comunicação direta. As
            condições de parceria são negociadas individualmente.
          </p>
        </div>
        <ol className="numbered-list">
          {steps.map(([title, text], i) => (
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
          <Eyebrow>Vamos conversar</Eyebrow>
          <h2>
            Comece uma
            <br />
            nova conexão.
          </h2>
          <p>
            Apresente seu perfil de atuação. Para esta primeira conversa, não é
            necessário compartilhar dados pessoais de clientes.
          </p>
          <a
            className="text-link"
            href={whatsapp("corretores")}
            target="_blank"
            rel="noreferrer"
          >
            Falar sobre parceria{" "}
            <span aria-hidden="true">
              <Icon direction="diagonal" />
            </span>
          </a>
        </div>
        <ContactForm defaultType="corretores" partner />
      </section>
    </>
  );
}
