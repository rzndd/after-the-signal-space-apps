import type { Machine } from '../../types/machine'
import { useNasaPhotos } from '../../hooks/useNasaPhoto'
import { imageCreditLabel } from '../../lib/nasa'
import styles from './MachinePhoto.module.css'
import { CorruptedImage } from '../ui/CorruptedImage'

/** Real NASA photos and maps for one machine. Nothing empty is drawn when they cannot load. */
export function MachinePhotos({ machine }: { machine: Machine }) {
  const state = useNasaPhotos(machine)

  if (state.status === 'loading') return (
    <div className={styles.skeletonWrap} aria-hidden="true">
      <div className={styles.skeletonTitle} />
      <div className={styles.skeleton} />
    </div>
  )
  if (state.status === 'error') return (
    <p className={styles.missing}>
      The NASA pictures could not be loaded right now.{' '}
      <button type="button" className={styles.retry} onClick={state.retry}>Try again</button>
    </p>
  )
  if (state.photos.length === 0) return <p className={styles.missing}>No pictures available for this machine.</p>

  return (
    <section className={styles.section} aria-label="Pictures from NASA">
      <h3 className={styles.heading}>Pictures from NASA</h3>
      {state.photos.map((p) => (
        <figure key={p.nasaId} className={styles.figure}>
          <CorruptedImage key={p.url} src={p.url} alt={p.label} loading="lazy" decoding="async" className={styles.img} />
          <figcaption className={styles.caption}>
            <span className={styles.label}>{p.label}</span>
            {p.lookFor && <p><strong>Look closely:</strong> {p.lookFor}</p>}
            {' '}{imageCreditLabel[p.kind]}: {p.credit}.{p.date ? ` Capture date: ${p.date}.` : ''}{' '}
            <a href={p.pageUrl} target="_blank" rel="noreferrer">See the NASA record</a>
          </figcaption>
        </figure>
      ))}
    </section>
  )
}
