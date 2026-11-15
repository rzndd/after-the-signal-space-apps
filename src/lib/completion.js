import { timeline } from '../data/timeline.js'
const KEY = 'sol404-completion-v1'
export const REQUIRED_CHAPTERS = timeline.map(chapter => chapter.id)
export function validCompletion(record) {
  return Boolean(record?.version === 1 && Array.isArray(record.chapters) && REQUIRED_CHAPTERS.every((id) => record.chapters.includes(id)))
}
export function readCompletion() {
  try { return validCompletion(JSON.parse(localStorage.getItem(KEY))) } catch { return false }
}
export function saveCompletion(state) {
  if (state.stage !== 'epilogue' || !REQUIRED_CHAPTERS.every((id) => state.answers[id] === true)) return false
  try { localStorage.setItem(KEY, JSON.stringify({ version: 1, chapters: REQUIRED_CHAPTERS })) } catch { /* The current session can still unlock. */ }
  return true
}
export function clearCompletion() { try { localStorage.removeItem(KEY) } catch { /* Optional storage. */ } }
