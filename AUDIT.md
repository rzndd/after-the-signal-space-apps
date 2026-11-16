# Historical snapshot — SOL404 — análise e entrega

> **HISTORICAL SNAPSHOT — NOT CURRENT RELEASE GUIDANCE.** This document records an earlier iteration. Its counts, tests, diagrams, activities and patch instructions may have been superseded. Use [README.md](README.md), [QA-SISTEMAS.md](QA-SISTEMAS.md) and [SUBMISSION.md](SUBMISSION.md) for the current 17-record version. Preserve this file as history; do not apply its old patch instructions to the current source.

---

14 de novembro de 2026 · código do ZIP abandoned-project_1(1).zip, com os quatro ajustes CSS anteriores incorporados.

## Diagnóstico antes da implementação

| Aspecto | Avaliação do ponto de partida | Decisão |
| --- | --- | --- |
| Primeiros 5 segundos | O título e a fotografia estabelecem o tema, mas a promessa depende de um parágrafo genérico. | Explicar Moon/Mars e levar diretamente a Opportunity; manter acesso às seis máquinas. |
| Storytelling | A primeira pessoa funciona especialmente em Opportunity e Ingenuity. Kids e Deep dive já têm textos diferentes. Falta um encerramento educativo. | Preservar as histórias, identificar a voz como imaginada e acrescentar legado + pergunta com resposta revelável. |
| Fluxo | Os cards abrem as histórias, mas não antecipam suas vozes. Depois de ler, é preciso descobrir sozinho como continuar. | Mostrar o gancho narrativo nos cards, próxima história e cópia do link. |
| Visual | Tipografia e temas por mundo já têm identidade. Dois cards estreitos por linha prejudicam leitura no celular. O cabeçalho de fechamento desaparece ao rolar. | Uma coluna até 420px, barra persistente e contraste maior no botão principal. |
| Mobile 375px | A história funciona como bottom sheet, mas o fundo e o foco permaneciam acessíveis. | Diálogo modal nativo, fundo inerte, ciclo de foco, Escape e retorno ao acionador. |
| Acessibilidade | Reduced motion e alvos de 44px já existem. As setas dos tabs mudavam seleção sem mover foco. O seletor de modo usava semântica radio incompleta. | Tabs com setas/Home/End e foco correspondente; modos como botões pressionáveis; foco visível adaptado ao fundo. |
| Impacto emocional | O visitante conhece a despedida, mas não recebe uma pergunta para levar consigo. | Cada história termina com o que ela nos deixa e uma pergunta de investigação. |
| Diferencial | Vozes, fontes NASA, dois níveis de leitura e mapas formam a proposta mais forte. Pioneer amplia a experiência, mas foge do recorte Moon/Mars. | Identificar deep space como viagem bônus e explicitar limites científicos dos dados. |

A avaliação do site publicado foi feita pelo navegador; o serviço de extração web não conseguiu abri-lo. As mudanças foram verificadas na versão local. Não houve pesquisa com usuários ou medição de conversão.

## Priorização e resultado

### Must-have — concluídos

- Painel mobile acessível e fechamento persistente: diálogo nativo modal abaixo de 900px, não modal no desktop, Escape, ciclo Tab/Shift+Tab, restauração de foco e scroll lock atualizado ao redimensionar.
- Teclado e foco: setas/Home/End nos mundos, seletor de modo com estado pressionado, skip link para exploração e foco visível.
- Validade científica: tempo de luz explicitamente heliocêntrico; contador usa a taxa radial RR, em vez do módulo da velocidade; unidades KM-S explícitas; valor armazenado estático quando não há taxa radial; estimativa identificada como modelo, não telemetria.
- Correções de conteúdo: permanência do estágio Eagle separada das 21,5 horas da tripulação; refletor situado perto do módulo; homenagem a Thomas Mutch datada de janeiro de 1982; Viking descrito no contexto de Marte.
- Clareza editorial: vozes imaginadas identificadas em cada história; fatos e notas também acessíveis em Kids; divulgação de assistência por IA atualizada.
- Foto do Viking: resolver a imagem pela NASA API, em vez de presumir que todo registro possui versão medium.jpg. Crédito vem dos metadados; silhueta preservada se o arquivo não carregar.

### Should-have — concluídos

- Entrada direta pela história de Opportunity e ganchos narrativos nos seis cards.
- Card em uma coluna nos celulares estreitos, com texto mais legível.
- Próxima história, cópia de link com mensagem de estado e campo para cópia manual se a área de transferência falhar.
- Seis encerramentos educativos com pergunta e resposta revelável.
- Fontes diretas para Lunar Roving Vehicles e Viking, além das fontes existentes.
- Deep space identificado como bônus; gráfico com largura legível e rolagem horizontal no celular, com região acessível por teclado.
- Brilho, clique e seleção das flags; barra de seleção na lista; estado vazio oculto no mobile; mapa lunar quadrado até 640px.
- Integração local dos dados NASA reparada: imagens apontam a /search e Horizons usa o mesmo handler self-contained da função Vercel.

### Nice-to-have — fora do prazo desta entrega

Narração humana, tradução completa para português, avaliação com crianças/professores e auditoria com leitores de tela reais. Não foi adicionada mídia gerada por IA, telemetria de uso nem dependência de interface.

## Evidências de validação

- `npm ci`: instalação das dependências do lockfile existente; sem alteração de versões.
- `npm run lint`: passou, incluindo regras react-hooks.
- `npm run build`: passou, TypeScript + Vite 8.3.8; bundle JS ~87,94 kB gzip.
- `npm test`: quatro testes passaram. Cobrem unidades/referência solar e virada de ano, RR versus velocidade total, entrada incompleta, equivalência do parser na função e falhas HTTP/rede.
- Navegador Chromium integrado: 375×812, 768×1024 e 1440×900; seis histórias abrem; mudanças Moon/Mars/Deep space; Kids/Deep dive; link direto `?m=opportunity`; próxima história; cópia confirmada; retorno ao botão de origem; Tab e Shift+Tab ciclam no modal; Escape fecha; redimensionamento alterna modal/não modal.
- API real local: `/api/horizons` retornou HTTP 200, source=live, asOf=2026-Nov-14, 142,229185 AU, velocidade total 11,848068 km/s e taxa radial 11,821837 km/s. A interface exibiu a estimativa JPL e a data.
- Fotos NASA foram vistas no navegador, incluindo a capa do Viking após a correção.
- Nova aba da versão final: nenhum erro ou aviso de console capturado na checagem inicial. Mensagens de recarga transitórias ocorreram durante edições e reinícios do servidor de desenvolvimento.
- Revisão React: nenhum setState síncrono adicionado em effects; limpeza de listeners e requisições; nenhum Date.now em render/useRef; CSS Modules mantido; api/horizons.ts permanece sem imports.
- Reduced motion: regra global existente preservada; a rolagem programática dos cards agora respeita a preferência. Esta preferência foi revisada no código, não em dispositivo físico.

Não foram executados Safari/Firefox, leitor de tela externo, Lighthouse ou validação em aparelhos físicos. A acessibilidade foi verificada por teclado e árvore de acessibilidade do navegador, sem declaração de conformidade WCAG integral. O código não foi publicado na Vercel; a integração de produção ainda deve ser verificada após o deploy. O fallback mantém a data original, sem fingir que os dados são atuais.

## Fontes consultadas

- [NASA Science — Viking 1](https://science.nasa.gov/mission/viking-1/): datas, instrumentos e homenagem Thomas Mutch.
- [NASA — Apollo Lunar Roving Vehicle](https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html): três veículos e missões.
- [NASA Science — despedida de Ingenuity](https://science.nasa.gov/blog/farewell-to-our-flying-friend-and-closing-in-on-the-crater-rim/): 72 voos e cerca de 17 km.
- [JPL Horizons — manual](https://ssd.jpl.nasa.gov/horizons/manual.html): referência da efeméride e interpretação dos vetores; resposta real da API conferida nesta sessão.

Os critérios e o prazo do concurso foram tratados como contexto fornecido pelo autor. Melhorias de experiência e rastreabilidade não garantem resultado na competição.

## Como usar a entrega

O ZIP completo contém o projeto-fonte pronto para instalar e construir; não inclui node_modules nem dist. O ZIP de alterações contém somente arquivos alterados/novos, com caminhos relativos, para aplicar sobre o ZIP original. Use Node 24 para repetir todos os testes (`npm ci`, `npm run lint`, `npm test`, `npm run build`). `npm run dev` também fornece o handler local de Horizons.

O relatório não altera SUBMISSION.md: revise o texto da inscrição e a autoria final antes de enviá-los. O manifesto lista todos os arquivos entregues como alterações.

## Hero escolhida pelo autor

Imagem alterada para as11-40-5881 (superfície lunar em Tranquility Base, Apollo 11). Crédito e link NASA atualizados; recorte responsivo e contraste ajustados. Build e lint passaram; aparência conferida em 1440×900 e 375×812. Sem publicação na Vercel.
