import { useCallback, useEffect, useState } from 'react'
import { batteryAt, PROLOGUE_KEY, PROLOGUE_TICK_MS, readPrologueStart } from '../lib/prologue'

const STARTING_BATTERY = 17
// The prologue lasts fifteen seconds, including the final emergency command.
// Only the isolated development QA server can accelerate this clock further.
const TICK_MS = import.meta.env.DEV && import.meta.env.VITE_QA_FAST_PROLOGUE === 'true' ? 150 : PROLOGUE_TICK_MS

/** The prologue always runs out of energy, including during reading and background time. */
export function useTelemetryState(active: boolean) {
  const [battery, setBattery] = useState(() => {
    const started = readPrologueStart()
    return started === null ? STARTING_BATTERY : batteryAt(started, Date.now(), TICK_MS)
  })
  const [session, setSession] = useState(0)
  useEffect(() => {
    if (!active) return
    const started = readPrologueStart() ?? Date.now()
    try { sessionStorage.setItem(PROLOGUE_KEY, String(started)) } catch { /* Optional. */ }
    const update = () => setBattery(batteryAt(started, Date.now(), TICK_MS))
    const timer = window.setInterval(update, 250)
    document.addEventListener('visibilitychange', update)
    return () => { window.clearInterval(timer); document.removeEventListener('visibilitychange', update) }
  }, [active, session])
  const reset = useCallback(() => {
    try { sessionStorage.removeItem(PROLOGUE_KEY) } catch { /* Optional. */ }
    setBattery(STARTING_BATTERY); setSession((value) => value + 1)
  }, [])
  return { battery, reset, override: false, lowPower: battery < 10, criticalPower: battery < 5, signalLost: battery === 0 }
}
