# Historical snapshot — SOL404 — etapas 1 e 2

> **HISTORICAL SNAPSHOT — NOT CURRENT RELEASE GUIDANCE.** This document records an earlier iteration. Its counts, tests, diagrams, activities and patch instructions may have been superseded. Use [README.md](README.md), [QA-SISTEMAS.md](QA-SISTEMAS.md) and [SUBMISSION.md](SUBMISSION.md) for the current 17-record version. Preserve this file as history; do not apply its old patch instructions to the current source.

---

## Escopo entregue

Somente as etapas 1 (funcionamento mobile) e 2 (precisão científica). Base: projeto melhorado desta conversa, mantendo a hero lunar anteriormente escolhida. O ZIP de alterações contém apenas os arquivos destas duas etapas; o ZIP completo inclui também as melhorias anteriores.

## Etapa 1 — mobile

- A coluna do mapa deixa de impor a largura mínima do conteúdo ao grid.
- Rolagem horizontal limitada ao diagrama de Deep space; instrução visível em telas estreitas.
- Os controles de mundos e os links do cabeçalho também foram ajustados até 360px, após a verificação em 320px identificar excesso de largura.
- Alvos mínimos de 44px preservados.
- Em viewport de 375px: painel 328px; diagrama visível 322px; conteúdo rolável 640px; largura do documento 360px, igual à área útil após a barra vertical. Antes, o painel chegava a 646px.
- Conferidos 320, 375, 640, 768, 899, 900 e 1440px. Em 320px, após o ajuste adicional, a largura do documento e a área útil são ambas 305px.
- A rolagem interna chegou a 318px e o marcador de Pioneer abriu sua história.

## Etapa 2 — precisão

- PIA24127 permanece como capa, identificada como Illustration e com texto alternativo de ilustração artística, não fotografia.
- Mapas anotados recebem classificação própria, em vez de serem tratados como fotografias.
- Datas do catálogo NASA não são mais apresentadas automaticamente como datas de captura.
- A primeira foto de Viking (PIA00381) mostra explicitamente July 20, 1976. Demais imagens sem data de captura verificada deixam de exibir o ano do catálogo; datas já presentes nas descrições editoriais são preservadas.
- O cache da sessão recebe os metadados editoriais atuais: a correção não depende de o visitante limpar imagens antigas.
- Opportunity distingue 90 dias marcianos planejados, mais de 14 anos terrestres de operação, último contato em 10 de junho de 2018 e anúncio do encerramento em 13 de fevereiro de 2019. A metáfora de garantia foi retirada; fonte do relatório final adicionada.
- Viking distingue resultados experimentais, ausência de confirmação de vida e limites dessa conclusão. Deep dive contextualiza compostos orgânicos clorados, interpretação inicial como contaminação e reanálises posteriores envolvendo percloratos. Referência NASA Astrobiology adicionada.

## Fontes

- [PIA24127 — NASA](https://science.nasa.gov/photojournal/helicopter-above-perseverance-on-mars/)
- [PIA00381 — NASA Image Library](https://images.nasa.gov/details/PIA00381)
- [Opportunity — relatório final NASA](https://ntrs.nasa.gov/citations/20200000214)
- [Anúncio de encerramento de Opportunity](https://www.jpl.nasa.gov/news/nasas-opportunity-rover-mission-on-mars-comes-to-end/)
- [Viking 1 — NASA Science](https://science.nasa.gov/mission/viking-1/)
- [Viking Results Revisited — NASA Astrobiology](https://astrobiology.nasa.gov/news/viking-results-revisited/)

## Validação

- Build TypeScript + Vite: aprovado.
- ESLint, incluindo react-hooks: aprovado.
- Sete testes automatizados: aprovados. Três novos casos cobrem ano do catálogo, data de captura verificada e metadados em cache antigo; quatro testes anteriores de Horizons preservados.
- Navegador Chromium: verificação de medidas responsivas, rolagem interna, marcador Pioneer, classificação de Ingenuity, captura de Viking em 1976 e textos atualizados nos dois níveis de leitura.
- Não foram executados Safari, Firefox ou aparelhos físicos.
- Não houve publicação na Vercel.

## Aplicação

O ZIP de alterações mantém os caminhos relativos e deve ser aplicado sobre a versão melhorada já entregue nesta conversa. O arquivo STAGES-1-2.md documenta esta entrega; o teste novo deve ficar em tests/. Alternativamente, use o ZIP completo, sem node_modules/dist, e execute npm ci, npm test, npm run lint e npm run build com Node 24.

As etapas 3 a 6 continuam pendentes. Os relatórios AUDIT.md e CHANGES.md anteriores registram a entrega anterior; este documento registra as mudanças novas.
