import { useId, useState } from 'react'
import { lastRecords } from '../../data/lastRecords'
import type { Mode } from '../../types/machine'
import styles from './LastRecord.module.css'

interface Props {
  recordId: string
  mode?: Mode
  recovered?: boolean
}

/** A documentary reveal. Looking closer is optional; there is no collection or score. */
export function LastRecord({ recordId, mode = 'kids', recovered = false }: Props) {
  const titleId = useId()
  const [failed, setFailed] = useState(false)
  const record = lastRecords[recordId]
  if (!record) return null
  return <section className={`${styles.record} ${recovered ? styles.recovered : ''}`} aria-labelledby={titleId}>
    <header className={styles.heading}>
      <p className={styles.label}>The Last Record</p>
      <h2 id={titleId}>{record.title}</h2>
      <p className={styles.context}>A document behind the story. Not every record is a mission’s final image.</p>
    </header>
    <div className={styles.reveal}>
      <figure className={styles.figure}>
        {failed ? <p className={styles.unavailable}>The image could not be loaded. The explanation and original NASA record remain available.</p> :
          <img src={record.image.src} alt={record.image.alt} width="640" height="480" loading="lazy" decoding="async" onError={() => setFailed(true)} />}
        <figcaption>{record.image.caption}<span>{record.image.kind} · {record.image.credit}</span>
          {recovered && <span>Monochrome archive display. Unfiltered original available in the NASA record.</span>}
        </figcaption>
      </figure>
      <div className={styles.explanation}>
        <h3>What this tells us</h3>
        <p>{record.explanation}</p>
        <a className={styles.source} href={record.image.source} target="_blank" rel="noreferrer">Open original NASA record ↗</a>
        <details className={styles.details} open={mode === 'deep' ? true : undefined}>
          <summary>How do we know?</summary>
          <p>{record.detail}</p>
          <p className={styles.limit}><strong>What this record cannot tell us:</strong> {record.limit}</p>
          <a href={record.source.url} target="_blank" rel="noreferrer">{record.source.label} ↗</a>
        </details>
      </div>
    </div>
  </section>
}

