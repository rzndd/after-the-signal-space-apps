import type { Source } from '../../types/machine'
import styles from './SourceList.module.css'

export function SourceList({ sources }: { sources: Source[] }) {
  return (
    <div className={styles.sources}>
      <h3>Sources</h3>
      <ul>
        {sources.map((s) => (
          <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.label}</a></li>
        ))}
      </ul>
    </div>
  )
}
