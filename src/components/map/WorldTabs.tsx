import type { BodyId } from '../../types/machine'
import styles from './WorldTabs.module.css'

const TABS: { id: BodyId; label: string }[] = [
  { id: 'moon', label: 'The Moon' },
  { id: 'mars', label: 'Mars' },
  { id: 'deep-space', label: 'Deep space' },
]

interface Props {
  value: BodyId
  onChange: (id: BodyId) => void
}

export function WorldTabs({ value, onChange }: Props) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Choose a destination">
      {TABS.map((t) => (
        <button
          key={t.id}
          id={`tab-${t.id}`}
          role="tab"
          aria-selected={value === t.id}
          aria-controls="map-panel"
          tabIndex={value === t.id ? 0 : -1}
          className={`${styles.tab} ${value === t.id ? styles.active : ''}`}
          onClick={() => onChange(t.id)}
          onKeyDown={(e) => {
            const i = TABS.findIndex((x) => x.id === value)
            const next = e.key === 'ArrowRight' ? (i + 1) % TABS.length
              : e.key === 'ArrowLeft' ? (i + TABS.length - 1) % TABS.length
              : e.key === 'Home' ? 0 : e.key === 'End' ? TABS.length - 1 : -1
            if (next < 0) return
            e.preventDefault()
            onChange(TABS[next].id)
            document.getElementById(`tab-${TABS[next].id}`)?.focus()
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
