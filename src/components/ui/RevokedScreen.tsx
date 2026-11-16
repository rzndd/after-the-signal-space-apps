import styles from './RevokedScreen.module.css'
export function RevokedScreen({ onReopen }: { onReopen: () => void }) {
  return <main className={styles.screen} aria-label="Session ended"><div>
    <p>&gt; ERROR 404: SESSION ENDED.</p>
    <p className={styles.note}>A fictional ending. You can reopen the terminal or reload this page.</p>
    <button type="button" onClick={onReopen}>&gt; RETURN TO SITE</button>
  </div></main>
}

