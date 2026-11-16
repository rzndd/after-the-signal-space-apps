import { useEffect, useState } from 'react'
import styles from './DeathScreen.module.css'
import { TerminalAudioControl } from './BootSequence'
import { TerminalText } from './TerminalText'

export function DeathScreen({ onRecover, archive = false }: { onRecover: () => void; archive?: boolean }) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 4000)
    return () => window.clearTimeout(timer)
  }, [])
  useEffect(() => {
    if (!ready) return
    const recover = (event: KeyboardEvent) => {
      if (event.target instanceof Element && event.target.closest('button, a, input, textarea, select')) return
      if (event.key === 'Enter' && !event.repeat) { event.preventDefault(); onRecover() }
    }
    window.addEventListener('keydown', recover)
    return () => window.removeEventListener('keydown', recover)
  }, [ready, onRecover])
  return (
    <main className={styles.screen} aria-live="assertive" aria-label="Signal lost">
     {!archive && <TerminalAudioControl />}
     <div>
      <p>{archive ? '> SIGNAL LOST.' : "> My battery is low and it's getting dark. SIGNAL LOST."}<span className={styles.cursor} aria-hidden="true">_</span></p>
      {!archive && <small>Imagined voice · not a literal spacecraft transmission.</small>}
      {ready ? <div className={styles.logs} lang="en">
        <p><TerminalText text="> CONNECTING TO THE LOCAL ARCHIVE..." kind="sys" /></p>
        <button className={styles.recover} type="button" onClick={onRecover}>&gt; [ PRESS ENTER ]</button>
      </div> : null}
     </div>
    </main>
  )
}
