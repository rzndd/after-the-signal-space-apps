import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { REQUIRED_CHAPTERS, validCompletion, saveCompletion, readCompletion, clearCompletion } from '../src/lib/completion.js'
import { timeline } from '../src/data/timeline.js'
import { sceneDuration } from '../src/lib/sceneTiming.js'
import { sceneMedia } from '../src/data/sceneMedia.js'

test('permanent unlock requires every chapter and the epilogue; restart clears it', () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  const memory = new Map()
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: (key) => memory.get(key) ?? null, setItem: (key, value) => memory.set(key, value), removeItem: (key) => memory.delete(key) } })
  try {
    assert.deepEqual([...REQUIRED_CHAPTERS].sort(), timeline.map((chapter) => chapter.id).sort())
    assert.equal(readCompletion(), false)
    assert.equal(validCompletion({ version: 1, chapters: REQUIRED_CHAPTERS.slice(0, -1) }), false)
    assert.equal(saveCompletion({ stage: 'narrative', answers: Object.fromEntries(REQUIRED_CHAPTERS.map((id) => [id, true])) }), false)
    assert.equal(saveCompletion({ stage: 'epilogue', answers: {} }), false)
    assert.equal(saveCompletion({ stage: 'epilogue', answers: Object.fromEntries(REQUIRED_CHAPTERS.map((id) => [id, true])) }), true)
    assert.equal(readCompletion(), true)
    clearCompletion()
    assert.equal(readCompletion(), false)
  } finally {
    if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor)
    else delete globalThis.localStorage
  }
})
test('the educational scenes get a longer reading window and calm mode remains available', () => {
  const text = 'A mesma observação pode admitir mais de uma interpretação científica.'
  const voice = { type: 'narrative', text }
  const evidence = { type: 'tech', text }
  assert.ok(sceneDuration(evidence) > sceneDuration(voice))
  assert.ok(sceneDuration(evidence, true) > sceneDuration(evidence))
  assert.ok(sceneDuration({ type: 'narrative', text: Array(150).fill('palavra').join(' ') }) > 60000)
})
test('each core equipment has a second local documentary image with classification and source', () => {
  for (const chapter of timeline.filter((chapter) => !chapter.optional)) {
    const media = sceneMedia[chapter.machineId]
    assert.ok(media && media.caption && media.kind && media.source.startsWith('https://images.nasa.gov/'))
    assert.notEqual(media.src, chapter.bgImage)
    assert.ok(existsSync(new URL('../public' + media.src, import.meta.url)))
  }
})
