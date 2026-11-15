import { useState, type CSSProperties } from 'react'
import styles from './BiosBoot.module.css'

const bootLines = [
  'SOL/404 RECOVERY TERMINAL v4.19',
  'MEM_CHECK.................... OK',
  'RESTORING MISSION ARCHIVE.... OK',
  'CONNECTING DSN............... ERROR',
  'REROUTING RELAY.............. OK',
  'SEARCHING LAST TELEMETRY..... FOUND',
]

function playUplinkTone() {
  const Audio = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Audio) return
  const context = new Audio()
  const oscillator = context.createOscillator()
  const gain = context.createGain()
  oscillator.type = 'square'
  oscillator.frequency.setValueAtTime(180, context.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(920, context.currentTime + .14)
  gain.gain.setValueAtTime(.0001, context.currentTime)
  gain.gain.exponentialRampToValueAtTime(.045, context.currentTime + .015)
  gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + .18)
  oscillator.connect(gain).connect(context.destination)
  oscillator.start()
  oscillator.stop(context.currentTime + .19)
  window.setTimeout(() => { void context.close() }, 260)
}

export function BiosBoot({ onInitialize }: { onInitialize: () => void }) {
  const [ready, setReady] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [flashing, setFlashing] = useState(false)
  const initialize = () => {
    if (!ready || flashing) return
    playUplinkTone()
    setFlashing(true)
    window.setTimeout(onInitialize, 110)
  }

  return (
    <main className={`${styles.boot} ${flashing ? styles.flashing : ''}`} tabIndex={0} autoFocus
      onKeyDown={(event) => { if (event.key === 'Enter') initialize() }} aria-label="SOL 404 recovery terminal boot sequence">
      <section className={styles.terminal} aria-live="polite">
        <p className={styles.system}>NASA // DEEP SPACE NETWORK // RESTRICTED RECOVERY NODE</p>
        <div className={styles.log}>
          {bootLines.map((line, index) => <p key={line} className={styles.line} style={{ '--delay': `${index * .34}s` } as CSSProperties}
            onAnimationEnd={index === bootLines.length - 1 ? () => setReady(true) : undefined}>{line}</p>)}
        </div>
        <button type="button" disabled={!ready || flashing} onClick={initialize} className={styles.gate}>
          [ PRESS ENTER TO INITIALIZE UPLINK ]
        </button>
      </section>
    </main>
  )
}
