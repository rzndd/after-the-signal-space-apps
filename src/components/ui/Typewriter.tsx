import { useEffect, useState } from 'react'
import { useA11y } from '../../contexts/A11yContext'
export function Typewriter({ text, speed = 30 }: { text: string; speed?: number }) {
  const { isSafeMode } = useA11y()
  const [length, setLength] = useState(0)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  useEffect(() => {
    if (isSafeMode || reduce) return
    const timer = setInterval(() => setLength(value => {
      if (value >= text.length) { clearInterval(timer); return value }
      return value + 1
    }), speed)
    return () => clearInterval(timer)
  }, [text, speed, isSafeMode, reduce])
  return <><span className="sr-only">{text}</span><span aria-hidden="true">{isSafeMode || reduce ? text : text.slice(0, length)}</span></>
}

