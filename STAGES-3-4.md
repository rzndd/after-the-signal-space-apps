# Historical snapshot — SOL404 — etapas 3 e 4

> **HISTORICAL SNAPSHOT — NOT CURRENT RELEASE GUIDANCE.** This document records an earlier iteration. Its counts, tests, diagrams, activities and patch instructions may have been superseded. Use [README.md](README.md), [QA-SISTEMAS.md](QA-SISTEMAS.md) and [SUBMISSION.md](SUBMISSION.md) for the current 17-record version. Preserve this file as history; do not apply its old patch instructions to the current source.

---

## Base e escopo

Projeto atual desta conversa, com as etapas 1 e 2 e a hero lunar preservadas. O ZIP de alterações desta entrega exige essa base; o ZIP completo inclui o conjunto acumulado. Etapas 5 (novas investigações interativas) e 6 (teste com estudantes/professores e publicação) continuam pendentes.

## Etapa 3 — dados e navegação

- Pioneer mostra aproximadamente 21,28 bilhões de quilômetros no instante de referência do modelo, em lugar do contador ao quilômetro. O avanço simulado por tempo de sessão foi retirado: distância, AU, velocidade e tempo de luz agora se referem ao mesmo estado da efeméride.
- Detalhes revelam data, horário e escala temporal TDB, além de esclarecer a referência heliocêntrica e as distâncias típicas dos marcadores de planetas. Respostas antigas sem horário mostram time unavailable; nenhum horário é inventado para o fallback.
- TIME_TYPE=TDB explícito na requisição. API self-contained, sem imports externos a api/. O parser compartilhado e o parser da função seguem equivalentes.
- Estados de hardware e legado científico separados em todas as histórias. Não se confunde silêncio de rádio com ausência de movimento, fim de voo com falha de todos os subsistemas ou refletor separado com o motor de Eagle.
- Six stories substitui Six machines. Moon, Mars e deep space são apresentados como partes do mesmo escopo, sem rótulo de bônus.
- Regra de URL: ?m=<id> ou ?m=<id>#explore abre a história. Fragmentos explícitos #top, #machines e #about têm prioridade e removem a seleção. Selecionar uma máquina cria um endereço canônico com #explore.
- Links internos fecham a história, removem m e navegam para a seção. Back/Forward sincronizam a seleção com o endereço. Foco é levado ao destino nas mudanças de seção; navegação de história preserva o foco do diálogo. A cópia de link continua apontando à história.

## Etapa 4 — conteúdo pedagógico

- Faixa editorial principal de Kids: aproximadamente 9–12 anos. Isso é uma decisão de projeto, não uma eficácia comprovada em estudo com crianças.
- Seis narrativas reescritas em dois níveis, com cinco capítulos: propósito, funcionamento, resultados, encerramento/permanência e legado.
- Kids usa explicações mais curtas, apresenta termos no contexto e preserva a primeira pessoa. Deep dive aprofunda mecanismos, interpretação de evidências e limites das conclusões.
- Glossário acessível e expansível para sol, AU, órbita, refletor e evidência.
- As dez imagens das histórias têm uma orientação Look closely: o que observar e, quando relevante, o que a imagem não comprova. O conteúdo também é aplicado a imagens em cache.
- Viking explica a interrupção das comunicações por comando em 1982 e separa o episódio de suas interpretações científicas. A revisão da etapa 2 sobre resultados inconclusivos e compostos orgânicos foi preservada.
- A história dos veículos lunares distingue transportar astronautas de ser um rover científico autônomo; Ingenuity distingue demonstração de engenharia de descoberta biológica; Pioneer distingue trajetória calculada de nova telemetria.

## Verificação

- npm run build: aprovado, TypeScript + Vite.
- npm run lint: aprovado, incluindo react-hooks.
- npm test: onze testes aprovados. Três novos testes de URLs e um novo teste para ausência de horário; os demais testes anteriores foram preservados/ampliados.
- API real local: estado de 2026-Nov-14, 00:00:00 TDB, source=live, aproximadamente 142,229185 AU. Valores mantidos na época indicada, sem avanço artificial.
- Conferidos no navegador os cinco capítulos dos dois modos nas seis histórias: doze conjuntos, todos com cinco seções e cinco parágrafos.
- Conferidos glossário expandido, legendas com orientações, estados distintos e cópia de link.
- Desktop: About fecha a história; Back restaura Viking. Mobile 375px: ?m=viking-1#top não abre modal; ?m=viking-1 abre modal e normaliza para #explore.
- A correção de largura das etapas anteriores foi preservada. Não houve instalação de novas dependências nem mudança do framework.
- Não foram executados Safari/Firefox ou teste com público escolar. Não houve publicação na Vercel.

## Fontes de referência

- [NASA — Viking 1](https://science.nasa.gov/mission/viking-1/)
- [NASA Astrobiology — Viking Results Revisited](https://astrobiology.nasa.gov/news/viking-results-revisited/)
- [NASA — Opportunity, relatório final](https://ntrs.nasa.gov/citations/20200000214)
- [NASA — Pioneer 10](https://science.nasa.gov/mission/pioneer-10/)
- [NASA — Pioneer 10, histórico e energia](https://www.nasa.gov/history/50-years-ago-pioneer-10-launches-to-explore-jupiter/)
- [NASA — Ingenuity](https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/)
- [NASA — Lunar Roving Vehicle](https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html)
- [NASA/JPL — API Horizons e escalas de tempo](https://ssd-api.jpl.nasa.gov/doc/horizons.html)
- Registros NASA das imagens, já vinculados em cada legenda.

## Uso

Aplicar o ZIP de alterações sobre a entrega das etapas 1 e 2, preservando os caminhos relativos. Para iniciar do projeto acumulado, usar o ZIP completo. Com Node 24: npm ci, npm test, npm run lint, npm run build. Os documentos anteriores registram entregas anteriores; este documento descreve o estado novo.
