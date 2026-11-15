import type { Machine } from '../../types/machine'
import { learning } from '../../data/learning'
import styles from './MachineList.module.css'

interface Props {
  machines: Machine[]
  selectedId: string | null
  onSelect: (id: string) => void
}

/** An index under the map: big touch targets and a keyboard path to every story. */
export function MachineList({ machines, selectedId, onSelect }: Props) {
  return (
    <ul className={styles.list} aria-label="Machines in this world">
      {machines.map((m) => (
        <li key={m.id}>
          <button type="button" className={`${styles.row} ${selectedId === m.id ? styles.on : ''}`}
            aria-pressed={selectedId === m.id} onClick={() => onSelect(m.id)}>
            <svg className={styles.flag} viewBox="0 0 16 16" aria-hidden="true">
              <line x1="4" y1="14" x2="4" y2="2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M4 2 L13 5 L4 8.5 Z" fill="var(--flag)" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
            </svg>
            <span className={styles.name}>{m.name}</span>
            <span className={styles.meta}><span>{m.statusLabel}</span><small>{learning[m.id].legacy}</small></span>
          </button>
        </li>
      ))}
    </ul>
  )
}
