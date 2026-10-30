# Publicação no Netlify

## Preparação entregue

Next.js 16, React 19, Node 24 e lockfile npm. `netlify.toml` define build `npm run build`, diretório `.next`, Node 24 e telemetria de build desativada. O Netlify detecta Next.js e utiliza seu adaptador OpenNext mantido. Não adicionar redirecionamento SPA para `/index.html` e não usar exportação estática: `/api/leads` e a página de contato utilizam execução no servidor.

Build e execução Next foram testados na máquina local. O runtime Netlify, suas funções, headers, otimização de imagens e CDN ainda precisam de verificação após um deploy autorizado. A presença do arquivo de configuração não equivale a uma publicação.

## Conectar e revisar

1. No Netlify, importar `ebonyplanejados/WebSite` e selecionar `main` após conferir os commits enviados. Aprovar somente as permissões necessárias ao repositório.
2. Conferir build `npm run build`, publish `.next` e Node 24. Não é necessário banco de dados ou segredo para a versão de avaliação.
3. Configurar `NEXT_PUBLIC_SITE_URL` com a URL exata do site ou preview e `SITE_INDEXABLE=false`. Definir a URL antes do build, pois canonical/sitemap e metadados estáticos são gerados nessa etapa.
4. Para previews de branches/PRs, usar a URL correspondente e manter `SITE_INDEXABLE=false`; não herdar indexação de produção. Uma variável `NEXT_PUBLIC_*` usada em páginas estáticas exige rebuild quando muda.
5. Revisar preview: todas as rotas, 404, sitemap, robots, imagens otimizadas, menu, teclado, galerias e formulário. Confirmar retorno 503 honesto enquanto CRM estiver desativado. Conferir headers de segurança, HTTPS e ausência de logs de PII.
6. Resolver as pendências de conteúdo e privacidade listadas no inventário. Se optar por lançar apenas com WhatsApp, ajustar a área de formulário e sua política com aprovação explícita, sem prometer envio ao CRM.

## Produção e domínio

O briefing exige autorização antes de deploy de produção. Não alterar DNS nem criar redirecionamentos sem autorização específica. O domínio pretendido é `ebonyplanejados.com`; o segundo domínio não foi informado.

Após aprovação: adicionar domínio no Netlify, seguir os registros DNS exatos que a plataforma fornecer, aguardar propagação e emissão do certificado. Definir host canônico, redirecionar sua variante `www` conforme configuração real, testar HTTPS e cadeia de redirecionamentos. Não inventar IPs ou registros DNS.

Somente depois de validar conteúdo, direitos, privacidade e domínio, definir `NEXT_PUBLIC_SITE_URL=https://ebonyplanejados.com` e `SITE_INDEXABLE=true`, refazer o build e conferir canonical, robots e sitemap publicados. A página de privacidade de avaliação permanece noindex até ser substituída por versão jurídica final.

## Acesso e rollback

Não foram disponibilizadas ferramentas Netlify nem variáveis Netlify neste ambiente. Não há deploy remoto verificado. Git utiliza autenticação da plataforma; o sucesso de leitura não prova autorização de push. Registrar o resultado real do envio no relatório final.

Em produção, usar o histórico de deploys do Netlify para restaurar um deploy previamente aprovado. Não fazer force push. Credenciais pertencem às configurações seguras da plataforma, nunca ao repositório.
