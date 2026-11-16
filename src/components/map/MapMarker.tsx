// deslop-ignore-file 24: the flag SVG is the map's interactive location control.
import type { CSSProperties } from 'react'
import styles from './MapMarker.module.css'

interface Props {
  x: number
  y: number
  label: string
  selected: boolean
  /** Position in the world, used to stagger the "raise the flag" entrance. */
  index?: number
  onSelect: () => void
}

/** A survey flag planted at the machine's location. The 44px button is the touch target. */
export function MapMarker({ x, y, label, selected, index = 0, onSelect }: Props) {
  return (
    <button
      type="button"
      className={`${styles.marker} ${selected ? styles.selected : ''} ${x > 0.55 ? styles.tipLeft : ''}`}
      style={{ left: `${x * 100}%`, top: `${y * 100}%`, '--i': index } as CSSProperties}
      aria-label={label}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <svg className={styles.svg} viewBox="0 0 44 44" aria-hidden="true">
        <ellipse className={styles.base} cx="14" cy="39" rx="7" ry="2.4" />
        <g className={styles.flag}>
          <line className={styles.pole} x1="14" y1="39" x2="14" y2="6" />
          <path className={styles.pennant} d="M14 6 L38 14 L14 23 Z" />
        </g>
      </svg>
      <span className={styles.tip} aria-hidden="true">{label}</span>
    </button>
  )
}
