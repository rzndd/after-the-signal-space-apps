> **Historical snapshot.** Superseded by the root README, QA-SISTEMAS and CHANGES documents. Earlier results are not acceptance evidence for the current release.

# SOL404 — revisão de sistemas

## After the Signal — versão em inglês

- Nova marca no cabeçalho, boot, rodapé, créditos e metadados. O domínio de hospedagem não foi alterado nem houve publicação.
- Imagens coloridas na exploração; filtro de cinza apenas nas cenas recuperadas. Retirado o filtro global que descoloria imagens antes do apagão.
- Jornada resumida a 21 cenas (três por equipamento), sem repetir a espera de quatro segundos entre capítulos. Factos adicionais continuam disponíveis em detalhes expansíveis.
- “Explore the map” move o foco para `#explore`; “Meet the machines” para `#machines`.
- “Back to exploration” retorna sem conceder energia infinita antes da conclusão. “Replay the recovered stories” recomeça na cena 1, preservando um desbloqueio previamente conquistado.
- Testados os sete capítulos, as respostas, o retorno antes/depois da conclusão, replay e filtros das imagens. Console sem erros e sem excesso horizontal a 320 px na página principal.
- A validação de retorno/replay usou servidor de desenvolvimento isolado na porta 5199 com prólogo acelerado. A aceleração só existe com DEV e variável de QA explícita; builds de produção mantêm 15 segundos por ponto.
- Lint, build/typecheck e 28 testes automatizados passaram.

## Revisão de fundos e conforto visual

- Hero: playbackRate 0,65 confirmado no navegador; fundo igualado à cor de base do vídeo e máscara suave nas bordas. Mantido poster para redução de movimento e conexões lentas.
- Abas com base escura constante e seleção de baixa luminosidade, sem inversão de grandes áreas para branco/laranja.
- Mosaicos locais oficiais NASA para Lua e Marte; recortes e transformação dos marcadores documentados em public/media/maps/SOURCES.md.
- Fundo Hubble ilustrativo no diagrama espacial, com identificação explícita.
- Carregamento dos dois mosaicos e clique na bandeira de Viking conferidos no navegador; sem excesso horizontal a 375 px; console sem erros.
- Lint, build/typecheck e 25 testes passaram, incluindo testes dos recortes e limites das bandeiras.

## Revisão final: prólogo obrigatório e recompensa persistente

- Lint, build/typecheck e 23 testes automatizados passaram.
- Navegador: início real em 17%, observação em 13%, 9% e 3%, seguido de SIGNAL LOST sem alterar o relógio nem simular a descarga. Duração configurada: 4 min 15 s.
- Objetivo do fragmento identificado; avisos de ligação interrompida e ausência de resposta observados nos limiares de energia.
- Sete capítulos percorridos novamente até ao epílogo; 13 fontes de imagem distintas exibidas nas cenas.
- Pausa, avanço e opção de ritmo calmo disponíveis. As evidências recebem mais tempo de leitura.
- Desbloqueio ∞ confirmado; após recarregar e passar pelo boot, a energia continuou infinita.
- Reinício voluntário confirmado: remove o desbloqueio, volta ao boot e restaura 17% e o objetivo inicial.
- Sem excesso horizontal a 375 px na exploração desbloqueada; console sem erros nesta passagem.
- Os registos abaixo incluem verificações anteriores e devem ser lidos como histórico. A pausa da bateria e a exploração infinita antecipada foram removidas.

Atualização do fluxo: a reserva inicial esgota-se obrigatoriamente (17%, menos 1% por 15 segundos decorridos), inclusive durante leitura. Não existe pausa nem código OASIS para impedir o esgotamento. A energia infinita só é disponibilizada pelo epílogo, após todos os capítulos e evidências. Os testes de navegador abaixo documentam a revisão anterior; esta alteração passou por lint, build e os 20 testes automatizados, mas ainda não por um novo percurso completo no navegador.

## Verificações executadas

- ESLint para TS, TSX, JS e JSX; build de produção com typecheck; 20 testes automatizados.
- Navegador: sete capítulos até ao epílogo, espera da DeathScreen, bloqueio sem evidência e avanço após resposta correta.
- Seis máquinas da exploração livre: leitura simples e aprofundada até à ficha da missão.
- Pausa da reprodução, saída, oferta explícita de retomada, comando help e restart até ao boot.
- Na revisão anterior, a bateria pausava durante leitura; esse comportamento foi substituído pelo esgotamento obrigatório descrito acima.
- Capas locais verificadas: seis imagens carregadas. Metadados conferidos na NASA Image and Video Library por nasa_id.
- Sem excesso horizontal na página inicial a 320 px; cenas conferidas a 320, 375 e 1440 px.
- Console do navegador sem erros ao fim da validação.

## Entrega

- Seis equipamentos principais e Spirit identificado como capítulo extra.
- Progresso local versionado, validação de estados e escolha de continuar/recomeçar.
- Áudio com uma preferência partilhada e persistida. O consumo inicial da bateria usa o tempo decorrido, incluindo leitura e aba oculta.
- Motor narrativo carregado em separado: chunk de cerca de 28 kB antes de gzip; entrada de cerca de 96 kB gzip no build observado.
- Poster de 6,7 kB; vídeo móvel de cerca de 616 kB, carregamento diferido e poster em conexões lentas/redução de movimento.
- Consultas NASA/JPL com prazo limite de 8 segundos, erros controlados e estimativa JPL guardada identificada como tal.
- Imagens e histórias locais; não foi implementado um service worker nem garantido primeiro acesso sem rede.
- Interface principal e jornada em português. Leituras anteriores e atividades aprofundadas em inglês têm aviso explícito.

## Limites da validação

Não houve teste pedagógico com estudantes/professores, auditoria com leitor de ecrã real, medição de Core Web Vitals em produção ou teste em aparelho físico. Não foram publicados deploys. Os resultados do build e do navegador local não garantem 60 FPS em todos os dispositivos.
