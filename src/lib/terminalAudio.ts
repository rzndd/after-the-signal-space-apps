/** AI-assisted Web Audio sound synthesis; fictional terminal audio, not spacecraft recordings. See public/ai-disclosure.json. Created only after a user gesture. */
let context: AudioContext | null = null
let master: GainNode | null = null
let drone: OscillatorNode | null = null
let muted = false
try { muted = localStorage.getItem('sol404-muted') === 'true' } catch { /* Storage is optional. */ }
const listeners = new Set<() => void>()
export const subscribeAudio = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener) } }
export const getAudioMuted = () => muted
let silent = false

function updateVolume() {
  if (!context || !master) return
  master.gain.setTargetAtTime(muted || silent || document.hidden ? 0 : .1, context.currentTime, .03)
}

export function startTerminalAudio() {
  try {
    if (!context) {
      context = new AudioContext()
      master = context.createGain()
      master.gain.value = 0
      master.connect(context.destination)
      const droneGain = context.createGain()
      droneGain.gain.value = .18
      droneGain.connect(master)
      drone = context.createOscillator()
      drone.type = 'sine'
      drone.frequency.value = 55
      drone.connect(droneGain)
      drone.start()
      document.addEventListener('visibilitychange', updateVolume)
    }
    void context.resume().catch(() => {})
    updateVolume()
  } catch { /* The narrative remains usable without audio support. */ }
}

export function terminalClick() {
  if (!context || !master || muted || silent || document.hidden) return
  const oscillator = context.createOscillator()
  const gain = context.createGain()
  oscillator.type = 'triangle'
  oscillator.frequency.setValueAtTime(740, context.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(280, context.currentTime + .035)
  gain.gain.setValueAtTime(.35, context.currentTime)
  gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + .045)
  oscillator.connect(gain).connect(master)
  oscillator.onended = () => { oscillator.disconnect(); gain.disconnect() }
  oscillator.start()
  oscillator.stop(context.currentTime + .05)
}

export function setTerminalMuted(value: boolean) {
  muted = value
  try { localStorage.setItem('sol404-muted', String(value)) } catch { /* Optional. */ }
  updateVolume()
  listeners.forEach((listener) => listener())
}
/** Silence synthesized terminal audio during signal loss. No speech synthesis is used. */
export function setTerminalSilent(value: boolean) { silent = value; updateVolume() }
export function stopTerminalAudio() {
  document.removeEventListener('visibilitychange', updateVolume)
  drone?.stop()
  drone?.disconnect()
  if (context) void context.close().catch(() => {})
  context = null
  master = null
  drone = null
  silent = false
}
