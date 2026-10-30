# Atendimento, privacidade e HubSpot

## Estado atual

O canal operacional é o WhatsApp confirmado pelo usuário. As mensagens têm contexto fixo (residencial, comercial, corporativo, arquitetos ou corretores). Nenhum dado do formulário é colocado em URL pública. O link abre o aplicativo; o usuário decide enviar a mensagem.

Os formulários são interfaces de avaliação, avisadas antes dos campos. O botão verifica a disponibilidade do envio. `POST /api/leads` valida os dados e devolve HTTP 503 `INTEGRATION_UNAVAILABLE` após chamar o adaptador indisponível. Não há persistência, chamada ao CRM nem sucesso fictício. Nenhum dado pessoal é registrado pela aplicação. Não são aceitos anexos.

## Proteções implementadas

Validação no cliente e no servidor, normalização do e-mail, tamanho máximo real de 16 KiB lido do stream, mensagem limitada a 3000 caracteres, recusa de JSON inválido, origem comparada ao Host público, recusa de cross-site, respostas sem cache, honeypot e até cinco tentativas por minuto por identidade efêmera em memória. Logs de PII não foram implementados. Não existe CORS aberto.

A identidade antiabuso prioriza `x-nf-client-connection-ip`, inserido pelo Netlify; fora da plataforma, o fallback `x-forwarded-for` não é uma identidade confiável. O limite é por processo e não persiste em reinicializações ou entre funções serverless. Antes de habilitar coleta, configurar limites gerenciados na borda ou armazenamento compartilhado com expiração; confirmar o contrato dos headers do provedor e monitorar abusos sem guardar conteúdo de formulários. O limite atual não é uma proteção distribuída completa.

## Ativação futura

1. Aprovar política, finalidade, responsável, retenção e consentimento/base legal com a empresa.
2. Consultar o esquema real do portal HubSpot autorizado. Não presumir IDs de portal, formulário ou propriedades customizadas.
3. Implementar `LeadAdapter.submit` em `src/lib/leads.ts` exclusivamente no servidor; guardar credenciais no provedor, nunca como `NEXT_PUBLIC_*`.
4. Definir mapeamento aprovado de origem (`source`), intenção (`type`), perfil de parceiro, consentimento e data. Deduplicar com identificador confiável, normalmente e-mail normalizado, conforme a política do CRM.
5. Não criar negócios automaticamente, nem disparar mensagens. Implementar idempotência e tratamento de falhas antes de habilitar envios reais.
6. Só devolver `received: true` e `receiptId` após recebimento/processamento efetivo. Revisar os textos do formulário e da privacidade para refletir o tratamento real.
7. Validar um contato de teste autorizado no ambiente de teste, conferir mapeamento/deduplicação e remover dados de teste conforme política definida.

Nenhum esquema ou credencial HubSpot foi disponibilizado nesta sessão. Não há motivo para pedir token no chat. A conexão deve ocorrer por integração autorizada ou variáveis seguras do provedor quando o mapeamento for definido.
