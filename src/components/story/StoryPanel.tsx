import { useEffect, useRef, useState } from 'react'
import { NarrativeTerminal } from './NarrativeTerminal'
import { TerminalAudioControl } from '../ui/BootSequence'
import { missionLabels } from '../../data/missionLabels'
import type { BodyId, Machine, Mode } from '../../types/machine'
import { ModeToggle } from './ModeToggle'
import { StatusBadge } from './StatusBadge'
import { FactList } from './FactList'
import { SourceList } from './SourceList'
import { MachinePhotos } from './MachinePhoto'
import { NasaCover } from './NasaCover'
import { MachineScene } from './MachineScene'
import { learning } from '../../data/learning'
import { missionStates, glossary } from '../../data/storyGuide'
import { StoryActions } from './StoryActions'
import { LastRecord } from './LastRecord'
import { readNarrativeProgress, saveNarrativeProgress } from '../../lib/readingProgress'
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
  const [completed, setCompleted] = useState('')
  const [replayVersion, setReplayVersion] = useState(0)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const machineId = machine?.id

  // A native modal keeps focus inside the story and makes the background inert.
  useEffect(() => {
    if (!machineId || !dialogRef.current) return
    const dialog = dialogRef.current
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    const present = () => {
      dialog.close()
      dialog.showModal()
      document.body.style.overflow = 'hidden'
      headingRef.current?.focus({ preventScroll: true })
      requestAnimationFrame(() => dialog.querySelector<HTMLElement>('[data-narrative-terminal]')?.focus({ preventScroll: true }))
      dialog.scrollTop = 0
    }
    present()
    return () => {
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

  const narrativeKey = `${machine.id}-${mode}`
  const length = 1 + (mode === 'kids' ? machine.kids : machine.deep).length
  const reading = completed !== narrativeKey && !readNarrativeProgress(machine.id, mode, length).completed

  return (
    <dialog ref={dialogRef} className={`${styles.plaque} ${styles.open}`} aria-label={`Mission record: ${machine.name}`}
      onCancel={(e) => { e.preventDefault(); onClose() }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') { e.preventDefault(); onClose(); return }
        if (e.key !== 'Tab') return
        const controls = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('button, a[href], input, summary, [tabindex="0"]')).filter((el) => el.getClientRects().length > 0)
        const first = controls[0], last = controls[controls.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus() }
      }}>
      <div className={styles.grab} aria-hidden="true" />
      <div className={styles.bar}>
        <ModeToggle mode={mode} onChange={onModeChange} />
        <TerminalAudioControl inline />
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close story">
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M4 4 L16 16 M16 4 L4 16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
        </button>
      </div>
      {reading ? <NarrativeTerminal key={narrativeKey + replayVersion} machine={machine} mode={mode} onComplete={() => {
        setCompleted(narrativeKey)
        requestAnimationFrame(() => { dialogRef.current?.scrollTo(0, 0); headingRef.current?.focus({ preventScroll: true }) })
      }} /> : <>
      <div className={styles.content}>
        <p className={styles.identity}>{machine.name} · {machine.years}</p>
        <h2 ref={headingRef} tabIndex={-1} id="story-heading" className={styles.headline}>{machine.headline}</h2>
        <p className={styles.dek}>{machine.tagline}</p>
        <LastRecord key={'last-record-' + machine.id} recordId={machine.id} mode={mode} />
        <section className={styles.brief} aria-labelledby="mission-brief-title">
          <div className={styles.briefHeading}>
            <p>Mission brief</p>
            <h3 id="mission-brief-title">Behind the story</h3>
          </div>
          <dl className={styles.briefList}>
            <div><dt>State</dt><dd>{missionLabels[machine.id].state}</dd></div>
            <div><dt>Why it stopped / stayed</dt><dd>{missionLabels[machine.id].reason}</dd></div>
            <div><dt>Record focus</dt><dd lang="en">{learning[machine.id].question}</dd></div>
            <div><dt>Legacy</dt><dd>{missionLabels[machine.id].legacy}</dd></div>
          </dl>
        </section>
        <NasaCover key={'cover-' + machine.id} image={machine.cover} story />
        <StatusBadge label={missionStates[machine.id].hardware} legacy={missionStates[machine.id].legacy} />
        <button type="button" className={styles.replay} onClick={() => { saveNarrativeProgress(machine.id, mode, 0); setCompleted(''); setReplayVersion((value) => value + 1) }}> &gt; REPLAY: mission_voice.log</button>
        <p className={styles.voiceNote}>An imagined voice based on NASA mission records.</p>
        <details className={styles.glossary}>
          <summary>Words for this journey</summary>
          <dl>{glossary.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl>
        </details>
        <MachinePhotos machine={machine} />
        <h3 className={styles.sectionTitle}>Mission facts</h3>
        <FactList facts={mode === 'deep' ? machine.facts : machine.facts.slice(0, 2)} />
        {machine.note && <p className={styles.note}>{machine.note}</p>}
        <SourceList sources={machine.sources} />
        <StoryActions key={machine.id} machine={machine} nextMachine={nextMachine} onNext={onNext} />
      </div>
      </>}
    </dialog>
  )
}
