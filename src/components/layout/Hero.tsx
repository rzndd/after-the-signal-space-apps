import { HeroModel } from './HeroModel'
import styles from './Hero.module.css'
import { ScrambleText } from '../ui/ScrambleText'
import { machines } from '../../data/machines'
import { timeline } from '../../data/timeline'

/** Shared space sky, the supplied lunar diorama, and two ways into the stories. */
export function Hero({ onStart, onWatch, onFreeExplore, onReplay, canReplay, unlimited, recoveryPaused = false }: { onStart: () => void; onWatch: () => void; onFreeExplore: () => void; onReplay: () => void; canReplay: boolean; unlimited: boolean; recoveryPaused?: boolean }) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
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
