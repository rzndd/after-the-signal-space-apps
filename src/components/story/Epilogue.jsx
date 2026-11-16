import { useEffect, useRef, useState } from 'react'
import { Typewriter } from '../ui/Typewriter'
import { useA11y } from '../../contexts/A11yContext'
import { createMissionReport, persistEnding } from '../../lib/ending'
import { stopTerminalAudio } from '../../lib/terminalAudio'
import styles from './Epilogue.module.css'

export function Epilogue({ onRestart, onExplore, onPreserve, onRevoke, onBeginEnding, recovered = 0, names = [] }) {
  const { isSafeMode } = useA11y()
  const [ending, setEnding] = useState('question')
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [report, setReport] = useState('')
  const [copyFailed, setCopyFailed] = useState(false)
  const [command, setCommand] = useState('')
  const [output, setOutput] = useState('Type help to list commands.')
  const heading = useRef(null)
  useEffect(() => { heading.current?.focus({ preventScroll: true }); window.scrollTo(0, 0) }, [ending])
  useEffect(() => {
    if (ending !== 'hibernation') return
    const timer = setTimeout(onRevoke, 1000)
    return () => clearTimeout(timer)
  }, [ending, onRevoke])
  const choose = value => {
    if (ending !== 'question') return
    const decision = value.trim().toUpperCase()
    if (decision !== 'Y' && decision !== 'N') { setFeedback('Enter Y or N.'); return }
    setFeedback('')
    stopTerminalAudio()
    onBeginEnding()
    if (decision === 'Y') {
      persistEnding('dead')
      setEnding('hibernation')
    } else {
      persistEnding('remembered')
      onPreserve()
      setEnding('peace')
    }
  }
  if (ending === 'hibernation') return <main className={`${styles.screen} ${!isSafeMode ? styles.tearing : ''}`} data-glitch={!isSafeMode ? '' : undefined} aria-label="Eternal hibernation">
    <h1 ref={heading} tabIndex={-1}><Typewriter key="hibernation" text="> ETERNAL HIBERNATION INITIATED." speed={10} /></h1>
  </main>
  if (ending === 'question') return <main className={styles.screen} onKeyDown={event => {
    if (event.repeat || event.target.closest('button, input, a, summary')) return
    if (/^[yn]$/i.test(event.key)) { event.preventDefault(); choose(event.key) }
  }} lang="en">
    <p className={styles.meta}>FICTIONAL TERMINAL CLOCK · NOT A MISSION DATE</p>
    <h1 ref={heading} tabIndex={-1}><Typewriter key="question" text="> TIME SINCE LAST CONTACT: 54 YEARS… HAVE WE BEEN FORGOTTEN? [Y/N]" /></h1>
    <p>The terminal’s final question is fiction. The mission records you recovered are real.</p>
    <p>Y ends this fictional terminal session. You can return to the site or reload at any time. N preserves the archive and unlocks unlimited exploration.</p>
    <div className={styles.choices}>
      <button type="button" onClick={() => choose('Y')}>Y · Yes. Begin hibernation.</button>
      <button type="button" onClick={() => choose('N')}>N · No. We remember.</button>
    </div>
    <form onSubmit={event => { event.preventDefault(); choose(answer) }}>
      <label htmlFor="ending-answer">Your answer</label>
      <input id="ending-answer" value={answer} onChange={event => setAnswer(event.target.value)} maxLength={1} autoCapitalize="characters" autoComplete="off" spellCheck={false} aria-describedby="ending-feedback" />
      <button type="submit">Confirm answer</button>
    </form>
    <p id="ending-feedback" role="status">{feedback}</p>
  </main>
  return <main className={`${styles.screen} ${styles.peace}`} lang="en">
    <h1 ref={heading} tabIndex={-1}><Typewriter key="peace" text="THEY ARE NOT SPACE JUNK. THEY ARE OUR FIRST STEPS." /></h1>
    <p>{recovered} mission records preserved. Unlimited exploration is now available.</p>
    <button type="button" onClick={async () => {
      const text = createMissionReport(recovered, names)
      setReport(text); setCopyFailed(false)
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
        await navigator.clipboard.writeText(text)
        setFeedback('Mission report copied.')
      } catch { setCopyFailed(true); setFeedback('Copy unavailable. Select the report below and copy it manually.') }
    }}>&gt; GENERATE MISSION REPORT</button>
    <p role="status">{feedback}</p>
    {report && <pre className={styles.report} tabIndex={0} aria-label="Mission report">{report}</pre>}
    {copyFailed && <textarea className={styles.manualCopy} readOnly value={report} aria-label="Select mission report to copy" onFocus={event => event.currentTarget.select()} />}
    <button type="button" onClick={onExplore}>Back to exploration · unlimited energy ∞</button>
    <details className={styles.commands}><summary>Terminal commands</summary>
      <form onSubmit={event => {
        event.preventDefault()
        const value = command.trim().toLowerCase()
        if (value === 'restart') { onRestart(); return }
        setOutput(value === 'help' ? 'help — available commands\ncredits — team and sources\nrestart — restart from boot' : value === 'credits' ? 'AFTER THE SIGNAL — Project team:\nEnrico Gaspar Rezende Campos\nAlan Flávio de Albuquerque Ferreira\nLuis Otavio Coelho de Azevedo\nAI-assisted code and writing: OpenAI Codex and Claude. NASA/JPL sources are linked in each archive. Imagined voices. Independent project, not endorsed by NASA.' : 'Unknown command. Type help.')
        setCommand('')
      }}>
        <label htmlFor="terminal-command">user@after-signal:~$</label>
        <input id="terminal-command" value={command} onChange={event => setCommand(event.target.value)} autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={120} aria-label="Terminal command" />
        <button type="submit">EXEC</button>
      </form>
      <p role="status" className={styles.output}>{output}</p>
    </details>
  </main>
}

