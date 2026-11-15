import type { Mode } from '../../types/machine'
import styles from './ModeToggle.module.css'

interface Props {
  mode: Mode
  onChange: (m: Mode) => void
}

export function ModeToggle({ mode, onChange }: Props) {
  return (
    <div className={styles.toggle} role="group" aria-label="Reading level">
      {(['kids', 'deep'] as const).map((m) => (
        <button key={m} type="button" aria-pressed={mode === m} aria-label={m === 'kids' ? 'Kids, ages 9 to 12' : 'Deep dive, more science detail'}
          className={`${styles.opt} ${mode === m ? styles.on : ''}`} onClick={() => onChange(m)}>
          {m === 'kids' ? 'Kids' : 'Deep dive'}
        </button>
      ))}
    </div>
  )
}
