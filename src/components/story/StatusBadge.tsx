import styles from './StatusBadge.module.css'

export function StatusBadge({ label, legacy }: { label: string; legacy: string }) {
  return (
    <div>
    <p className={styles.badge}>
      <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
        <line x1="4" y1="14" x2="4" y2="2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M4 2 L13 5 L4 8.5 Z" fill="var(--flag)" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      </svg>
      <span><strong>Hardware:</strong> {label}</span>
    </p>
    <p className={styles.legacy}><strong>Scientific legacy:</strong> {legacy}</p>
    </div>
  )
}
