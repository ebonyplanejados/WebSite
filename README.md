# Ebony — Digital Experience

Site institucional multipágina em português para Ebony Ambientes Planejados. Next.js App Router, React, TypeScript, CSS com tokens de marca e fontes locais. Fotografias extraídas do portfólio fornecido; nenhum ambiente foi gerado para preencher o acervo.

## Executar

Requer Node.js 24 e npm 11. Use o checkout existente em `/workspace/WebSite`; cada tarefa cloud já é isolada, não crie worktree sem solicitação.

```bash
cd /workspace/WebSite
npm ci
npm run dev
```

Para validar a versão de produção:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

`npm run dev` e `npm start` usam a porta 3000. Não execute dev e produção simultaneamente na mesma porta. Não refaça o build enquanto o servidor de produção ou testes E2E estiver usando `.next`.

## Testes no navegador

```bash
npm run build
npm run test:e2e
```

O Playwright inicia e encerra o servidor de produção automaticamente. O ambiente cloud possui `/usr/bin/chromium`. Em outras máquinas, execute `npx playwright install --with-deps chromium`; o runner usa esse navegador quando não existe Chromium do sistema. Você também pode informar um executável em `PLAYWRIGHT_CHROMIUM_EXECUTABLE`. O teste mobile usa Chromium com viewport e toque do iPhone 13; não equivale a um teste em Safari ou aparelho físico.

Os testes verificam as páginas editoriais, filtros, galerias/teclado, menu mobile, validação e envio confirmado simulado, links internos, 404, SEO básico, transbordamento horizontal e regras automatizadas de acessibilidade com axe. Capturas ficam em `test-results/home-desktop.png` e `home-mobile.png`, ignoradas no Git. Auditoria automática não é certificação WCAG nem medição de Core Web Vitals de usuários reais.

## Conteúdo e manutenção

- Projetos: `src/content/projects.ts`. Adicione ID e slug únicos, título, categoria, ordem, descrição e imagens com textos alternativos. Créditos e localização são opcionais e só devem ser preenchidos quando confirmados.
- Cada entrada gera automaticamente sua página e aparece nos filtros e no sitemap. Não é necessário duplicar componentes.
- Soluções: `src/content/solutions.ts`. As três páginas usam o mesmo template.
- Marca, WhatsApp e Instagram: `src/lib/site.ts`. Textos do manifesto e páginas institucionais ficam nas rotas correspondentes em `src/app`.
- Tokens, espaçamentos e breakpoints: `src/app/globals.css`. Fontes institucionais: veja a ressalva sobre Plus Jakarta em `docs/brand-foundation.md`.
- Imagens: `public/images/`. Prefira originais autorizados, preserve a proporção, exporte WebP, mantenha nomes legíveis e atualize `alt`. O hero deve ter resolução suficiente e `priority`; imagens abaixo da dobra carregam sob demanda.
- Logotipo: `public/brand/`. Substitua somente por versão oficial aprovada, preservando proporções e área de proteção. Favicon em `src/app/icon.png`.

## Variáveis

Consulte `.env.example`. Não é preciso segredo para visualizar o site. `NEXT_PUBLIC_SITE_URL` define a URL canônica e `SITE_INDEXABLE` deve permanecer `false` em avaliação e previews. Fontes e imagens não dependem de serviços externos.

## Atendimento

O WhatsApp está configurado com o número confirmado no chat. Os formulários enviam ao HubSpot pelo endpoint servidor `/api/leads` quando `HUBSPOT_FORM_GUID` estiver configurado com o ID de um formulário publicado no portal 51830034. Sem essa configuração, a API devolve HTTP 503 e não simula sucesso. Leia `docs/integrations.md` para configurar os campos, consentimento e verificar o recebimento antes de publicar.

## Hospedagem

Preparado para Netlify em `netlify.toml`; instruções completas em [docs/deployment.md](docs/deployment.md). Nenhuma configuração DNS é presumida. O prompt exige aprovação antes de publicação de produção.

## Documentação

[Fundação da marca](docs/brand-foundation.md), [inventário e pendências](docs/content-inventory.md), [benchmark e limitações](docs/benchmark.md), [integrações](docs/integrations.md), [publicação](docs/deployment.md), [progresso](docs/progress.md).
