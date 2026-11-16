import { useState } from 'react'
import type { Machine } from '../../types/machine'
import styles from './StoryPanel.module.css'

export function StoryActions({ machine, nextMachine, onNext }: { machine: Machine; nextMachine: Machine; onNext: (m: Machine) => void }) {
  const [message, setMessage] = useState('')
  const [manualUrl, setManualUrl] = useState('')
  const copy = async () => {
    const url = new URL(window.location.href)
    url.searchParams.set('m', machine.id)
    url.hash = 'explore'
    try {
      await navigator.clipboard.writeText(url.href)
      setMessage('Story link copied.')
    } catch {
      setManualUrl(url.href)
      setMessage('Copy the link below to share this story.')
    }
  }
  return <div className={styles.journey}>
    <button type="button" onClick={copy}>Copy story link</button>
    <p role="status" className={styles.shareStatus}>{message}</p>
    {manualUrl && <label>Story link<input readOnly value={manualUrl} onFocus={(e) => e.currentTarget.select()} /></label>}
    <p>There is another voice to hear.</p>
    <button type="button" onClick={() => onNext(nextMachine)}>Next: {nextMachine.name.replace(/ \(.*\)/, '')} →</button>
  </div>
}
