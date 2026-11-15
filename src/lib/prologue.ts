export const PROLOGUE_KEY = 'after-signal-prologue-start'
export const PROLOGUE_DURATION_MS = 15_000
export const PROLOGUE_TICK_MS = PROLOGUE_DURATION_MS / 17
export function batteryAt(started: number, now: number, tick: number) {
  return Math.max(0, Math.min(17, 17 - Math.floor((now - started) / tick)))
}
export function readPrologueStart(now = Date.now()) {
  try {
    const raw = sessionStorage.getItem(PROLOGUE_KEY)
    const value = Number(raw)
    return raw && Number.isFinite(value) && value > 0 && value <= now ? value : null
  } catch { return null }
}

