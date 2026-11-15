import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { getAudioMuted, subscribeAudio, setTerminalMuted, startTerminalAudio, terminalClick } from '../../lib/terminalAudio'
import styles from './BootSequence.module.css'
import { useA11y } from '../../contexts/A11yContext'

const logs = ['> STARTING KERNEL... OK', '> MEM_CHECK... OK', '> LOADING NASA MISSION ARCHIVES... OK', '> DSN RECOVERY SIMULATION... READY']

export function BootSequence({ onInitialize }: { onInitialize: () => void }) {
  const { isSafeMode, enableSafeMode } = useA11y()
  const [count, setCount] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? logs.length : 1)
  const initialized = useRef(false)
  const screen = useRef<HTMLElement>(null)
  useEffect(() => {
    screen.current?.focus()
  }, [])
  useEffect(() => {
    if (isSafeMode) return
    const timer = window.setInterval(() => setCount((value) => Math.min(logs.length, value + 1)), 450)
    return () => window.clearInterval(timer)
  }, [isSafeMode])
  const ready = isSafeMode || count >= logs.length
  const initialize = () => {
    if (!ready || initialized.current) return
    initialized.current = true
    startTerminalAudio()
    terminalClick()
    onInitialize()
  }
  return (
    <main ref={screen} tabIndex={-1} className={styles.boot} onKeyDown={(event) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return
      if (event.key.toLowerCase() === 'a') { event.preventDefault(); enableSafeMode(); return }
      if (event.key === 'Enter' && !(event.target instanceof Element && event.target.closest('button'))) {
        event.preventDefault(); initialize()
      }
    }} lang="en" aria-label="After the Signal boot sequence">
      <section className={styles.terminal}>
        <h1>AFTER THE SIGNAL // RECOVERY TERMINAL</h1>
        <p className={styles.note}>Narrative simulation · public NASA archives. Connection starts terminal sound effects; sound can be muted.</p>
        <button type="button" className={styles.safeMode} aria-pressed={isSafeMode} onClick={enableSafeMode}>{isSafeMode ? '[ SAFE MODE ENABLED · NO FLICKER ]' : "[ PRESS 'A' FOR SAFE MODE (NO FLICKER) ]"}</button>
        {isSafeMode && <p className={styles.safeStatus} role="status">Visual effects disabled. Text and mission controls remain available.</p>}
        <div className={styles.logs} role="status">{logs.slice(0, isSafeMode ? logs.length : count).map((line) => <p key={line}>{line}</p>)}</div>
        <button type="button" className={styles.command} disabled={!ready} onClick={initialize}>[ PRESS ENTER TO INITIALIZE CONNECTION ]</button>
      </section>
    </main>
  )
}

/** Lives above the experience so audio remains controllable after the boot unmounts. */
export function TerminalAudioControl({ inline = false, docked = false }: { inline?: boolean; docked?: boolean }) {
  const muted = useSyncExternalStore(subscribeAudio, getAudioMuted)
  return <button type="button" className={inline ? styles.inlineAudio : styles.audio + (docked ? ' ' + styles.docked : '')} aria-label={muted ? 'Unmute terminal audio' : 'Mute terminal audio'} aria-pressed={muted} onClick={() => {
    setTerminalMuted(!muted)
  }}>{muted ? 'SOUND: OFF' : 'SOUND: ON'}</button>
}
