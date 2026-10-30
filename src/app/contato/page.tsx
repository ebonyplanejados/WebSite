import { Icon } from "@/components/icon";
import type { Metadata } from "next";
import { PageIntro, Eyebrow } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { leadTypes, type LeadType } from "@/lib/lead-validation";
import { site, whatsapp } from "@/lib/site";
export const metadata: Metadata = {
  title: "Contato e orçamento de marcenaria",
  description:
    "Converse com a Ebony sobre seu projeto em Brasília. Solicite orçamento residencial, comercial ou corporativo, ou conheça nossas parcerias.",
  alternates: { canonical: "/contato" },
};
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string; assunto?: string }>;
}) {
  const query = await searchParams;
  const type = query.assunto === "garantia" ? "garantia" : query.tipo;
  const selected: LeadType = leadTypes.includes(type as LeadType)
    ? (type as LeadType)
    : "residencial";
  return (
    <>
      <PageIntro
        label="Contato · A conversa é o primeiro traço"
        title="O que você quer materializar?"
      >
        <p>
          Compartilhe a intenção do seu projeto. Vamos conversar sobre
          possibilidades, materiais e próximos passos.
        </p>
      </PageIntro>
      <section className="form-section wrap">
        <div className="form-aside">
          <Eyebrow>Atendimento Ebony</Eyebrow>
          <h2>
            Uma ideia.
            <br />
            Muitas possibilidades.
          </h2>
          <p>
            Atendemos projetos em Brasília e no Distrito Federal. O escopo e a
            viabilidade são avaliados em uma conversa com a equipe.
          </p>
          <div className="contact-details">
            <p className="eyebrow">Contato direto</p>
            <a href={whatsapp(selected)} target="_blank" rel="noreferrer">
              {site.phone} <Icon direction="diagonal" />
            </a>
            <a href={site.instagram} target="_blank" rel="noreferrer">
              @ebony_planejados <Icon direction="diagonal" />
            </a>
            <p>
              Para falar agora, utilize o WhatsApp. Não há envio de arquivos
              pelo formulário nesta versão.
            </p>
          </div>
        </div>
        <ContactForm key={selected} defaultType={selected} />
      </section>
    </>
  );
}
