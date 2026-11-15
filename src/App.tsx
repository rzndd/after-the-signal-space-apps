import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import type { BodyId, Machine } from './types/machine'
import { findMachine, machines, machinesByBody } from './data/machines'
import { useMode } from './hooks/useMode'
import { usePioneer } from './hooks/usePioneer'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/layout/Hero'
import { Machines } from './components/layout/Machines'
import { WorldTabs } from './components/map/WorldTabs'
import { SurfaceMap } from './components/map/SurfaceMap'
import { DeepSpaceView } from './components/map/DeepSpaceView'
import { SpaceDestinations } from './components/map/SpaceDestinations'
import { MachineList } from './components/map/MachineList'
import { CRTOverlay } from './components/ui/CRTOverlay'
import { BootSequence, TerminalAudioControl } from './components/ui/BootSequence'
import { DeathScreen } from './components/ui/DeathScreen'
import { TelemetryHud } from './components/ui/TelemetryHud'
import { useTelemetryState } from './hooks/useTelemetryState'
import { storyIdFromUrl, storyUrl, sectionUrl } from './lib/navigation'
import styles from './App.module.css'
import { setTerminalSilent, startTerminalAudio, stopTerminalAudio } from './lib/terminalAudio'
import { clearCompletion, readCompletion } from './lib/completion'
import { JOURNEY_KEY } from './lib/journey'
import { RecoveryObjective } from './components/ui/RecoveryObjective'
import { explorationDestinations, explorationPhaseAfterExit } from './lib/explorationFlow'
import { useA11y } from './contexts/A11yContext'
import { clearEnding, restoreTerminalAccess } from './lib/ending'
import { RevokedScreen } from './components/ui/RevokedScreen'
import { CommandPrompt } from './components/story/CommandPrompt'
import { prologuePrompt } from './data/timeline'
import { useMarsTelemetry } from './hooks/useMarsTelemetry'

const StoryPanel = lazy(() => import('./components/story/StoryPanel').then((module) => ({ default: module.StoryPanel })))
const StoryEngine = lazy(() => import('./components/story/StoryEngine.jsx').then((module) => ({ default: module.StoryEngine })))

// Entry always starts at the exploration landing page, even from an old story URL.
const machineIds = machines.map((m) => m.id)
const entryMachine = findMachine(storyIdFromUrl(new URL(window.location.href), machineIds))
const scrollToSection = (hash: string, moveFocus = false) => requestAnimationFrame(() => {
  const target = document.getElementById(hash.replace('#', '') || 'top')
  target?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches || Math.abs(target?.getBoundingClientRect().top ?? 0) > window.innerHeight * 2 ? 'instant' : 'smooth', block: 'start',
  })
  if (moveFocus && target) { target.tabIndex = -1; target.focus({ preventScroll: true }) }
})

export default function App() {
  const [revoked, setRevoked] = useState(false)
  const revoke = useCallback(() => setRevoked(true), [])
  const reopen = useCallback(() => { restoreTerminalAccess(); setRevoked(false) }, [])
  return revoked ? <RevokedScreen onReopen={reopen} /> : <Experience onRevoke={revoke} />
}

function Experience({ onRevoke }: { onRevoke: () => void }) {
  const { isSafeMode } = useA11y()
  useEffect(() => () => stopTerminalAudio(), [])
  const [phase, setPhase] = useState<'boot' | 'exploration' | 'free' | 'archive' | 'pausedArchive'>('boot')
  const [unlocked, setUnlocked] = useState(readCompletion)
  const [fragmentFound, setFragmentFound] = useState(false)
  const [promptSolved, setPromptSolved] = useState(false)
  const [endingActive, setEndingActive] = useState(false)
  const [storyRun, setStoryRun] = useState(0)
  const initialized = phase !== 'boot'
  const showMemorial = phase === 'archive'
  const freeExploration = phase === 'free'
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [suggestedId, setSuggestedId] = useState(entryMachine?.id ?? null)
  const telemetry = useTelemetryState(phase === 'exploration')
  useEffect(() => {
    setTerminalSilent(phase === 'exploration' && telemetry.signalLost)
  }, [phase, telemetry.signalLost])
  const openMemorial = useCallback(() => { setEndingActive(false); startTerminalAudio(); setPhase('archive'); window.scrollTo(0, 0) }, [])
  const beginEnding = useCallback(() => setEndingActive(true), [])
  const [body, setBody] = useState<BodyId>('moon')
  const [mode, setMode] = useMode()
  const pioneer = usePioneer()
  const marsTelemetry = useMarsTelemetry(initialized)
  const [openedIds, setOpenedIds] = useState<string[]>(() => {
    let stored: unknown = []
    try { stored = JSON.parse(localStorage.getItem('sol404-opened-stories') ?? '[]') } catch { /* Storage is optional. */ }
    const valid = Array.isArray(stored) ? stored.filter((id): id is string => typeof id === 'string' && machineIds.includes(id)) : []
    return [...new Set(valid)]
  })
  useEffect(() => {
    try { localStorage.setItem('sol404-opened-stories', JSON.stringify(openedIds)) } catch { /* Exploration still works without storage. */ }
  }, [openedIds])

  // each world re-colours the whole page
  useEffect(() => {
    document.documentElement.dataset.world = body
  }, [body])

  // Discard stale machine links on entry so a previous session cannot skip exploration.
  useEffect(() => {
    window.history.replaceState(null, '', sectionUrl(window.location.href, '#top'))
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const close = useCallback(() => {
    setSelectedId(null)
    window.history.replaceState(null, '', sectionUrl(window.location.href, window.location.hash || '#explore'))
  }, [])

  // Handle real navigation events, including browser Back/Forward, in callbacks.
  useEffect(() => {
    const syncLocation = () => {
      const machine = findMachine(storyIdFromUrl(new URL(window.location.href), machineIds))
      setSelectedId(machine?.id ?? null)
      if (machine) {
        setBody(machine.body)
        setOpenedIds((ids) => ids.includes(machine.id) ? ids : [...ids, machine.id])
      }
      scrollToSection(machine ? '#explore' : window.location.hash || '#top', !machine)
    }
    const onAnchor = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null
      const hash = anchor?.getAttribute('href')
      if (!hash || !['#top', '#machines', '#about', '#explore', '#story'].includes(hash)) return
      event.preventDefault()
      setSelectedId(null)
      window.history.pushState(null, '', sectionUrl(window.location.href, hash))
      scrollToSection(hash, true)
    }
    window.addEventListener('popstate', syncLocation)
    window.addEventListener('hashchange', syncLocation)
    document.addEventListener('click', onAnchor)
    return () => {
      window.removeEventListener('popstate', syncLocation)
      window.removeEventListener('hashchange', syncLocation)
      document.removeEventListener('click', onAnchor)
    }
  }, [])

  const inWorld = machinesByBody(body)
  const selected = findMachine(selectedId)

  const changeWorld = (id: BodyId) => {
    setBody(id)
    close()
  }

  const pick = (m: Machine) => {
    setBody(m.body)
    setSelectedId(m.id)
    setOpenedIds((ids) => ids.includes(m.id) ? ids : [...ids, m.id])
    const url = storyUrl(window.location.href, m.id)
    if (url.href !== window.location.href) window.history.pushState(null, '', url)
    scrollToSection('#explore')
  }
  const selectId = (id: string) => {
    const machine = findMachine(id)
    if (machine) pick(machine)
  }

  const restartExperience = () => {
    clearCompletion()
    clearEnding()
    try { localStorage.removeItem(JOURNEY_KEY) } catch { /* Optional. */ }
    setUnlocked(false); setFragmentFound(false); setPromptSolved(false); setEndingActive(false); setSelectedId(null)
    stopTerminalAudio(); telemetry.reset(); setPhase('boot'); window.scrollTo(0, 0)
  }
  const replayStories = () => {
    try { localStorage.removeItem(JOURNEY_KEY) } catch { /* Optional. */ }
    close(); setStoryRun((value) => value + 1); openMemorial()
  }
  const navigateSection = (hash: string) => {
    close()
    window.history.pushState(null, '', sectionUrl(window.location.href, hash))
    scrollToSection(hash, true)
  }
  if (!initialized) return <><CRTOverlay /><BootSequence onInitialize={() => setPhase(unlocked ? 'free' : 'exploration')} /></>
  if (showMemorial) return <>{!endingActive && <><CRTOverlay /><TerminalAudioControl /><button type="button" className={styles.exitExperience} onClick={() => { setPhase(explorationPhaseAfterExit(unlocked)); close(); scrollToSection('#top', true) }}>← Back to exploration</button></>}<Suspense fallback={<p role="status">Opening the archive…</p>}><StoryEngine key={storyRun} onBeginEnding={beginEnding} onRevoke={onRevoke} onComplete={() => {
    setUnlocked(true); setPhase('free'); close(); scrollToSection('#top', true)
  }} onRestart={restartExperience} /></Suspense></>
  if (phase === 'exploration' && telemetry.signalLost) return <><CRTOverlay /><DeathScreen onRecover={openMemorial} /></>
  if (phase === 'exploration' && telemetry.battery <= 6 && !promptSolved) return <><CRTOverlay /><TerminalAudioControl /><CommandPrompt prompt={prologuePrompt} onSuccess={() => { setPromptSolved(true); setFragmentFound(true) }} /><TelemetryHud battery={telemetry.battery} unlimited={false} weather={marsTelemetry.weather} delay={marsTelemetry.delay} /></>

  return (
    <>
      <CRTOverlay matrix={telemetry.override} />
      <TerminalAudioControl docked />
      <div className={`${styles.shell} ${phase !== 'exploration' || isSafeMode ? '' : telemetry.criticalPower ? styles.criticalPower : telemetry.lowPower ? styles.lowPower : ''}`}>
       <a className="skip-link" href="#explore">Skip to exploration</a>
       <div id="top" />
       <Header />
       {promptSolved && phase === 'exploration' && <aside className={styles.sharedRecord} role="status"><p>IGNITE accepted. The local archive is protected; the power reserve is still failing.</p></aside>}
       <Hero canReplay={unlocked || phase === 'pausedArchive'} recoveryPaused={phase === 'pausedArchive'} onReplay={phase === 'pausedArchive' ? openMemorial : replayStories} unlimited={freeExploration} onStart={() => pick(machines.find((m) => m.id === 'opportunity')!)} onWatch={() => navigateSection(explorationDestinations.map)} onFreeExplore={() => navigateSection(explorationDestinations.machines)} />
       {phase === 'pausedArchive' ? <aside className={styles.sharedRecord}><h2>Recovery paused.</h2><p>Your connection ended. Exploration uses the local archive; unlimited energy unlocks after the recovered stories. Your recovery progress is saved.</p><button type="button" onClick={openMemorial}>Resume saved archive →</button></aside> : !freeExploration ? <RecoveryObjective battery={telemetry.battery} found={fragmentFound} onRecover={() => setFragmentFound(true)} /> : <aside className={styles.sharedRecord}><p>∞ Unlimited energy unlocked. The connection ended; the knowledge remains.</p><button type="button" onClick={restartExperience}>Restart the experience</button></aside>}
       {suggestedId && <aside className={styles.sharedRecord}><p>You received a record of {findMachine(suggestedId)?.name}.</p><button type="button" onClick={() => { const mission = findMachine(suggestedId); setSuggestedId(null); if (mission) pick(mission) }}>Open shared record</button><button type="button" onClick={() => setSuggestedId(null)}>Dismiss</button></aside>}
       <Machines machines={machines} pioneer={pioneer} onPick={pick} openedIds={openedIds} />
       <main id="explore" tabIndex={-1} className={styles.band}>
       <div className={styles.main}>
        <div className={styles.intro}>
          <h2 className={styles.introTitle}>Every flag holds a story.</h2>
          <p className={styles.introText}>Choose a destination and a machine. Hear its story, then discover the NASA record behind it.</p>
        </div>
        <section className={styles.mapCol} aria-label="Interactive map">
          <WorldTabs value={body} onChange={changeWorld} />
          <div key={body} id="map-panel" role="tabpanel" aria-labelledby={`tab-${body}`} className={styles.mapPanel}>
            {body === 'deep-space' ? (
              <><DeepSpaceView machine={machines.find((m) => m.id === 'pioneer-10')!} state={pioneer}
                selected={selectedId === 'pioneer-10'} onSelect={() => selectId('pioneer-10')} />
                <SpaceDestinations machines={inWorld} selectedId={selectedId} onSelect={selectId} /></>
            ) : (
              <SurfaceMap body={body} machines={inWorld} selectedId={selectedId} onSelect={selectId} />
            )}
            <MachineList machines={inWorld} selectedId={selectedId} onSelect={selectId} />
          </div>
        </section>
        <div id="story" className={styles.storyCol}>
          {selected ? <Suspense fallback={<p className={styles.storyLoading} role="status">Opening the story…</p>}><StoryPanel world={body} machine={selected} mode={mode} onModeChange={setMode} onClose={close}
          nextMachine={machines[(machines.findIndex((m) => m.id === selectedId) + 1) % machines.length]} onNext={pick} /></Suspense> : <aside className={styles.storyEmpty}><h2>Choose a machine</h2><p>Meet the machine that stayed behind. Its photographs, mission records and discoveries are waiting here.</p></aside>}
        </div>
       </div>
       </main>
       <Footer />
      </div>
      <TelemetryHud battery={telemetry.battery} unlimited={freeExploration} paused={phase === 'pausedArchive'} weather={marsTelemetry.weather} delay={marsTelemetry.delay} />
    </>
  )
}
