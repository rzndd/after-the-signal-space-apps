import { useEffect, useRef, useState } from 'react'
import type { Machine, Mode } from '../../types/machine'
import { ScrambleText } from '../ui/ScrambleText'
import styles from './NarrativeTerminal.module.css'
import { terminalClick } from '../../lib/terminalAudio'
import { readNarrativeProgress, saveNarrativeProgress } from '../../lib/readingProgress'

export function NarrativeTerminal({ machine, mode, onComplete }: { machine: Machine; mode: Mode; onComplete: () => void }) {
  const paragraphs = [machine.headline, ...(mode === 'kids' ? machine.kids : machine.deep)]
  const [step, setStep] = useState(() => readNarrativeProgress(machine.id, mode, paragraphs.length).step)
  const terminal = useRef<HTMLElement>(null)
  useEffect(() => {
    terminal.current?.focus({ preventScroll: true })
  }, [])
  const advance = () => {
    terminalClick()
    if (step + 1 === paragraphs.length) {
      saveNarrativeProgress(machine.id, mode, step, true)
      onComplete()
    } else {
      saveNarrativeProgress(machine.id, mode, step + 1)
      setStep((value) => value + 1)
    }
  }
  return (
    <section ref={terminal} tabIndex={0} data-narrative-terminal className={styles.terminal} aria-label="Mission narrative"
      onKeyDown={(event) => {
        if (event.repeat || (event.target instanceof Element && event.target.closest('button, a, input'))) return
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); advance() }
      }}>
      <div className={styles.top}><span>{machine.name} // LOG {step + 1} / {paragraphs.length}</span></div>
      <p className={styles.disclosure}>An imagined voice, grounded in NASA mission records.</p>
      <button type="button" className={styles.line} onClick={advance}>
        <span lang="en" aria-live="polite" aria-atomic="true"><ScrambleText key={step} text={paragraphs[step]} /></span>
      </button>
      <button type="button" className={styles.advance} onClick={advance}>{step + 1 === paragraphs.length ? '[ ENTER: OPEN MISSION RECORD ]' : '[ ENTER / SPACE TO CONTINUE ]'}</button>
    </section>
  )
}
