import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createTypingSession } from '../../lib/terminalTyping'
import { useCalmMotion } from '../../hooks/useCalmMotion'
import styles from './TerminalText.module.css'

const subscribeVisibility = (listener: () => void) => {
  document.addEventListener('visibilitychange', listener)
  return () => document.removeEventListener('visibilitychange', listener)
}
const visibleSnapshot = () => !document.hidden

export function TerminalText({ text, kind = 'narrative', reveal = false, onComplete }: {
  text: string; kind?: 'narrative' | 'sys' | 'tech'; reveal?: boolean; onComplete?: () => void
}) {
  const calm = useCalmMotion()
  const visible = useSyncExternalStore(subscribeVisibility, visibleSnapshot, () => true)
  const [progress, setProgress] = useState({ text, length: 0 })
  const progressRef = useRef({ text, length: 0 })
  const characters = Array.from(text)
  const instant = calm || reveal || kind === 'tech'
  const length = instant ? characters.length : progress.text === text ? progress.length : 0
  const complete = length >= characters.length
  useEffect(() => {
    if (!visible && !instant) return
    if (instant) {
      const timer = setTimeout(() => onComplete?.(), 0)
      return () => clearTimeout(timer)
    }
    const session = createTypingSession({
      text, speed: kind === 'sys' ? 5 : 14,
      from: progressRef.current.text === text ? progressRef.current.length : 0,
      onUpdate: length => {
        progressRef.current = { text, length }
        setProgress({ text, length })
      },
      onComplete: () => onComplete?.(),
    })
    return session.stop
  }, [text, kind, instant, visible, onComplete])
  return <span className={styles.transmission} data-typing={!complete}>
    <span className="sr-only">{text}</span>
    <span className={styles.measure} aria-hidden="true">{text}</span>
    <span className={styles.visible} aria-hidden="true"><span data-typed-visible>{characters.slice(0, length).join('')}</span>{!complete && <span className={styles.cursor}>▌</span>}</span>
  </span>
}
