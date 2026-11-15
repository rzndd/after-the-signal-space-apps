import { PROLOGUE_KEY } from './prologue.ts'
export const ENDING_KEY = 'sol404_status'
export function readRevoked() {
  try { return localStorage.getItem(ENDING_KEY) === 'dead' } catch { return false }
}
export function persistEnding(value: 'dead' | 'remembered') {
  try { localStorage.setItem(ENDING_KEY, value); return true } catch { return false }
}
export function clearEnding() {
  try { localStorage.removeItem(ENDING_KEY) } catch { /* Optional storage. */ }
}
/** A fictional ending must never turn into a permanent access restriction. */
export function restoreTerminalAccess() {
  clearEnding()
  try { sessionStorage.removeItem(PROLOGUE_KEY) } catch { /* Optional storage. */ }
}
/** Migrate visitors trapped by older releases; preserve their recovered records. */
export function restoreAccessOnEntry() {
  if (readRevoked()) restoreTerminalAccess()
}
export function commandMatches(value: string, expected: string) { return value.trim().toUpperCase() === expected.trim().toUpperCase() }
export function createMissionReport(recovered: number, names: string[], date = new Date()) {
  const frame = (text: string) => '| ' + text.padEnd(26, ' ') + ' |'
  return [
    '+----------------------------+',
    frame('AFTER THE SIGNAL / REPORT'),
    frame('STATUS: ARCHIVES PRESERVED'),
    frame('RESERVE: INFINITE'),
    '+----------------------------+',
    'Recovered records: ' + recovered,
    'Recovered on: ' + date.toISOString().slice(0,10) + ' UTC',
    '',
    ...names.map((name, index) => (index + 1) + '. ' + name),
    '',
    'Fictional recovery session; real NASA mission records.',
    'Voices and terminal events are imagined, not spacecraft transcripts.',
    'NASA sources are linked in every recovered record.',
    'https://sol404.vercel.app/',
  ].join('\n')
}

