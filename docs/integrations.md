# Atendimento, privacidade e HubSpot

## Fluxo proposto

O canal operacional é o WhatsApp confirmado pelo usuário. As mensagens têm contexto fixo (residencial, comercial, corporativo, arquitetos ou corretores). Nenhum dado do formulário é colocado em URL pública. O link abre o aplicativo; o usuário decide enviar a mensagem.

`POST /api/leads` valida os dados e encaminha a solicitação pela Forms API do HubSpot para o portal 51830034. O formulário no HubSpot precisa estar publicado, com o GUID configurado em `HUBSPOT_FORM_GUID` no ambiente de execução. Se faltar configuração, a rota devolve HTTP 503; se o HubSpot recusar, devolve falha. Apenas uma resposta 2xx do HubSpot produz confirmação. Não há persistência local, anexos nem logs de conteúdo pessoal.

O formulário HubSpot deve conter os campos de contato `email`, `firstname`, `lastname`, `phone`, `company` e `message` (somente e-mail, nome, telefone e mensagem obrigatórios). O campo `message` recebe a necessidade e, antes dela, tipo, etapa, localização e página de origem. O consentimento para processamento deve corresponder ao texto do site; não cadastrar assinatura de marketing. O formulário cria ou atualiza contato por e-mail e preserva o histórico de submissões; não classifica automaticamente o visitante como parceiro e não cria negócio.

## Proteções implementadas

Validação no cliente e no servidor, normalização do e-mail, tamanho máximo real de 16 KiB lido do stream, mensagem limitada a 3000 caracteres, recusa de JSON inválido, origem comparada ao Host público, recusa de cross-site, respostas sem cache, honeypot e até cinco tentativas por minuto por identidade efêmera em memória. Logs de PII não foram implementados. Não existe CORS aberto.

A identidade antiabuso prioriza `x-nf-client-connection-ip`, inserido pelo Netlify; fora da plataforma, o fallback `x-forwarded-for` não é uma identidade confiável. O limite é por processo e não persiste em reinicializações ou entre funções serverless. Antes de habilitar coleta, configurar limites gerenciados na borda ou armazenamento compartilhado com expiração; confirmar o contrato dos headers do provedor e monitorar abusos sem guardar conteúdo de formulários. O limite atual não é uma proteção distribuída completa.

## Ativação e verificação

1. Publicar e configurar o formulário HubSpot com os seis campos e consentimento acima. Copiar o GUID para a variável `HUBSPOT_FORM_GUID` no Netlify (escopo Functions/Runtime), sem colocá-lo em código público.
2. Revisar o texto público de privacidade com a Ebony, incluindo responsável, retenção e canal de direitos antes de publicar a coleta.
3. Fazer deploy de preview e testar resposta 2xx e rejeição do HubSpot. Conferir o contato criado, os campos, a atividade de submissão e o caso de e-mail já existente sem sobrescrever a categoria de parceria.
4. Publicar e repetir um envio real autorizado. Tratar falhas e spam pelo painel de formulários do HubSpot. A confirmação exibida no site significa aceite da Forms API; o `receiptId` é um identificador local para a tela, não um ID de contato HubSpot.

O portal e as propriedades de contato foram conferidos no HubSpot. A integração usa o endpoint público de submissão de formulário e não exige token privado no site. Ela depende do GUID de um formulário publicado no portal e dos campos configurados com os mesmos nomes internos.
