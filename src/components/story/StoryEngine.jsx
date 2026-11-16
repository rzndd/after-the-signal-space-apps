import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { timeline } from '../../data/timeline.js'
import { StoryScene } from './StoryScene'
import { buildStoryScenes } from '../../lib/storyScenes'
import { DeathScreen } from '../ui/DeathScreen'
import { MissionMemorial } from './MissionMemorial'
import { Epilogue } from './Epilogue'
import { setTerminalSilent } from '../../lib/terminalAudio'
import { createJourneyReducer, loadJourney, JOURNEY_KEY } from '../../lib/journey'
import styles from './StoryEngine.module.css'
import { saveCompletion } from '../../lib/completion'
import { sceneDuration } from '../../lib/sceneTiming'
import { CommandPrompt } from './CommandPrompt'
import { useCalmMotion } from '../../hooks/useCalmMotion'

const chapters = timeline.map((chapter) => ({ ...chapter, scenes: buildStoryScenes(chapter.lines) }))
const reducer = createJourneyReducer(chapters)
export function StoryEngine({ onRestart, onComplete, onBeginEnding, onRevoke }) {
  const calmMotion = useCalmMotion()
  const [state, dispatch] = useReducer(reducer, chapters, loadJourney)
  const [calm, setCalm] = useState(() => { try { return localStorage.getItem('sol404-calm') === 'true' } catch { return false } })
  useEffect(() => { try { localStorage.setItem('sol404-calm', String(calm)) } catch { /* Optional. */ } }, [calm])
  const [playing, setPlaying] = useState(() => {
    try { return localStorage.getItem('sol404-autoplay') !== 'off' } catch { return true }
  })
  const [visible, setVisible] = useState(() => !document.hidden)
  useEffect(() => {
    const update = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])
  useEffect(() => {
    if (state.awaitingResume) return
    try { localStorage.setItem(JOURNEY_KEY, JSON.stringify(state)) } catch { /* Private storage is optional. */ }
  }, [state])
  useEffect(() => { try { localStorage.setItem('sol404-autoplay', playing ? 'on' : 'off') } catch { /* Optional. */ } }, [playing])
  const screen = useRef(null)
  const exitTimer = useRef(null)
  const exiting = useRef(false)
  const [transitioning, setTransitioning] = useState(false)
  useEffect(() => () => window.clearTimeout(exitTimer.current), [])
  const transition = useCallback((action) => {
    if (exiting.current) return
    if (calmMotion) { dispatch(action); return }
    exiting.current = true
    setTransitioning(true)
    exitTimer.current = window.setTimeout(() => {
      dispatch(action)
      exiting.current = false
      setTransitioning(false)
    }, 200)
  }, [calmMotion])
  const openArchive = useCallback(() => dispatch({ type: 'archive' }), [])
  useEffect(() => {
    setTerminalSilent(state.stage === 'death' && !state.awaitingResume)
    if (state.stage === 'narrative' || state.awaitingResume) screen.current?.focus({ preventScroll: true })
    return () => setTerminalSilent(false)
  }, [state.stage, state.awaitingResume])
  const chapterIndex = chapters.findIndex((chapter) => chapter.id === state.chapterId)
  const chapter = chapters[chapterIndex]
  const scene = chapter.scenes[state.sceneIndex]
  const sceneKey = chapter.id + '-' + state.sceneIndex
  const [readyScene, setReadyScene] = useState('')
  const [typedScene, setTypedScene] = useState('')
  const [revealedScene, setRevealedScene] = useState('')
  const textComplete = calmMotion || scene.type === 'tech' || typedScene === sceneKey || revealedScene === sceneKey
  const onSceneReady = useCallback((ready) => setReadyScene(ready ? sceneKey : ''), [sceneKey])
  const onSceneTyped = useCallback(() => setTypedScene(sceneKey), [sceneKey])
  const pause = useCallback(() => setPlaying(false), [])
  const advance = useCallback(() => {
    if (!textComplete) { setRevealedScene(sceneKey); return }
    transition({ type: 'advance' })
  }, [textComplete, sceneKey, transition])
  const goBack = () => { pause(); dispatch({ type: 'back' }) }
  const togglePlayback = () => { if (playing) pause(); else setPlaying(true) }
  const readingTime = sceneDuration(scene, calm)
  useEffect(() => {
    if (state.stage !== 'narrative' || scene.type === 'prompt' || state.awaitingResume || !playing || !visible || !textComplete || transitioning || readyScene !== sceneKey) return
    const timer = window.setTimeout(() => {
      if (!document.hidden) advance()
    }, readingTime)
    return () => window.clearTimeout(timer)
  }, [advance, readingTime, playing, visible, state, readyScene, sceneKey, scene.type, textComplete, transitioning])
  const restart = () => {
    try { localStorage.removeItem(JOURNEY_KEY) } catch { /* Optional. */ }
    onRestart()
  }
  if (state.awaitingResume) return <main ref={screen} tabIndex={-1} className={styles.screen} lang="en">
    <header className={styles.header}>LOCAL ARCHIVE FOUND</header>
    <div><h1>Continue recovery?</h1><p>{chapter.title} · scene {state.sceneIndex + 1}</p>
      <div className={`${styles.controls} ${styles.resumeControls}`}><button type="button" onClick={() => dispatch({ type: 'resume' })}>Continue where I left off</button><button type="button" onClick={() => dispatch({ type: 'restart' })}>Restart the journey</button></div>
    </div><p>Progress stays on this device.</p>
  </main>
  if (state.stage === 'death') return <DeathScreen archive onRecover={openArchive} />
  if (state.stage === 'memorial') return <div className={transitioning ? styles.leaving : undefined}><MissionMemorial key={chapter.id} chapter={chapter} onNext={() => transition({ type: 'next' })} /></div>
  if (state.stage === 'epilogue') return <Epilogue onRestart={restart} onPreserve={() => { saveCompletion(state) }} onRevoke={onRevoke} onBeginEnding={onBeginEnding} onExplore={() => { if (saveCompletion(state)) onComplete() }} recovered={Object.keys(state.answers).length} names={chapters.map(item => item.title)} />
  if (scene.type === 'prompt') return <CommandPrompt key={sceneKey} prompt={scene} onSuccess={value => dispatch({ type: 'command', value })} />
  return <main ref={screen} tabIndex={0} className={`${styles.screen} ${transitioning ? styles.leaving : ''}`} lang="en" aria-label="Chronological NASA mission archive"
    onClick={event => {
      if (!event.target.closest('button, a, input, summary, details, figure')) advance()
    }}
    onKeyDown={(event) => {
      if (transitioning || event.repeat || event.target.closest('button, a, input, summary')) return
      if (event.key === ' ') { event.preventDefault(); togglePlayback() }
      if (event.key === 'Enter' || event.key === 'ArrowRight') { event.preventDefault(); advance() }
      if (event.key === 'ArrowLeft') { event.preventDefault(); goBack() }
    }}>
    <header className={styles.header}><span>{chapter.year} // {chapter.title}</span><span>Chapter {chapterIndex + 1}/{chapters.length} · Imagined voice</span></header>
    <StoryScene key={sceneKey} chapter={chapter} scene={scene} sceneIndex={state.sceneIndex} onReady={onSceneReady} onPause={pause} onTyped={onSceneTyped} reveal={revealedScene === sceneKey} />
    <footer className={styles.footer}>
      <span>SCENE {state.sceneIndex + 1}/{chapter.scenes.length} · {!textComplete ? 'RECEIVING TEXT' : playing ? readyScene === sceneKey ? 'AUTOPLAY' : 'AUTO HELD' : 'PAUSED'}</span>
      <div className={styles.controls} aria-label="Narrative controls">
        <button type="button" aria-pressed={calm} onClick={() => setCalm((value) => !value)}>{calm ? 'Calm pace' : 'Normal pace'}</button>
        <button type="button" disabled={state.sceneIndex === 0} onClick={goBack}>← Back</button>
        <button type="button" onClick={togglePlayback}>{playing ? 'Pause' : 'Continue'}</button>
        <button type="button" onClick={advance}>{textComplete ? 'Next →' : 'Reveal text'}</button>
      </div>
    </footer>
  </main>
}
export default StoryEngine
