import { useEffect, useRef } from 'react'
import { findMachine } from '../../data/machines'
import styles from './MemorialScreen.module.css'

/** Compatibility view for the earlier single-mission archive. */
export function MemorialScreen({ onRestart }: { onRestart: () => void }) {
  const heading = useRef<HTMLHeadingElement>(null)
  const machine = findMachine('opportunity')!
  useEffect(() => { heading.current?.focus({ preventScroll: true }) }, [])
  return <main className={styles.archive} lang="en"><div className={styles.record}>
    <p className={styles.meta}>AFTER THE SIGNAL // PUBLIC NASA RECORDS</p>
    <h1 ref={heading} tabIndex={-1}>ARCHIVE RECOVERED: OPPORTUNITY</h1>
    <p className={styles.note}>An imagined voice based on NASA mission records.</p>
    {machine.deep.map((paragraph, index) => <section key={index}><p>{paragraph}</p></section>)}
    <nav className={styles.sources} aria-label="NASA sources">{machine.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label}</a>)}</nav>
    <button type="button" className={styles.command} onClick={onRestart}>Return to exploration</button>
  </div></main>
}
