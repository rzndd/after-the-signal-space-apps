import type { Machine } from '../../types/machine'
import styles from './SpaceDestinations.module.css'

export function SpaceDestinations({ machines, selectedId, onSelect }: {
  machines: Machine[]; selectedId: string | null; onSelect: (id: string) => void
}) {
  return <section className={styles.section} aria-label="Other solar-system resting places">
    <h3>Not every journey ends on a planet.</h3>
    <p>Asteroid surfaces, a dwarf-planet orbit and paths around the Sun. Select a record to recover its story. These are destination records, not plotted current positions.</p>
    <ul className={styles.list}>{machines.filter(machine => machine.id !== 'pioneer-10').map(machine =>
      <li key={machine.id}><button type="button" className={styles.record} onClick={() => onSelect(machine.id)} aria-pressed={selectedId === machine.id}>
        <img src={machine.cover.localSrc} alt={machine.cover.label} loading="lazy" decoding="async" width="100" height="100" />
        <span><strong>{machine.name}</strong><span className={styles.destination}>{machine.destination}</span><small>{machine.years} · {machine.cover.classification} · {machine.cover.credit}</small></span>
        <span className={styles.arrow} aria-hidden="true">↗</span>
      </button></li>
    )}</ul>
  </section>
}
