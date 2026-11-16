# Historical snapshot — SOL404 — revisão de design e frontend

> **HISTORICAL SNAPSHOT — NOT CURRENT RELEASE GUIDANCE.** This document records an earlier iteration. Its counts, tests, diagrams, activities and patch instructions may have been superseded. Use [README.md](README.md), [QA-SISTEMAS.md](QA-SISTEMAS.md) and [SUBMISSION.md](SUBMISSION.md) for the current 17-record version. Preserve this file as history; do not apply its old patch instructions to the current source.

---

Implementado no projeto local acumulado. Esta entrega ainda não foi publicada no domínio sol404.vercel.app.

## Como usar

O ZIP de alterações contém somente os arquivos modificados nesta rodada, com caminhos relativos a partir de src/. Substitua os arquivos correspondentes na base das etapas 5–6. O ZIP completo já reúne a base e este redesign; use-o se estiver partindo de uma versão anterior. Não misture o patch com um projeto anterior às etapas 5–6.

Para desenvolvimento: npm ci e npm run dev. Para validar: npm run lint, npm test e npm run build. Nenhuma dependência foi adicionada. Os cards reais ficam em components/layout/Machines, por isso não foi criado um MachineCards paralelo.

## Validação realizada

- Build de produção e TypeScript: aprovados.
- ESLint, incluindo as regras strict de hooks: aprovado.
- 16 testes existentes: aprovados.
- Inspeção no navegador em 320, 375, 768 e 1440 px, sem overflow horizontal da página. O diagrama profundo mantém sua rolagem horizontal própria.
- Hero → mapa, card → história, flags, troca de mundos pelo teclado, Kids/Deep dive, atividade de Viking com feedback, Escape e retorno do foco: verificados.
- Modal no celular e painel não modal no desktop: verificados.
- Console sem erros na sessão de teste local.
- As regras globais existentes para reduced motion continuam desativando animações e transições. A preferência não foi emulada nesta sessão.
- JS de produção: 299,70 kB, 96,48 kB gzip; CSS: 30,33 kB, 7,55 kB gzip. Isso não substitui uma medição de Core Web Vitals em produção.
- Validação pedagógica com estudantes ou professores permanece pendente, conforme a indisponibilidade de participantes informada.

## Direção visual

Fotos documentais da NASA, tipografia editorial, contraste alto e movimento curto nos controles. As referências fornecidas, incluindo [GSAP](https://gsap.com/), [Motion](https://motion.dev/) e [Refero](https://styles.refero.design/), foram consultadas para ritmo e interação; a implementação usa CSS Modules e os recursos já instalados. Não foram adicionados WebGL, bibliotecas de animação, logos NASA ou imagens geradas por IA.

## 1. Header

A marca longa repetia o título da abertura e ocupava espaço útil no celular. A assinatura sol404, o descritor Stories beyond Earth e a navegação visível dão identidade ao projeto sem exigir um menu adicional.

### src/components/layout/Header.tsx

```tsx
import styles from './Header.module.css'

const links = [
  { href: '#machines', label: 'Machines' },
  { href: '#explore', label: 'Map' },
  { href: '#about', label: 'About' },
]

/** Slim sticky bar: who we are on the left, where to go on the right. */
export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#top" aria-label="sol404, Abandoned but not forgotten, back to the top">
          <svg className={styles.flag} viewBox="0 0 40 60" aria-hidden="true">
            <line x1="8" y1="58" x2="8" y2="6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M8 6 L36 15 L8 25 Z" fill="var(--accent)" />
          </svg>
          <span className={styles.name}>sol404<span className={styles.descriptor}>Stories beyond Earth</span></span>
        </a>
        <nav aria-label="Main">
          <ul className={styles.nav}>
            {links.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
```

### src/components/layout/Header.module.css

```css
.header { position: sticky; top: 0; z-index: 20; background: #141518; color: var(--page-ink); border-bottom: 1px solid #414247; }
.inner { max-width: 1440px; margin: auto; padding: 0 clamp(20px, 4vw, 64px); min-height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.brand { display: inline-flex; align-items: center; gap: 10px; min-height: var(--tap); text-decoration: none; flex-shrink: 0; }
.flag { width: 20px; height: 30px; }
.name { display: flex; align-items: center; gap: 24px; font-family: var(--display); font-size: 1.8rem; font-weight: 800; line-height: 1; letter-spacing: -.07em; }
.descriptor { max-width: 12ch; font-family: var(--body); font-size: .8rem; font-weight: 400; line-height: 1.3; letter-spacing: 0; color: var(--page-soft); }
.nav { display: flex; gap: 4px; list-style: none; padding: 0; margin: 0; }
.nav a { display: inline-flex; align-items: center; min-height: var(--tap); padding: 0 16px; text-decoration: none; font-size: .95rem; font-weight: 700; color: var(--page-soft); transition: color .18s, background .18s; }
.nav a:hover { color: white; background: #292a2e; }
@media (max-width: 640px) { .inner { min-height: 64px; padding-inline: 16px; gap: 8px; } .descriptor { display: none; } .name { font-size: 1.6rem; } .flag { width: 16px; height: 25px; } .brand { gap: 6px; } .nav { gap: 0; } .nav a { padding-inline: 9px; font-size: .9rem; } }
@media (max-width: 359px) { .nav a { padding-inline: 6px; font-size: .85rem; } }
```

## 2. Hero

A abertura publicada usava Earthrise e uma hierarquia que deixava pouca distinção entre identidade e narrativa. Mantive a imagem lunar as11-40-5881 escolhida anteriormente, ampliei a tipografia e organizei três entradas: história de Opportunity, seis máquinas e mapa; a imagem agora é um picture responsivo com prioridade de carregamento.

### src/components/layout/Hero.tsx

```tsx
import { useState } from 'react'
import styles from './Hero.module.css'

const PHOTO_ID = 'as11-40-5881'
const PHOTO_BASE = `https://images-assets.nasa.gov/image/${PHOTO_ID}/${PHOTO_ID}`
const PHOTO_PAGE = `https://images.nasa.gov/details/${PHOTO_ID}`

/** First screen: the empty lunar horizon, the promise, and two ways in. */
export function Hero({ onStart }: { onStart: () => void }) {
  const [failed, setFailed] = useState(false)

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      {!failed && <picture className={styles.photo}>
        <source media="(max-width: 899px)" srcSet={`${PHOTO_BASE}~medium.jpg`} />
        <img src={`${PHOTO_BASE}~large.jpg`} alt="" fetchPriority="high" decoding="async" onError={() => setFailed(true)} />
      </picture>}
      <div className={styles.inner}>
        <p className={styles.context}>The missions ended. Their stories didn’t.</p>
        <h1 id="hero-title" className={styles.title}>Abandoned <span>but not forgotten.</span></h1>
        <p className={styles.lede}>
          Six NASA machines. The Moon, Mars and deep space. Hear imagined first-person stories,
          explore where they were left, and discover the science that lives on.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.primary} onClick={onStart}>Hear Opportunity’s story</button>
          <a className={styles.secondary} href="#machines">Explore all six stories</a>
        </div>
        <a className={styles.mapLink} href="#explore">Explore the map <span aria-hidden="true">↓</span></a>
      </div>
      {!failed && (
        <p className={styles.credit}>
          Lunar surface at Tranquility Base, Apollo 11, July 1969. Credit: NASA.{' '}
          <a href={PHOTO_PAGE} target="_blank" rel="noreferrer">See the NASA record</a>
        </p>
      )}
    </section>
  )
}
```

### src/components/layout/Hero.module.css

```css
.hero { position: relative; isolation: isolate; overflow: hidden; background: #08090b; color: #fff; min-height: min(850px, calc(100svh - 72px)); display: grid; align-items: center; }
.photo { position: absolute; inset: 0; z-index: -2; }
.photo img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center 62%; }
.hero::before { content: ''; position: absolute; inset: 0; z-index: -1; background: linear-gradient(90deg, rgb(0 0 0 / .88), rgb(0 0 0 / .48) 60%, rgb(0 0 0 / .22)), linear-gradient(0deg, #08090b, transparent 23%); }
.inner { width: 100%; max-width: 1440px; margin: auto; padding: clamp(56px, 7vw, 104px) clamp(20px, 4vw, 64px) 124px; }
.context { margin: 0 0 28px; font-size: clamp(.9rem, 1.2vw, 1.05rem); font-weight: 700; color: #e0ddd7; }
.title { max-width: 15ch; font-size: clamp(3rem, 7.9vw, 7.5rem); font-weight: 800; line-height: .96; letter-spacing: -.055em; text-wrap: balance; }
.title span { display: block; }
.lede { max-width: 49ch; margin: 28px 0 0; font-size: clamp(1.03rem, 1.5vw, 1.25rem); line-height: 1.6; color: #e2e2e2; }
.actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
.primary, .secondary { display: inline-flex; justify-content: center; align-items: center; min-height: 52px; padding: 12px 22px; border: 1px solid transparent; border-radius: 3px; font-size: 1rem; font-weight: 700; text-decoration: none; cursor: pointer; transition: background .18s, transform .18s; }
.primary { background: #cf2d1b; color: white; }
.primary:hover { background: #ae2516; transform: translateY(-2px); }
.secondary { background: rgb(0 0 0 / .3); border-color: #9c9c9c; color: white; }
.secondary:hover { background: #fff; color: #141518; transform: translateY(-2px); }
.primary:active, .secondary:active { transform: translateY(1px); }
.mapLink { display: inline-flex; gap: 18px; align-items: center; min-height: var(--tap); margin-top: 18px; font-size: .9rem; color: #ddd; text-decoration: none; }
.mapLink:hover { text-decoration: underline; }
.credit { position: absolute; right: clamp(20px, 4vw, 64px); left: clamp(20px, 4vw, 64px); bottom: 18px; margin: 0; padding-top: 14px; border-top: 1px solid #676767; font-size: .72rem; line-height: 1.5; color: #ddd; }
@media (max-width: 640px) { .hero { min-height: calc(100svh - 64px); } .inner { padding-top: 52px; padding-bottom: 112px; } .title { font-size: clamp(2.9rem, 12vw, 4.8rem); max-width: 13ch; } .context { margin-bottom: 22px; max-width: 27ch; } .lede { margin-top: 24px; max-width: 35ch; } .actions { flex-direction: column; align-items: stretch; max-width: 360px; gap: 10px; margin-top: 26px; } .photo img { object-position: 62% center; } .hero::before { background: linear-gradient(0deg, #08090b 1%, rgb(0 0 0 / .62) 45%, rgb(0 0 0 / .55)); } .credit { font-size: .68rem; } }
```

## 3. Cards das máquinas

O título centralizado e os metadados compactos davam pouco ritmo à coleção. O novo cabeçalho editorial, as fotos maiores, os nomes em destaque e o hover discreto deixam mais clara a escolha de uma história; a grade usa três, duas ou uma coluna conforme a largura.

### src/components/layout/Machines.tsx

```tsx
import { useEffect, useState } from 'react'
import type { Machine } from '../../types/machine'
import type { PioneerState } from '../../../shared/horizons'
import { fetchNasaImage, imageCreditLabel, type NasaPhoto } from '../../lib/nasa'
import { silhouettes } from '../story/silhouettes'
import styles from './Machines.module.css'

interface Props {
  machines: Machine[]
  pioneer: PioneerState
  onPick: (machine: Machine) => void
}

function CardArt({ machine }: { machine: Machine }) {
  const [photo, setPhoto] = useState<NasaPhoto | null>(null)
  const [failedUrl, setFailedUrl] = useState('')
  const { nasaId, label, position } = machine.cover
  useEffect(() => {
    const ctrl = new AbortController()
    fetchNasaImage(machine.cover, ctrl.signal).then((result) => {
      if (!ctrl.signal.aborted) setPhoto(result)
    })
    return () => ctrl.abort()
  }, [machine.cover])
  const url = photo?.nasaId === nasaId && photo.url !== failedUrl ? photo.url : null
  const Silhouette = silhouettes[machine.id]
  return (
    <span className={styles.art}>
      <svg viewBox="0 0 120 100" className={styles.svg} aria-hidden="true">{Silhouette && <Silhouette />}</svg>
      {url && (
        <>
          <img className={styles.photo} src={url} alt={label} style={{ objectPosition: position }} loading="lazy" decoding="async" onError={() => setFailedUrl(url)} />
          <span className={styles.credit}>{imageCreditLabel[machine.cover.kind ?? 'photograph']}: {photo?.credit ?? 'NASA'}</span>
        </>
      )}
    </span>
  )
}

const worldName = { moon: 'The Moon', mars: 'Mars', 'deep-space': 'Deep space' } as const

/** The six machines as cards: art on top, name and a red arrow below. */
export function Machines({ machines, pioneer, onPick }: Props) {
  return (
    <section id="machines" className={styles.section} aria-labelledby="machines-title">
      <div className={styles.heading}>
        <h2 id="machines-title" className={styles.title}>Six stories<br />left behind.</h2>
        <p className={styles.intro}>They stopped sending signals.<br />They never stopped mattering. Choose a machine to hear its story.</p>
      </div>
      <ul className={styles.grid}>
        {machines.map((m) => {
          return (
            <li key={m.id}>
              <button type="button" className={styles.card} onClick={() => onPick(m)} aria-label={`Read the story of ${m.name}`}>
                <CardArt machine={m} />
                <span className={styles.foot}>
                  <span className={styles.text}>
                    <span className={styles.name}>{m.name.replace(/ \(.*\)/, '')}</span>
                    <span className={styles.meta}>{worldName[m.body]}, {m.years}</span>
                    <span className={styles.hook}>{m.headline}</span>
                  </span>
                  <span className={styles.go} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      <aside className={styles.distance} aria-label="Pioneer 10 distance">
      <p className={styles.distanceTitle}>Still out there.</p>
      <p className={styles.live}>
        Farthest of them all, Pioneer 10 was estimated to be about <strong>{Math.round(pioneer.au)} times</strong> farther from the Sun
        than we are. Light would take about {Math.round(pioneer.lightHours)} hours to cover that distance from the Sun.
        {' '}{pioneer.source === 'live' ? 'JPL trajectory estimate' : 'Stored estimate; live data unavailable'} ({pioneer.asOf}).
        {' '}Pioneer 10 has been silent since 2003.
      </p>
      </aside>
    </section>
  )
}
```

### src/components/layout/Machines.module.css

```css
.section { max-width: 1440px; margin: auto; padding: clamp(64px, 8vw, 112px) clamp(20px, 4vw, 64px); scroll-margin-top: 72px; }
.heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; margin-bottom: 40px; }
.title { font-size: clamp(2.5rem, 5.2vw, 4.6rem); font-weight: 800; letter-spacing: -.045em; line-height: 1; }
.intro { max-width: 35ch; margin: 0 0 4px; color: var(--page-soft); font-size: 1rem; }
.grid { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px 24px; }
.grid li { min-width: 0; }
.card { width: 100%; height: 100%; padding: 0; display: flex; flex-direction: column; text-align: left; background: transparent; color: var(--page-ink); border: 1px solid #53545b; border-radius: 4px; overflow: hidden; cursor: pointer; transition: border-color .2s, background .2s, transform .2s; }
.card:hover { border-color: #c3c4c9; background: #303136; transform: translateY(-5px); }
.card:active { transform: translateY(-1px); }
.card:focus-visible { outline: 3px solid var(--page-ink); outline-offset: 5px; }
.art { position: relative; display: grid; place-items: center; width: 100%; aspect-ratio: 4 / 3; background: #0e111a; overflow: hidden; border-bottom: 1px solid #53545b; }
.svg { width: 62%; height: 62%; color: #d7dce8; }
.photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .45s ease; }
.card:hover .photo { transform: scale(1.035); }
.credit { position: absolute; inset: auto 0 0; padding: 20px 10px 8px; font-size: .68rem; line-height: 1.4; text-align: left; color: #fff; background: linear-gradient(transparent, rgb(0 0 0 / .86)); overflow-wrap: anywhere; }
.foot { width: 100%; display: flex; align-items: flex-start; gap: 16px; padding: 24px 20px; flex: 1; }
.text { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.name { font-family: var(--display); font-size: clamp(1.3rem, 2vw, 1.7rem); font-weight: 800; line-height: 1.1; letter-spacing: -.025em; }
.meta { margin-top: 8px; color: var(--page-soft); font-size: .82rem; }
.hook { margin-top: 20px; font-size: .95rem; line-height: 1.4; }
.go { display: grid; place-items: center; flex-shrink: 0; width: 44px; height: 44px; border: 1px solid #777981; border-radius: 50%; transition: background .2s, color .2s; }
.card:hover .go { background: var(--page-ink); color: var(--page-2); }
.distance { margin-top: 56px; padding-top: 28px; border-top: 1px solid #53545b; display: grid; grid-template-columns: 1fr 2fr; gap: 32px; }
.distanceTitle { font-family: var(--display); font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 700; letter-spacing: -.03em; margin: 0; line-height: 1.1; }
.live { color: var(--page-soft); max-width: 70ch; font-size: .9rem; margin: 0; }
.live strong { color: var(--page-ink); }
@media (max-width: 959px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; } .heading { align-items: flex-start; } }
@media (max-width: 559px) { .heading { display: block; margin-bottom: 28px; } .intro { margin-top: 22px; } .grid { grid-template-columns: 1fr; gap: 24px; } .art { aspect-ratio: 16 / 10; } .foot { padding: 20px; } .name { font-size: 1.65rem; } .distance { grid-template-columns: 1fr; gap: 18px; margin-top: 40px; } }
```

## 4. Exploração e mapas

As bordas grossas e as abas fechadas competiam com os mapas e com as flags. Abas com sublinhado, bordas mais leves, linhas de seleção maiores e um anel no marcador selecionado tornam os estados mais claros; o gráfico de espaço profundo mantém sua escala, fontes e rolagem interna no celular.

### src/components/map/WorldTabs.module.css

```css
.tabs { display: flex; width: 100%; border-bottom: 1px solid var(--ink-soft); gap: 8px; }
.tab { flex: 1; min-height: 52px; padding: 10px 12px; border: 0; border-bottom: 4px solid transparent; background: transparent; color: var(--ink-soft); font-family: var(--display); font-size: clamp(.95rem, 1.5vw, 1.2rem); font-weight: 700; cursor: pointer; white-space: nowrap; transition: color .18s, background .18s; }
.tab:hover { background: color-mix(in srgb, var(--ink) 7%, transparent); color: var(--ink); }
.active { color: var(--ink); border-bottom-color: var(--ink); }
.tab:focus-visible { outline-offset: -5px; }
@media (max-width: 359px) { .tabs { gap: 0; } .tab { padding-inline: 6px; font-size: .9rem; } }
```

### src/components/map/SurfaceMap.module.css

```css
.map { position: relative; width: 100%; border: 1px solid var(--ink-soft); border-radius: 4px; overflow: hidden; background: var(--sheet-2); }
.moon { aspect-ratio: 4 / 3; }
.mars { aspect-ratio: 2 / 1; }
.canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
.caption { position: absolute; bottom: 8px; right: 8px; max-width: calc(100% - 16px); padding: 3px 8px; margin: 0; color: var(--ink); background: color-mix(in srgb, var(--sheet) 94%, transparent); font-size: .7rem; line-height: 1.4; border-radius: 2px; }
@media (max-width: 640px) { .moon { aspect-ratio: 1 / 1; } .mars { aspect-ratio: 4 / 3; } }
```

### src/components/map/MapMarker.module.css

```css
.marker { position: absolute; width: var(--tap); height: var(--tap); transform: translate(-32%, -88%); border: 0; background: transparent; cursor: pointer; padding: 0; }
.svg { width: 100%; height: 100%; overflow: visible; display: block; }
.base { fill: var(--ink); opacity: 0.35; }
.flag { transform-box: fill-box; transform-origin: 50% 100%; animation: raise 0.55s cubic-bezier(0.2, 0.9, 0.3, 1) backwards; animation-delay: calc(var(--i) * 110ms + 120ms); transition: transform 0.18s; }
.pole { stroke: var(--ink); stroke-width: 3; stroke-linecap: round; }
.pennant { fill: var(--flag); stroke: var(--ink); stroke-width: 1.6; stroke-linejoin: round; transform-box: fill-box; transform-origin: 0 50%; animation: wave 2.6s ease-in-out infinite alternate; }
.marker:hover .flag, .marker:focus-visible .flag { transform: scale(1.18); filter: drop-shadow(0 0 6px var(--flag)); }
.marker:active .svg { transform: scale(0.95); }
.marker.selected .flag { transform: scale(1.3); filter: drop-shadow(0 0 10px var(--flag)); }
.selected .pennant { animation-name: waveSelected; }
.selected .base { opacity: 0.8; }
.tip { position: absolute; bottom: calc(100% - 6px); left: 50%; transform: translateX(-30%); white-space: nowrap; background: var(--ink); color: var(--sheet); padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; line-height: 1.3; pointer-events: none; opacity: 0; transition: opacity 0.15s; z-index: 5; }
.marker:hover .tip, .marker:focus-visible .tip, .selected .tip { opacity: 1; }
.selected { z-index: 4; }
@media (hover: none) { .tip { display: none; } .selected .tip { display: block; } }
@keyframes raise { from { transform: scaleY(0.05); opacity: 0; } to { transform: scaleY(1); opacity: 1; } }
@keyframes wave { from { transform: rotate(-4deg) skewY(-3deg); } to { transform: rotate(4deg) skewY(3deg); } }
@keyframes waveSelected { from { transform: rotate(-8deg) skewY(-6deg); } to { transform: rotate(8deg) skewY(6deg); } }

/* near the right edge the label opens toward the left so it is never clipped */
.tipLeft .tip { left: auto; right: 30%; transform: none; }

/* A fixed landing ring keeps the selected location visible beside its waving flag. */
.marker::before { content: ""; position: absolute; width: 18px; height: 8px; left: 5px; bottom: 0; border: 2px solid var(--ink); border-radius: 50%; opacity: 0; transition: opacity .18s; pointer-events: none; }
.marker.selected::before { opacity: 1; }
.marker:focus-visible { outline: 3px solid var(--ink); outline-offset: 4px; }
```

### src/components/map/MachineList.module.css

```css
.list { list-style: none; padding: 0; margin: 20px 0 0; border-top: 1px solid var(--ink-soft); }
.row { width: 100%; display: grid; grid-template-columns: 22px minmax(0, 1fr) auto; align-items: center; gap: 12px; min-height: 64px; padding: 12px 16px; border: 0; border-bottom: 1px solid color-mix(in srgb, var(--ink) 28%, transparent); background: transparent; color: var(--ink); text-align: left; cursor: pointer; transition: background .18s, color .18s; }
.row:hover { background: color-mix(in srgb, var(--ink) 8%, transparent); }
.row.on { background: var(--ink); color: var(--sheet); box-shadow: inset 4px 0 0 var(--flag); }
.flag { width: 22px; height: 28px; }
.name { font-family: var(--display); font-weight: 700; font-size: 1.08rem; line-height: 1.25; }
.years { font-size: .8rem; white-space: nowrap; }
.row:focus-visible { outline-offset: -5px; }
@media (max-width: 480px) { .row { padding-inline: 12px; gap: 6px 12px; } .years { grid-column: 2; } }
```

### src/components/map/DeepSpaceView.module.css

```css
.wrap { position: relative; width: 100%; border: 1px solid var(--ink-soft); border-radius: var(--radius); overflow: hidden; background: var(--sheet); }
.diagram { width: 100%; min-width: 0; overflow-x: auto; overscroll-behavior-x: contain; }
.stage { position: relative; }
.svg { display: block; width: 100%; height: auto; aspect-ratio: 2 / 1; }
.star { fill: var(--ink); }
.axis { stroke: var(--ink-soft); stroke-width: 1.5; stroke-dasharray: 3 7; }
.sun { fill: var(--flag); stroke: var(--ink); stroke-width: 2; }
.planet { fill: var(--ink); }
.name { fill: var(--ink); font: 700 15px var(--display); }
.small { fill: var(--ink-soft); font: 12px var(--body); }
.counter { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); margin: 0; border-top: 1px solid var(--ink-soft); }
.counter div { padding: 12px 16px; border-right: 1px solid var(--ink-soft); }
.counter div:last-child { border-right: 0; }
.counter dt { font-size: 0.85rem; color: var(--ink-soft); }
.counter dd { margin: 2px 0 0; font-family: var(--display); font-weight: 800; font-size: clamp(1.3rem, 3.4vw, 1.9rem); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.source { margin: 0; padding: 8px 16px 10px; font-size: 0.82rem; color: var(--ink-soft); border-top: 1px solid var(--ink-soft); }

.odometer { margin-top: 14px; display: flex; flex-direction: column; gap: 2px; }
.odoLabel { font-size: 0.82rem; color: var(--ink-soft); }
.odoValue { font-family: var(--display); font-weight: 800; font-size: clamp(1.4rem, 4vw, 2.1rem); letter-spacing: 0.01em; font-variant-numeric: tabular-nums; }

.scaleNote { margin: 0; padding: 10px 16px; font-size: 0.85rem; color: var(--ink-soft); }
.odometer { padding: 0 16px 16px; overflow-wrap: anywhere; }
@media (max-width: 640px) { .diagram { overflow-x: auto; } .stage { width: 640px; } .svg { aspect-ratio: 2 / 1; } }

.scrollHint { display: none; }
@media (max-width: 640px) { .scrollHint { display: block; margin: 0; padding: 10px 16px; color: var(--ink-soft); font-size: 0.85rem; } }

.source summary { min-height: var(--tap); padding-block: 10px; cursor: pointer; font-weight: 700; }
```

## 5. Story panel

A ilustração aparecia antes do título e consumia o início da leitura, especialmente no celular. A identificação e a voz da máquina agora abrem o painel; bordas simples, mais espaço entre capítulos, controles de 44 px e o painel de até 88dvh facilitam leitura e fechamento.

### src/components/story/StoryPanel.tsx

```tsx
import { useEffect, useRef } from 'react'
import type { BodyId, Machine, Mode } from '../../types/machine'
import { ModeToggle } from './ModeToggle'
import { StatusBadge } from './StatusBadge'
import { FactList } from './FactList'
import { SourceList } from './SourceList'
import { MachinePhotos } from './MachinePhoto'
import { MachineScene } from './MachineScene'
import { learning } from '../../data/learning'
import { storySections, missionStates, glossary } from '../../data/storyGuide'
import { StoryActions } from './StoryActions'
import { MissionInvestigation } from './MissionInvestigation'
import { investigations } from '../../data/investigations'
import styles from './StoryPanel.module.css'

interface Props {
  world: BodyId
  machine: Machine | null
  mode: Mode
  onModeChange: (m: Mode) => void
  onClose: () => void
  nextMachine: Machine
  onNext: (machine: Machine) => void
}

export function StoryPanel({ world, machine, mode, onModeChange, onClose, nextMachine, onNext }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const machineId = machine?.id

  // A native modal keeps mobile focus inside the sheet and makes the background inert.
  // On desktop the same story is a non-modal dialog beside the map.
  useEffect(() => {
    if (!machineId || !dialogRef.current) return
    const dialog = dialogRef.current
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    const mq = window.matchMedia('(max-width: 899px)')
    const present = () => {
      dialog.close()
      if (mq.matches) dialog.showModal()
      else dialog.show()
      document.body.style.overflow = mq.matches ? 'hidden' : previousOverflow
      headingRef.current?.focus({ preventScroll: true })
      dialog.scrollTop = 0
    }
    present()
    mq.addEventListener('change', present)
    return () => {
      mq.removeEventListener('change', present)
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true })
    }
  }, [machineId])

  if (!machine) {
    return (
      <aside className={`${styles.plaque} ${styles.empty}`} aria-live="polite">
        <MachineScene world={world} machine={null} />
        <div className={styles.content}>
          <h2 className={styles.emptyTitle}>Choose a flag</h2>
          <p>Each flag marks a real machine that NASA left behind. Pick one and it will tell you its story.</p>
        </div>
      </aside>
    )
  }

  const paragraphs = mode === 'kids' ? machine.kids : machine.deep

  return (
    <dialog ref={dialogRef} className={`${styles.plaque} ${styles.open}`} aria-labelledby="story-heading"
      onCancel={(e) => { e.preventDefault(); onClose() }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') { e.preventDefault(); onClose(); return }
        if (e.key !== 'Tab' || !window.matchMedia('(max-width: 899px)').matches) return
        const controls = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('button, a[href], input, summary, [tabindex="0"]')).filter((el) => el.getClientRects().length > 0)
        const first = controls[0], last = controls[controls.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus() }
      }}>
      <div className={styles.grab} aria-hidden="true" />
      <div className={styles.bar}>
        <ModeToggle mode={mode} onChange={onModeChange} />
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close story">
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M4 4 L16 16 M16 4 L4 16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
        </button>
      </div>
      <div className={styles.content}>
        <p className={styles.identity}>{machine.name} · {machine.years}</p>
        <h2 ref={headingRef} tabIndex={-1} id="story-heading" className={styles.headline}>{machine.headline}</h2>
        <p className={styles.dek}>{machine.tagline}</p>
        <div className={styles.scene}><MachineScene key={machine.id} world={machine.body} machine={machine} /></div>
        <StatusBadge label={missionStates[machine.id].hardware} legacy={missionStates[machine.id].legacy} />
        <p className={styles.readingNote}>{mode === 'kids' ? 'Kids · Ages 9–12 · Five short chapters' : 'Deep dive · Five chapters with more science detail'}</p>
        <p className={styles.voiceNote}>An imagined voice, grounded in NASA mission records.</p>
        <div className={styles.body} key={`${machine.id}-${mode}`}>
          {paragraphs.map((p, i) => <section key={i} className={styles.chapter}><h3>{storySections[i]}</h3><p>{p}</p></section>)}
        </div>
        <details className={styles.glossary}>
          <summary>Words for this journey</summary>
          <dl>{glossary.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl>
        </details>
        <MachinePhotos machine={machine} />
        <h3 className={styles.sectionTitle}>The mission in facts</h3>
        <FactList facts={mode === 'deep' ? machine.facts : machine.facts.slice(0, 2)} />
        {machine.note && <p className={styles.note}>{machine.note}</p>}
        <section className={styles.learning} aria-label="What this machine leaves us">
          <h3>{learning[machine.id].legacy}</h3>
          <MissionInvestigation key={machine.id} investigation={investigations[machine.id]} mode={mode} />
        </section>
        <SourceList sources={machine.sources} />
        <StoryActions key={machine.id} machine={machine} nextMachine={nextMachine} onNext={onNext} />
      </div>
    </dialog>
  )
}
```

### src/components/story/StoryPanel.module.css

```css
.plaque { background: var(--plaque); color: var(--plaque-ink); border: 1px solid var(--plaque-soft); border-radius: 4px; overflow: hidden; }
.bar { position: sticky; top: 0; z-index: 6; display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 12px 18px; background: var(--plaque); border-bottom: 1px solid color-mix(in srgb, var(--plaque-ink) 25%, transparent); }
.content { padding: 28px clamp(20px, 2.5vw, 32px) 32px; overflow-wrap: anywhere; }
.emptyTitle { font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 800; margin-bottom: 16px; letter-spacing: -.04em; }
.empty .content { padding-block: 32px; color: var(--plaque-soft); }
.empty .emptyTitle { color: var(--plaque-ink); }
.grab { display: none; }
.close { display: inline-grid; flex: none; width: var(--tap); height: var(--tap); border-radius: 3px; border: 1px solid var(--plaque-soft); background: transparent; color: var(--plaque-ink); cursor: pointer; place-items: center; }
.close:hover { background: var(--plaque-ink); color: var(--plaque); }
.identity { margin: 0 0 16px; font-size: .8rem; font-weight: 700; color: var(--plaque-soft); }
.headline { font-size: clamp(2rem, 3.3vw, 3rem); font-weight: 800; letter-spacing: -.04em; line-height: 1.04; }
.headline:focus-visible { outline: 2px solid var(--plaque-ink); outline-offset: 6px; }
.dek { margin: 16px 0 0; font-size: 1.1rem; line-height: 1.5; color: var(--plaque-soft); }
.scene { margin: 24px 0; overflow: hidden; border-radius: 3px; }
.scene svg { max-height: 180px; object-fit: cover; }
.body { margin-top: 28px; max-width: 62ch; line-height: 1.75; }
.note { margin: 20px 0 0; padding-block: 16px; border-block: 1px solid var(--plaque-soft); color: var(--plaque-soft); font-size: .95rem; max-width: 62ch; }
.open { padding: 0; width: 100%; max-width: none; margin: 0; scrollbar-width: thin; scrollbar-color: var(--plaque-soft) var(--plaque); }
.open:not([open]) { display: none; }
.open::backdrop { background: rgb(0 0 0 / .72); }
.readingNote { margin-top: 22px; font-weight: 700; font-size: .85rem; }
.voiceNote { color: var(--plaque-soft); font-size: .85rem; line-height: 1.5; }
.sectionTitle { margin-top: 32px; font-size: 1.25rem; }
.learning { margin-top: 32px; padding: 24px 0; border-block: 1px solid var(--plaque-soft); }
.learning h3 { font-size: 1.4rem; line-height: 1.25; margin-bottom: 18px; }
.learning summary { cursor: pointer; min-height: var(--tap); padding: 10px 0; font-weight: 700; }
.learning details p { margin-top: 12px; }
.journey { margin-top: 32px; border-top: 1px solid var(--plaque-soft); padding-top: 24px; }
.journey button { min-height: var(--tap); padding: 12px 16px; border: 1px solid var(--plaque-ink); border-radius: 3px; background: var(--plaque); color: var(--plaque-ink); text-align: left; cursor: pointer; font-weight: 700; }
.journey button:hover { background: var(--plaque-ink); color: var(--plaque); }
.journey input { width: 100%; min-height: var(--tap); font: inherit; margin-block: 8px 18px; }
.shareStatus { min-height: 1.5em; font-size: .85rem; margin-top: 8px; }
.chapter { margin-top: 28px; }
.chapter h3 { font-size: 1.2rem; line-height: 1.3; margin-bottom: 12px; }
.glossary { margin-top: 28px; padding-block: 12px; border-block: 1px solid var(--plaque-soft); }
.glossary summary { cursor: pointer; min-height: var(--tap); padding-block: 10px; font-weight: 700; }
.glossary dl { margin: 8px 0 0; }
.glossary dl div { margin-top: 16px; }
.glossary dt { font-weight: 700; }
.glossary dd { margin: 4px 0 0; color: var(--plaque-soft); }
@media (max-width: 899px) { .empty { display: none; } .open { position: fixed; inset: auto 0 0; width: 100%; z-index: 40; max-height: 88dvh; overflow-y: auto; overscroll-behavior: contain; border-radius: 12px 12px 0 0; border-bottom: 0; padding-bottom: env(safe-area-inset-bottom); animation: rise .24s ease-out; } .bar { padding: 10px 16px; } .headline { font-size: clamp(2rem, 7vw, 3rem); } }
@media (min-width: 900px) { .open, .empty { position: sticky; top: 88px; } .open { max-height: calc(100dvh - 104px); overflow-y: auto; animation: appear .24s ease-out; } }
@keyframes rise { from { transform: translateY(24px); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes appear { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
```

### src/components/story/ModeToggle.module.css

```css
.toggle { display: inline-flex; border: 1px solid var(--plaque-soft); border-radius: 3px; overflow: hidden; }
.opt { min-height: var(--tap); padding: 0 16px; border: 0; background: transparent; color: var(--plaque-ink); cursor: pointer; font-size: .9rem; font-weight: 700; }
.opt + .opt { border-left: 1px solid var(--plaque-soft); }
.opt:hover { background: color-mix(in srgb, var(--plaque-ink) 8%, var(--plaque)); }
.opt.on { background: var(--plaque-ink); color: var(--plaque); }
.opt:focus-visible { outline-offset: -5px; outline-color: currentColor; }
```

### src/components/story/MachinePhoto.module.css

```css
.section { margin-top: 26px; max-width: 62ch; }
.heading { font-size: 1.15rem; margin-bottom: 4px; }
.figure { margin: 14px 0 0; }
.img { width: 100%; height: auto; max-height: 360px; object-fit: contain; display: block; border: 1px solid var(--plaque-soft); border-radius: 4px; background: var(--sheet-2); }
.skeletonWrap { margin-top: 26px; max-width: 62ch; display: flex; flex-direction: column; gap: 10px; }
.skeletonTitle { height: 18px; width: 45%; border-radius: 4px; background: linear-gradient(110deg, var(--sheet-2) 30%, var(--sheet) 50%, var(--sheet-2) 70%); background-size: 200% 100%; animation: sheen 1.4s linear infinite; }
.skeleton { height: 180px; border-radius: 4px; background: linear-gradient(110deg, var(--sheet-2) 30%, var(--sheet) 50%, var(--sheet-2) 70%); background-size: 200% 100%; animation: sheen 1.4s linear infinite; }
.missing { margin: 20px 0 0; font-size: 0.9rem; color: var(--plaque-soft); }
.retry { min-height: var(--tap); background: none; border: 1.5px solid var(--plaque-ink); color: var(--plaque-ink); padding: 4px 12px; border-radius: var(--radius); cursor: pointer; font-size: 0.88rem; font-weight: 600; margin-left: 4px; }
.retry:hover { background: var(--plaque-ink); color: var(--plaque); }
.caption { margin-top: 8px; font-size: 0.88rem; color: var(--plaque-soft); line-height: 1.5; }
.label { color: var(--plaque-ink); font-weight: 700; }
.caption a { color: var(--plaque-ink); }
@keyframes sheen { to { background-position-x: -200%; } }
```

## 6. Footer

O rodapé tinha pouco destaque para separar fontes, autoria e uso de IA. Uma frase de encerramento, três colunas com divisórias e melhor espaçamento dão um fechamento visual à experiência e preservam os avisos de procedência.

### src/components/layout/Footer.tsx

```tsx
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer id="about" className={styles.footer}>
     <div className={styles.wrap}>
      <p className={styles.statement}>The hardware is silent.<br />The legacy is still speaking.</p>
      <div className={styles.cols}>
        <section>
          <h2>NASA data</h2>
          <ul>
            <li><a href="https://nssdc.gsfc.nasa.gov/" target="_blank" rel="noreferrer">NSSDCA, NASA's catalog of spacecraft</a>: mission facts</li>
            <li><a href="https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf" target="_blank" rel="noreferrer">NASA Image and Video Library API</a>: photos, credited on each image</li>
            <li><a href="https://ssd-api.jpl.nasa.gov/doc/horizons.html" target="_blank" rel="noreferrer">NASA/JPL Horizons API</a>: Pioneer 10 distance</li>
          </ul>
        </section>
        <section>
          <h2>How AI was used</h2>
          <p>
            Built with AI assistance (Claude by Anthropic, and OpenAI Codex). AI helped write the code and the first-person story texts. The voices are imagined narratives, not spacecraft transcripts.
            The facts were checked against NASA sources. The maps and machine silhouettes are drawn by code, and no
            AI-generated images are used.
          </p>
        </section>
        <section>
          <h2>About this project</h2>
          <p>Made by Enrico Gaspar Rezende Campos, a one-person team at the Itabira (virtual) local event, for the NASA Space Apps Challenge 2026, challenge "Abandoned but Not Forgotten". Not endorsed by NASA. NASA photographs link back to their original NASA record.</p>
        </section>
      </div>
      <div className={styles.base}>
        <p className={styles.brand}>sol404 <span>Abandoned but not forgotten</span></p>
        <nav aria-label="Footer">
          <ul className={styles.links}>
            <li><a href="#machines">Machines</a></li>
            <li><a href="#explore">Map</a></li>
            <li><a href="#top">Back to the top</a></li>
          </ul>
        </nav>
      </div>
     </div>
    </footer>
  )
}
```

### src/components/layout/Footer.module.css

```css
.footer { scroll-margin-top: 72px; background: #141518; color: var(--page-soft); font-size: .9rem; }
.wrap { max-width: 1440px; margin: auto; padding: clamp(56px, 7vw, 96px) clamp(20px, 4vw, 64px) calc(24px + env(safe-area-inset-bottom)); }
.statement { font-family: var(--display); font-weight: 700; font-size: clamp(2rem, 4.5vw, 4.2rem); color: var(--page-ink); letter-spacing: -.04em; line-height: 1.08; margin: 0 0 56px; }
.cols { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px; }
.cols section { border-top: 1px solid #53545b; padding-top: 22px; min-width: 0; }
.footer h2 { font-size: 1.15rem; color: var(--page-ink); margin: 0 0 18px; }
.footer ul { margin: 0; padding-left: 1.1em; }
.footer li { margin-bottom: 12px; }
.footer a { color: var(--page-ink); text-decoration-thickness: 1px; }
.cols a { display: inline-block; min-height: var(--tap); padding-block: 8px; }
.footer a:hover { text-decoration-thickness: 2px; }
.footer p { max-width: 52ch; }
.base { margin-top: 64px; padding-top: 20px; border-top: 1px solid #53545b; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px 24px; }
.brand { margin: 0; font-family: var(--display); font-weight: 800; color: var(--page-ink); font-size: 1.65rem; letter-spacing: -.06em; }
.brand span { display: block; font-family: var(--body); font-weight: 400; color: var(--page-soft); font-size: .8rem; letter-spacing: 0; }
.links { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 4px 8px; }
.links li { margin: 0; }
.links a { display: inline-flex; align-items: center; min-height: var(--tap); padding-inline: 8px; font-weight: 700; }
@media (max-width: 800px) { .cols { grid-template-columns: 1fr; gap: 28px; } .statement { margin-bottom: 36px; } .base { margin-top: 40px; } }
```

## 7. UX geral

As seções tinham pouca diferença de escala e o mapa e o painel pareciam elementos de sistemas visuais distintos. A nova grade compartilha alinhamentos, medidas e tipografia; a navegação, o foco, os diálogos, as fontes NASA e as atividades das etapas anteriores foram preservados.

### src/App.module.css

```css
.band { scroll-margin-top: 72px; background: var(--sheet); color: var(--ink); padding-bottom: clamp(56px, 7vw, 96px); transition: background-color .35s ease, color .35s ease; }
.main { max-width: 1440px; margin: auto; padding: clamp(48px, 6vw, 88px) clamp(20px, 4vw, 64px) 0; display: grid; gap: 28px; grid-template-columns: minmax(0, 1fr); align-items: start; }
.mapCol, .storyCol, .intro { min-width: 0; }
.mapPanel { min-width: 0; margin-top: 20px; }
.intro { grid-column: 1 / -1; padding-bottom: 12px; }
.introTitle { font-size: clamp(2.5rem, 5.2vw, 4.6rem); font-weight: 800; letter-spacing: -.045em; }
.introText { margin: 16px 0 0; max-width: 56ch; color: var(--ink-soft); font-size: 1.05rem; }
@media (min-width: 900px) { .main { grid-template-columns: minmax(0, 1.4fr) minmax(340px, 1fr); gap: 40px; } }
@media (max-width: 640px) { .band { scroll-margin-top: 64px; } }
```

## Arquivos modificados

- src/App.module.css
- src/components/layout/Footer.module.css
- src/components/layout/Footer.tsx
- src/components/layout/Header.module.css
- src/components/layout/Header.tsx
- src/components/layout/Hero.module.css
- src/components/layout/Hero.tsx
- src/components/layout/Machines.module.css
- src/components/layout/Machines.tsx
- src/components/map/DeepSpaceView.module.css
- src/components/map/MachineList.module.css
- src/components/map/MapMarker.module.css
- src/components/map/SurfaceMap.module.css
- src/components/map/WorldTabs.module.css
- src/components/story/MachinePhoto.module.css
- src/components/story/ModeToggle.module.css
- src/components/story/StoryPanel.module.css
- src/components/story/StoryPanel.tsx
