# Historical snapshot — SOL404 — etapas 5 e 6

> **HISTORICAL SNAPSHOT — NOT CURRENT RELEASE GUIDANCE.** This document records an earlier iteration. Its counts, tests, diagrams, activities and patch instructions may have been superseded. Use [README.md](README.md), [QA-SISTEMAS.md](QA-SISTEMAS.md) and [SUBMISSION.md](SUBMISSION.md) for the current 17-record version. Preserve this file as history; do not apply its old patch instructions to the current source.

---

## Estado da entrega

- Etapa 5: implementada e testada.
- Etapa 6, validação técnica local: realizada nos limites descritos abaixo.
- Etapa 6, avaliação com estudantes/professor: pendente. O autor informou que não há participantes disponíveis. O roteiro PEDAGOGICAL-TEST-PLAN.md está preparado, sem resultados inventados.
- Etapa 6, publicação: pendente por falta de acesso verificável à conta dona do projeto. Não houve publicação.

## Investigações implementadas

Cada história tem três alternativas e uma explicação própria para cada escolha. A ação Check my reasoning fica desativada até haver uma seleção. Trocar de alternativa limpa o feedback antigo. O visitante pode tentar novamente; não há cronômetro, pontuação ou envio das respostas a um servidor.

| História | Decisão e objetivo |
| --- | --- |
| Eagle | Relacionar separação de estágios com redução de massa no retorno. |
| Lunar Roving Vehicles | Conectar amostras aos locais e registros de coleta. |
| Viking 1 | Distinguir reação química, confirmação de vida e limites de uma conclusão. |
| Opportunity | Escolher evidências geológicas que sustentam interpretações sobre água no passado. |
| Ingenuity | Julgar uma demonstração pelos objetivos e registros, distinguindo êxito de missão e estado atual. |
| Pioneer 10 | Distinguir modelo de trajetória de uma nova transmissão de rádio. |

As respostas usam fontes NASA já relacionadas ao conteúdo. Deep dive acrescenta uma explicação técnica. Mudar o modo de leitura preserva a tentativa; mudar de história inicia uma atividade nova. Os controles são radios nativos, agrupados com legenda, e o feedback usa uma região de estado acessível. Nenhuma atividade pretende ser uma simulação física quantitativa.

## Verificação realizada

- npm test: 16 testes aprovados, incluindo cobertura das seis investigações, identificação de alternativas inválidas, URLs, metadados das imagens e respostas controladas de erro dos proxies NASA.
- Build TypeScript + Vite e ESLint aprovados na implementação das atividades. Build e lint repetidos no fechamento do pacote.
- Navegador Chromium: todas as 18 alternativas das seis atividades foram selecionadas e submetidas. A classificação e a explicação corresponderam à escolha; nenhum feedback antigo permaneceu após mudança de alternativa.
- Confirmados preservação da tentativa na troca para Deep dive, explicação adicional e reinício ao seguir para outra história.
- Em 375px, a atividade de Viking foi concluída com Space, setas, Tab e Enter. O feedback científico apareceu e o diálogo permaneceu usável.
- Etapas anteriores preservadas: conteúdo e fontes, hero lunar, navegação por seções, cronologia corrigida e gráfico com rolagem interna.
- Não foram realizados testes com estudantes, professor, leitor de tela externo, Safari ou Firefox. Não se declara eficácia pedagógica comprovada nem conformidade integral WCAG.

## Publicação e acesso

A conexão inicial tinha acesso à equipe ENRICOLANDIA, sem localizar SOL404. A consulta ao escopo rzndd retornou 403. Após a tentativa de reconexão pelo autor, a integração passou a retornar Unknown tool para consultas do projeto e de equipes, antes de verificar a autorização. O navegador também não oferecia acesso ao projeto na sessão disponível. A CLI não estava instalada/autenticada.

Não foi criado projeto substituto nem alterado domínio, configuração, conta ou implantação existente. A publicação no sol404.vercel.app exige recuperar uma conexão funcional com a conta/equipe proprietária, confirmar o projeto e testar a implantação antes de promover a produção.

## Pacotes

O ZIP de alterações deve ser aplicado sobre a entrega das etapas 3 e 4, mantendo os caminhos relativos. O ZIP completo inclui todas as etapas de código acumuladas e a hero lunar. Nenhum pacote contém node_modules ou dist. Para conferir com Node 24: npm ci, npm test, npm run lint, npm run build.
