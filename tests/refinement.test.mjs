import test from 'node:test'
import assert from 'node:assert/strict'
import { layoutMarkers } from '../src/lib/markerLayout.ts'
import { surfacePosition } from '../src/lib/surfaceMaps.ts'
import { machines } from '../src/data/machines.ts'
import { batteryAt } from '../src/lib/prologue.ts'
import { readNarrativeProgress, saveNarrativeProgress } from '../src/lib/readingProgress.ts'

test('surface marker touch targets stay separate and within mobile and desktop maps', () => {
  for (const body of ['moon', 'mars']) {
    const points = machines.filter(m => m.body === body).flatMap(m => m.points.map(p => surfacePosition(body, p)))
    for (const width of [280, 335, 600, 960]) {
      const height = width * .75
      const placed = layoutMarkers(points, width, height).map(p => ({ left: p.x * width - 44 * .32, top: p.y * height - 44 * .88 }))
      for (const [i, a] of placed.entries()) {
        assert.ok(a.left >= -0.001 && a.top >= -0.001 && a.left + 44 <= width + .001 && a.top + 44 <= height + .001)
        for (const b of placed.slice(i+1)) assert.ok(a.left + 44 <= b.left || b.left + 44 <= a.left || a.top + 44 <= b.top || b.top + 44 <= a.top, body + ' ' + width)
      }
    }
  }
})

test('sufficiently separated map locations do not move', () => {
  const points = [{ x: .2, y: .4 }, { x: .7, y: .7 }]
  const placed = layoutMarkers(points, 960, 720)
  points.forEach((p, i) => {
    assert.ok(Math.abs(p.x - placed[i].x) < .00001)
    assert.ok(Math.abs(p.y - placed[i].y) < .00001)
  })
})

test('the prologue drains in one minute and cannot gain power from a clock change', () => {
  assert.equal(batteryAt(1000, 1000, 3500), 17)
  assert.equal(batteryAt(1000, 36000, 3500), 7)
  assert.equal(batteryAt(1000, 61000, 3500), 0)
  assert.equal(batteryAt(1000, 0, 3500), 17)
})

test('reading restores the exact line, isolates reading levels, and can be replayed', () => {
  const old = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  const store = new Map()
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: key => store.get(key) ?? null, setItem: (key, value) => store.set(key, value) } })
  try {
    saveNarrativeProgress('opportunity', 'kids', 3)
    assert.deepEqual(readNarrativeProgress('opportunity', 'kids', 6), { step: 3, completed: false })
    assert.equal(readNarrativeProgress('opportunity', 'deep', 6).step, 0)
    saveNarrativeProgress('opportunity', 'kids', 5, true)
    assert.equal(readNarrativeProgress('opportunity', 'kids', 6).completed, true)
    saveNarrativeProgress('opportunity', 'kids', 0)
    assert.deepEqual(readNarrativeProgress('opportunity', 'kids', 6), { step: 0, completed: false })
    saveNarrativeProgress('opportunity', 'kids', 999, true)
    assert.equal(readNarrativeProgress('opportunity', 'kids', 6).completed, false)
  } finally {
    if (old) Object.defineProperty(globalThis, 'localStorage', old)
    else delete globalThis.localStorage
  }
})
