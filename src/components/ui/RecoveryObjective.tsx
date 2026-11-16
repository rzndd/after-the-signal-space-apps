import styles from './RecoveryObjective.module.css'

export function RecoveryObjective({ battery, found, onRecover }: { battery: number; found: boolean; onRecover: () => void }) {
  const critical = battery < 5
  const unstable = battery < 10
  return <section className={styles.objective} aria-labelledby="recovery-objective">
    <div><p className={styles.label}>RECOVERY OPERATIONS · FICTIONAL PROLOGUE</p><h2 id="recovery-objective">Locate the incomplete archive.</h2>
      <p>Identify the local fragment before the connection fails. The signal will end; recovered records remain.</p>
      <p className={styles.status} role="status">{critical ? '> NETWORK NOT RESPONDING. LOCAL MEMORY PRESERVED.' : unstable ? '> TRANSMISSION INTERRUPTED. RETRY UNANSWERED.' : found ? '> FRAGMENT IDENTIFIED. LOCAL COPY PREPARED.' : '> DETECTED: UNINDEXED LOCAL RECORD.'}</p>
    </div>
    <button type="button" disabled={found} onClick={onRecover}>{found ? 'Fragment identified ✓' : 'Identify fragment'}</button>
    {unstable && <div className={styles.packet} aria-hidden="true">0010 // LOCAL_ARCHIVE // {critical ? 'LINK LOST_' : 'RETRY…'}<span /></div>}
  </section>
}
