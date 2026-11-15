import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { surfaceMaps, surfacePosition } from '../src/lib/surfaceMaps.ts'
import { machines } from '../src/data/machines.ts'

test('official surface maps are local and all markers fit the documented crop', () => {
  for (const body of ['moon', 'mars']) {
    assert.ok(existsSync(new URL('../public' + surfaceMaps[body].src, import.meta.url)))
    for (const machine of machines.filter((item) => item.body === body)) for (const point of machine.points) {
      const mapped = surfacePosition(body, point)
      assert.ok(mapped.x >= 0 && mapped.x <= 1 && mapped.y >= 0 && mapped.y <= 1)
    }
  }
})
test('Mars zero meridian stays centred and the complete globe includes far-eastern landers', () => {
  assert.equal(surfacePosition('mars', { x: .5, y: .5 }).x, .5)
  assert.equal(surfacePosition('mars', { x: 0, y: .5 }).x, 0)
  assert.equal(surfacePosition('mars', { x: 1, y: .5 }).x, 1)
  assert.deepEqual(surfacePosition('moon', { x: .6956, y: .4926 }), { x: .6956, y: .4926 })
})
