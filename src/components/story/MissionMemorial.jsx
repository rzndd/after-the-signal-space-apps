import { useEffect, useRef } from 'react'
import { LastRecord } from './LastRecord'
import styles from '../ui/MemorialScreen.module.css'

export function MissionMemorial({ chapter, onNext }) {
  const heading = useRef(null)
  useEffect(() => { heading.current?.focus({ preventScroll: true }); window.scrollTo(0, 0) }, [])
  return <main className={styles.archive} lang="en" aria-labelledby="mission-archive-title"><div className={styles.record}>
    <p className={styles.meta}>AFTER THE SIGNAL // RECOVERED NASA ARCHIVE</p>
    <h1 ref={heading} tabIndex={-1} id="mission-archive-title">{chapter.title}</h1>
    <p className={styles.note}>The voice is imagined. This record belongs to the real mission.</p>
    <LastRecord key={chapter.id} recordId={chapter.machineId ?? chapter.id} recovered />
    <details><summary>Mission facts and scientific legacy</summary>
      <section><h2>DURATION</h2><p>{chapter.memorial.duration}</p></section>
      <section><h2>WHY IT STAYED / WENT SILENT</h2><p>{chapter.memorial.cause}</p></section>
      <section><h2>SCIENTIFIC LEGACY</h2><p>{chapter.memorial.legacy}</p></section>
      <nav className={styles.sources} aria-label="Additional NASA sources">{chapter.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>)}</nav>
    </details>
    <button type="button" className={styles.command} onClick={onNext}>Continue recovery →</button>
  </div></main>
}

