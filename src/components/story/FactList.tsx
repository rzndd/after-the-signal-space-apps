import type { Fact } from '../../types/machine'
import styles from './FactList.module.css'

export function FactList({ facts }: { facts: Fact[] }) {
  return (
    <dl className={styles.facts}>
      {facts.map((f) => (
        <div key={f.label} className={styles.row}>
          <dt>{f.label}</dt>
          <dd>{f.value}</dd>
        </div>
      ))}
    </dl>
  )
}
