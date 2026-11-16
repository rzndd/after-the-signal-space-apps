import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { timeline } from '../src/data/timeline.js'
import { buildStoryScenes } from '../src/lib/storyScenes.js'
import { explorationDestinations, explorationPhaseAfterExit } from '../src/lib/explorationFlow.ts'

test('each recovered mission is condensed to three short English scenes', () => {
  for (const chapter of timeline) {
    assert.equal(buildStoryScenes(chapter.lines).length, 3)
    assert.ok(chapter.lines.filter((line) => line.type === 'narrative').every((line) => line.text.split(/\s+/).length <= 45))
    assert.ok(!/[ãõáéíóúç]/i.test(chapter.lines.map((line) => line.text).join(' ')))
  }
})
test('map and machine calls to action differ; leaving a story never grants unlimited energy early', () => {
  assert.notEqual(explorationDestinations.map, explorationDestinations.machines)
  assert.equal(explorationPhaseAfterExit(false), 'pausedArchive')
  assert.equal(explorationPhaseAfterExit(true), 'free')
})
test('colour treatment belongs only to recovered story scenes', () => {
  const cover = readFileSync(new URL('../src/components/ui/CorruptedImage.module.css', import.meta.url), 'utf8')
  const story = readFileSync(new URL('../src/components/story/StoryScene.module.css', import.meta.url), 'utf8')
  const shell = readFileSync(new URL('../src/App.module.css', import.meta.url), 'utf8')
  assert.ok(!cover.includes('grayscale('))
  assert.ok(story.includes('grayscale(1)'))
  assert.ok(!/\.(?:lowPower|criticalPower)\s*\{[^}]*saturate/.test(shell))
})
