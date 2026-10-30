# Progresso e validação

## Entrega implementada

| Fase do briefing         | Resultado                                                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Auditoria                | Dois PDFs e briefing lidos; cinco imagens e marca extraídas; fontes e lacunas documentadas                           |
| Referências              | Consultas às cinco URLs bloqueadas por 403 do proxy; princípios do briefing registrados sem alegar observação visual |
| Sistema visual           | Paleta oficial, famílias locais, escala tipográfica, grid responsivo, componentes e ícones SVG                       |
| Homepage                 | Hero fotográfico, manifesto, seleção de ambientes, soluções, processo, arquitetos, garantia condicionada e conversão |
| Portfólio                | Quatro entradas estruturadas, filtros funcionais, estado vazio corporativo e galerias com teclado                    |
| Soluções e institucional | Três soluções, visão geral, Ateliê e processo                                                                        |
| Parcerias                | Páginas e formulários separados para arquitetos/designers e corretores/imobiliárias                                  |
| Contato                  | WhatsApp confirmado e contextual; formulário validado, adaptador CRM explicitamente indisponível                     |
| SEO e segurança          | Metadados por rota, canonical, sitemap, robots, JSON-LD de organização, headers e proteções do endpoint              |
| Documentação             | Instalação, conteúdo, licenças de fontes, integração, Netlify e pendências                                           |
| Publicação               | Build preparado; Netlify e domínio ainda não publicados nem validados remotamente                                    |

## Evidências nesta máquina

- `npm run build`: passou, Next.js 16.4.3 / webpack, geração de 20 páginas/entradas estáticas e rotas dinâmicas indicadas no relatório do build.
- `npm run lint`: passou sem avisos.
- `npm run typecheck`: passou.
- `npm test`: 11 testes executados, 11 passaram; validação, adaptador, categorias, WhatsApp e proteções do endpoint real.
- Playwright: 14 testes executados, 14 passaram. Suíte desktop/mobile de navegação e comportamento, incluindo 15 páginas editoriais, filtros, galeria, formulário/503, SEO, links, 404 e axe. Duas verificações adicionais cobrem larguras de 320, 768, 1024 e 1920 px.
- `npm ci --no-audit --no-fund`: instalação reproduzível validada após a geração do lockfile.
- Workflow GitHub Actions incluído para repetir build e verificações em pushes e PRs. A execução remota do workflow depende do GitHub; não foi apresentada como validada localmente.
- axe: nenhuma violação detectada nas páginas selecionadas (início, projetos, contato, arquitetos e privacidade), além do menu mobile. Isso não substitui auditoria manual completa WCAG.
- Capturas completas desktop/mobile geradas em `test-results/`, fora do controle de versão; direção visual revisada durante a implementação.
- `npm audit --omit=dev --audit-level=high`: nenhuma vulnerabilidade reportada nas dependências de produção na consulta realizada.

## Correções realizadas durante a verificação

O primeiro build foi bloqueado pelo sandbox ao executar subprocessos TypeScript; recompilação com execução autorizada passou. O runner de testes no sandbox mostrou apenas uma entrada de arquivo, insuficiente como validação; a execução real confirmou todos os 11 testes. A origem do formulário foi ajustada para comparar o Host público, pois o endereço interno do Next.js difere atrás de proxy. A imagem animada do hero recebeu recorte para impedir transbordamento durante a entrada. Setas Unicode ausentes em fontes foram substituídas por SVG. A captura passou a solicitar imagens lazy antes de aguardar sua decodificação.

## Limites da conclusão

Esta é uma versão implementada e testada para avaliação, não um lançamento comercial integralmente aprovado. Não há conexão HubSpot, envio real de leads, confirmação independente de direitos/autenticidade das fotos, ficha técnica de projetos, política jurídica definitiva, benchmark visual externo, teste em Safari físico, medição de Core Web Vitals em produção ou deploy Netlify verificado.

As metas LCP ≤ 2,5 s, INP ≤ 200 ms e CLS ≤ 0,1 permanecem metas, não resultados medidos. Imagens WebP, prioridade no hero, fontes locais, dimensões reservadas e JavaScript limitado preparam essa avaliação. Medir no deploy real e em dispositivos/conexões representativos antes de afirmar desempenho de campo.

Consulte `content-inventory.md` para os dados que precisam de confirmação e `deployment.md` para os passos de publicação. A indexação fica desativada por padrão; nenhuma alteração de DNS ou publicação de produção foi feita.
