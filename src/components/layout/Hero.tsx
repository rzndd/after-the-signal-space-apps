import { mulberry32 } from '../../lib/rng'
import { HeroModel } from './HeroModel'
import styles from './Hero.module.css'
import { ScrambleText } from '../ui/ScrambleText'
import { machines } from '../../data/machines'
import { timeline } from '../../data/timeline'

const W = 1200, H = 800
const rnd = mulberry32(404)
const stars = Array.from({ length: 90 }, () => ({
  x: rnd() * W,
  y: rnd() * H * 0.9,
  r: 1 + rnd() * 2.4,
  d: rnd() * 4,
}))

/** Storybook sky, the supplied lunar diorama, and two ways into the stories. */
export function Hero({ onStart, onWatch, onFreeExplore, onReplay, canReplay, unlimited, recoveryPaused = false }: { onStart: () => void; onWatch: () => void; onFreeExplore: () => void; onReplay: () => void; canReplay: boolean; unlimited: boolean; recoveryPaused?: boolean }) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <svg className={styles.scene} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#161b44" />
            <stop offset="1" stopColor="#161b44" />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill="url(#hero-sky)" />
        {stars.map((s, i) => (
          <circle key={i} className={styles.star} cx={s.x} cy={s.y} r={s.r} style={{ animationDelay: `${s.d}s` }} />
        ))}
      </svg>
      <div className={styles.inner}>
      <div className={styles.copy}>
        <p className={styles.context}><ScrambleText text={`NASA archives · ${machines.length} mission stories`} /></p>
        <h1 id="hero-title" className={styles.title}>Left behind.<span>Still part of the story.</span></h1>
        <p className={styles.lede}>
          NASA machines remain on the Moon, on Mars, on asteroids and in solar orbits.
          Discover why they stayed, what they found and what their records can still teach us.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.primary} onClick={onWatch}>Explore the map</button>
          <button type="button" className={styles.secondary} onClick={onFreeExplore}>Meet the machines</button>
          {canReplay && <button type="button" className={styles.secondary} onClick={onReplay}>{recoveryPaused ? 'Continue recovery' : 'Replay the recovered stories'}</button>}
        </div>
        <a className={styles.mapLink} href="#explore">Find them on the map <span aria-hidden="true">↓</span></a>
        <p className={styles.promise}>{unlimited ? 'Journey complete. Unlimited energy: explore every archive at your own pace.' : recoveryPaused ? 'Connection ended. Your local archive is safe. Continue recovery to unlock unlimited energy.' : `The terminal reserve is running out. Recover ${timeline.length} short chapters to unlock unlimited exploration.`}</p>
        <button type="button" className={styles.mapLink} onClick={onStart}>Meet Opportunity →</button>
      </div>
      <HeroModel />
      </div>
    </section>
  )
}
