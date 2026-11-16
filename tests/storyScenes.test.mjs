import test from 'node:test'
import assert from 'node:assert/strict'
import { timeline } from '../src/data/timeline.js'
import { buildStoryScenes } from '../src/lib/storyScenes.js'

test('scene composition preserves every narrative and scientific statement', () => {
  for (const chapter of timeline) {
    const scenes = buildStoryScenes(chapter.lines)
    assert.ok(scenes.length < chapter.lines.length)
    for (const line of chapter.lines.filter((line) => line.type !== 'sys')) {
      assert.equal(scenes.filter((scene) => scene.text.includes(line.text)).length, 1)
    }
    assert.ok(scenes.every((scene) => scene.context && scene.parts <= 2))
  }
})
