import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { timeline } from '../src/data/timeline.js'
import { buildStoryScenes } from '../src/lib/storyScenes.js'
import { initialJourney, validateJourney, createJourneyReducer } from '../src/lib/journey.js'
import { lastRecords } from '../src/data/lastRecords.ts'
import { imageCatalog } from '../src/data/imageCatalog.ts'

const chapters = timeline.map((chapter) => ({ ...chapter, scenes: buildStoryScenes(chapter.lines) }))
const reduce = createJourneyReducer(chapters)
test('all seventeen mission chapters have local images and documentary reveals', () => {
  assert.equal(chapters.filter((chapter) => !chapter.optional).length, 17)
  for (const [index, chapter] of chapters.entries()) {
    if (index) assert.ok(chapter.year >= chapters[index - 1].year)
    assert.ok(existsSync(new URL('../public' + chapter.bgImage, import.meta.url)))
    assert.ok(chapter.sources.every((source) => source.url.startsWith('https://')))
    const record = lastRecords[chapter.machineId ?? chapter.id]
    assert.ok(record.image && record.explanation && record.limit)
  }
  assert.equal(Object.keys(imageCatalog).length, 17)
})
test('each documentary reveal continues without a quiz and the final record unlocks the epilogue', () => {
  let state = initialJourney(chapters)
  for (const chapter of chapters) {
    assert.equal(state.chapterId, chapter.id)
    for (const scene of chapter.scenes) { assert.ok(scene.text); state = reduce(state, { type: 'advance' }) }
    assert.equal(state.stage, 'memorial')
    state = reduce(state, { type: 'next' })
    assert.equal(state.answers[chapter.id], true)
  }
  assert.equal(state.stage, 'epilogue')
  assert.equal(Object.keys(state.answers).length, chapters.length)
  assert.deepEqual(reduce(state, { type: 'restart' }), initialJourney(chapters))
})

test('next cannot skip narrative scenes and legacy memorial saves no longer need an answer', () => {
  const initial = initialJourney(chapters)
  assert.deepEqual(reduce(initial, { type: 'next' }), initial)
  const legacy = validateJourney({ ...initial, stage: 'memorial' }, chapters)
  const resumed = reduce(legacy, { type: 'resume' })
  const next = reduce(resumed, { type: 'next' })
  assert.equal(next.chapterId, chapters[1].id)
  assert.equal(next.answers[initial.chapterId], true)
  assert.ok(validateJourney(next, chapters))
})
test('resume validates chapter, scene, version and evidence without auto-opening the story', () => {
  const initial = initialJourney(chapters)
  for (const invalid of [null, {}, { ...initial, version: 99 }, { ...initial, sceneIndex: -1 }, { ...initial, sceneIndex: 999 }, { ...initial, chapterId: 'unknown' }, { ...initial, stage: 'invalid' }]) assert.equal(validateJourney(invalid, chapters), null)
  const saved = validateJourney({ ...initial, answers: { fake: true, [initial.chapterId]: true } }, chapters)
  assert.equal(saved.awaitingResume, true)
  assert.deepEqual(Object.keys(saved.answers), [initial.chapterId])
  assert.deepEqual(reduce(saved, { type: 'advance' }), saved)
  assert.equal(reduce(saved, { type: 'resume' }).awaitingResume, false)
  assert.equal(validateJourney({ ...initial, stage: 'epilogue' }, chapters), null)
  assert.equal(validateJourney({ ...initial, chapterId: chapters[2].id }, chapters), null)
})
