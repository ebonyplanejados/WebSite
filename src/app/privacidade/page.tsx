import { Icon } from "@/components/icon";
import type { Metadata } from "next";
import { PageIntro } from "@/components/ui";
import { whatsapp } from "@/lib/site";
export const metadata: Metadata = {
  title: "Privacidade — aviso da versão de avaliação",
  description:
    "Informações sobre o funcionamento dos formulários, serviços externos e privacidade nesta versão de avaliação do site Ebony.",
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
        <div className="review-notice">
          <strong>Versão de avaliação — revisão jurídica pendente</strong>
          <p>
            Este aviso descreve o funcionamento implementado nesta versão. A
            política definitiva precisa ser aprovada antes da ativação da coleta
            de contatos ou do lançamento comercial.
          </p>
        </div>
        <h2>Formulários nesta versão</h2>
        <p>
          A integração comercial ainda não está ativa. Os campos são validados
          no navegador e, ao verificar a disponibilidade de envio, também no
          servidor. O servidor informa a indisponibilidade; não registra leads
          em banco de dados nem os envia ao HubSpot. Não apresentamos
          confirmação de envio sem recebimento efetivo.
        </p>
        <p>
          Os campos previstos são nome, e-mail, telefone, interesse, organização
          e localização aproximada opcionais, estágio e mensagem. Não informe
          documentos, dados sensíveis ou informações de terceiros.
        </p>
        <h2>Finalidade e ativação futura</h2>
        <p>
          A finalidade pretendida é responder às solicitações de orçamento ou
          parceria. Antes de ativar o recebimento, a Ebony deverá definir e
          informar o responsável pelo tratamento, a base legal aplicável, os
          fornecedores envolvidos, os prazos de retenção e o canal para
          exercício dos direitos dos titulares. O campo de concordância desta
          versão não substitui essa definição.
        </p>
        <h2>Navegação e serviços externos</h2>
        <p>
          Esta implementação não inclui ferramentas de publicidade, pixels ou
          rastreadores analíticos. Fontes e imagens são servidas pelo próprio
          site. A hospedagem poderá gerar registros técnicos de acesso; a
          configuração e a retenção desses registros devem ser verificadas com o
          provedor na publicação.
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
          memória. Os dados dos formulários não são incluídos nos logs da
          aplicação. A infraestrutura de hospedagem e as políticas de retenção
          precisam ser revisadas antes da coleta real.
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
          . A definição do canal específico de privacidade, dos procedimentos de
          acesso, correção, exclusão e demais direitos será incluída na política
          final.
        </p>
      </article>
    </>
  );
}
