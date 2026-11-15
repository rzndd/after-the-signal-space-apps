import { useEffect, useRef, useState } from 'react'
import { useA11y } from '../../contexts/A11yContext'
import { commandMatches } from '../../lib/ending'
import styles from './CommandPrompt.module.css'

export interface TerminalPrompt { type: 'prompt'; text: string; expected: string }
export function CommandPrompt({ prompt, onSuccess }: { prompt: TerminalPrompt; onSuccess: (value: string) => void }) {
  const { isSafeMode } = useA11y()
  const [value, setValue] = useState('')
  const [seconds, setSeconds] = useState(0)
  const [error, setError] = useState('')
  const submitted = useRef(false)
  useEffect(() => { const timer = setInterval(() => setSeconds(time => time + 1), 1000); return () => clearInterval(timer) }, [])
  const level = Math.min(3, 1 + Math.floor(seconds / 2))
  return <main className={`${styles.screen} ${isSafeMode ? '' : styles['level' + level]}`} data-glitch={!isSafeMode ? '' : undefined} aria-labelledby="emergency-title">
    <div className={styles.terminal}>
      <p className={styles.note}>FICTIONAL TERMINAL EVENT · NOT NASA TELEMETRY</p>
      <h1 id="emergency-title" className={styles.text}>{prompt.text}</h1>
      <p>Protect the local archive before the connection ends. The power reserve cannot be restored.</p>
      <form onSubmit={event => {
        event.preventDefault()
        if (submitted.current) return
        if (!commandMatches(value, prompt.expected)) { setError('Command not recognised. Type ' + prompt.expected + '.'); return }
        submitted.current = true
        onSuccess(value)
      }}>
        <label htmlFor="emergency-command">operator@terminal:~$</label>
        <input autoFocus id="emergency-command" aria-describedby="command-feedback" value={value} onChange={event => setValue(event.target.value)} autoComplete="off" autoCapitalize="characters" spellCheck={false} maxLength={32} />
        <button type="submit">Execute command →</button>
      </form>
      <p id="command-feedback" role="status">{error || 'Enter the command shown above. Recovery remains available if time runs out.'}</p>
    </div>
  </main>
}

