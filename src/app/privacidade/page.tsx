import { Icon } from "@/components/icon";
import type { Metadata } from "next";
import { PageIntro } from "@/components/ui";
import { whatsapp } from "@/lib/site";
export const metadata: Metadata = {
  title: "Privacidade",
  description:
    "Informações sobre o formulário, serviços externos e privacidade no site Ebony.",
  alternates: { canonical: "/privacidade" },
  robots: { index: false, follow: true },
};
export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        label="Transparência · Privacidade"
        title="Cuidado também com os seus dados."
      />
      <article className="privacy wrap">
        <h2>Formulários de contato</h2>
        <p>
          Ao enviar uma solicitação, os dados são validados no navegador e no
          servidor e encaminhados ao HubSpot, utilizado pela Ebony para
          registrar contatos e responder ao pedido. A hospedagem do site é feita
          pela Netlify. O formulário só mostra confirmação quando o serviço de
          recebimento aceita a solicitação.
        </p>
        <p>
          Os campos previstos são nome, e-mail, telefone, interesse, organização
          e localização aproximada opcionais, estágio e mensagem. Não informe
          documentos, dados sensíveis ou informações de terceiros.
        </p>
        <h2>Finalidade</h2>
        <p>
          Os dados são utilizados para responder a solicitações de orçamento,
          parceria ou garantia. A concordância no formulário se refere a esse
          atendimento e não inscreve o visitante em comunicações promocionais.
          Para solicitar acesso, correção ou exclusão de seus dados, entre em
          contato pelo canal indicado abaixo.
        </p>
        <h2>Navegação e serviços externos</h2>
        <p>
          Esta implementação não inclui ferramentas de publicidade ou pixels
          analíticos. Fontes e imagens são servidas pelo próprio site. A
          hospedagem pode gerar registros técnicos de acesso.
        </p>
        <p>
          Os links de WhatsApp e Instagram abrem serviços externos, sujeitos às
          respectivas políticas. Os links de WhatsApp contêm apenas uma mensagem
          genérica sobre o interesse; não incluem os dados preenchidos no
          formulário.
        </p>
        <h2>Segurança e limitações</h2>
        <p>
          O endpoint usa validação de campos, limite de tamanho, verificação de
          origem, campo antiabuso e limitação temporária de tentativas em
          memória. O conteúdo dos formulários não é incluído nos logs da
          aplicação. Em caso de falha, a tela não informa que houve recebimento.
        </p>
        <h2>Contato e direitos</h2>
        <p>
          Para esclarecer este aviso ou solicitar o canal responsável por
          privacidade, converse com a equipe pelo{" "}
          <a
            className="text-link"
            href={whatsapp()}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp da Ebony <Icon direction="diagonal" />
          </a>
          .
        </p>
      </article>
    </>
  );
}
