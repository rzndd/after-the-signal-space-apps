import { useEffect, useState } from 'react'
import { terminalClick } from '../../lib/terminalAudio'
import { useA11y } from '../../contexts/A11yContext'

const glyphs = '%#@&*01'

/** Screen readers receive the final text once; decorative decoding is bounded. */
export function ScrambleText({ text }: { text: string }) {
  const { isSafeMode } = useA11y()
  const [display, setDisplay] = useState(text)
  useEffect(() => {
    terminalClick()
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (isSafeMode || preference.matches) return
    let frame = 0
    const timer = window.setInterval(() => {
      frame += 1
      const revealed = Math.ceil(frame * text.length / 18)
      setDisplay(Array.from(text, (letter, index) => index < revealed || letter === ' ' ? letter : glyphs[Math.floor(Math.random() * glyphs.length)]).join(''))
      if (frame >= 18) window.clearInterval(timer)
    }, 35)
    const onPreference = () => {
      if (preference.matches) { window.clearInterval(timer); setDisplay(text) }
    }
    preference.addEventListener('change', onPreference)
    return () => { window.clearInterval(timer); preference.removeEventListener('change', onPreference) }
  }, [text, isSafeMode])
  return <><span className="sr-only">{text}</span><span aria-hidden="true">{isSafeMode ? text : display}</span></>
}
