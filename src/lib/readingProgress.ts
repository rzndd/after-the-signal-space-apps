const KEY = 'after-signal-reading-v1'
interface Reading { step: number; completed: boolean }
export function readNarrativeProgress(id: string, mode: string, length: number): Reading {
  try {
    const entry = JSON.parse(localStorage.getItem(KEY) ?? '{}')[id + ':' + mode]
    if (entry && Number.isInteger(entry.step) && entry.step >= 0 && entry.step < length && typeof entry.completed === 'boolean') return entry
  } catch { /* Optional storage. */ }
  return { step: 0, completed: false }
}
export function saveNarrativeProgress(id: string, mode: string, step: number, completed = false) {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? '{}')
    const records = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
    localStorage.setItem(KEY, JSON.stringify({ ...records, [id + ':' + mode]: { step, completed } }))
  } catch { /* Reading remains available when storage is denied. */ }
}

