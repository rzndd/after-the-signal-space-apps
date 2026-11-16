export const JOURNEY_KEY = 'sol404-journey-v1'
import { commandMatches } from './ending.ts'
export function initialJourney(chapters) {
  return { version: 1, chapterId: chapters[0].id, sceneIndex: 0, stage: 'narrative', answers: {}, awaitingResume: false }
}
export function validateJourney(value, chapters) {
  if (!value || value.version !== 1) return null
  const chapter = chapters.find((item) => item.id === value.chapterId)
  if (!chapter || !Number.isInteger(value.sceneIndex) || value.sceneIndex < 0 || value.sceneIndex >= chapter.scenes.length || !['narrative', 'death', 'memorial', 'epilogue'].includes(value.stage)) return null
  const answers = Object.fromEntries(chapters.filter((item) => value.answers?.[item.id] === true).map((item) => [item.id, true]))
  const index = chapters.findIndex((item) => item.id === chapter.id)
  if (chapters.slice(0, index).some((item) => !answers[item.id])) return null
  if (value.stage === 'epilogue' && chapters.some((item) => !answers[item.id])) return null
  return { version: 1, chapterId: chapter.id, sceneIndex: value.sceneIndex, stage: value.stage, answers, awaitingResume: true }
}
export function loadJourney(chapters) {
  try { return validateJourney(JSON.parse(localStorage.getItem(JOURNEY_KEY)), chapters) ?? initialJourney(chapters) } catch { return initialJourney(chapters) }
}
export function createJourneyReducer(chapters) {
  return (state, action) => {
    const index = chapters.findIndex((item) => item.id === state.chapterId)
    const chapter = chapters[index]
    if (action.type === 'restart') return initialJourney(chapters)
    if (action.type === 'resume') return { ...state, awaitingResume: false }
    if (state.awaitingResume) return state
    const scene = chapter.scenes[state.sceneIndex]
    const canAdvance = action.type === 'advance' && scene.type !== 'prompt' ||
      action.type === 'command' && scene.type === 'prompt' && typeof action.value === 'string' && commandMatches(action.value, scene.expected)
    if (canAdvance && state.stage === 'narrative') return state.sceneIndex + 1 < chapter.scenes.length ? { ...state, sceneIndex: state.sceneIndex + 1 } : { ...state, stage: 'memorial' }
    if (action.type === 'back' && state.stage === 'narrative') return { ...state, sceneIndex: Math.max(0, state.sceneIndex - 1) }
    if (action.type === 'archive' && state.stage === 'death') return { ...state, stage: 'memorial' }
    // Keep the persisted "answers" field for existing saves. It now records
    // leaving a recovered document, without a quiz or evidence-collection gate.
    if (action.type === 'next' && state.stage === 'memorial') {
      const recovered = { ...state, answers: { ...state.answers, [chapter.id]: true } }
      return index + 1 < chapters.length
        ? { ...recovered, chapterId: chapters[index + 1].id, sceneIndex: 0, stage: 'narrative' }
        : { ...recovered, stage: 'epilogue' }
    }
    return state
  }
}
