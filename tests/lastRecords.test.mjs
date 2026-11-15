import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, statSync } from 'node:fs'
import { lastRecords } from '../src/data/lastRecords.ts'
import { timeline } from '../src/data/timeline.js'

test('every chapter has one local, attributed NASA record with an explanation and explicit limits', () => {
  assert.deepEqual(Object.keys(lastRecords).sort(), timeline.map(c => c.machineId ?? c.id).sort())
  for (const record of Object.values(lastRecords)) {
    assert.ok(record.title && record.explanation && record.detail && record.limit)
    assert.ok(record.image.alt && record.image.caption && record.image.credit && record.image.kind)
    const local = new URL('../public' + record.image.src, import.meta.url)
    assert.ok(existsSync(local))
    assert.ok(statSync(local).size < 400_000, record.image.src)
    for (const url of [record.image.source, record.source.url]) {
      const parsed = new URL(url)
      assert.equal(parsed.protocol, 'https:')
      assert.ok(parsed.hostname.endsWith('.nasa.gov'))
    }
    assert.equal('options' in record, false)
    assert.equal('correct' in record, false)
  }
})

test('the final transmission and rotor shadow are identified without confusing capture and catalogue dates', () => {
  assert.ok(lastRecords.opportunity.image.src.endsWith('PIA22929.jpg'))
  assert.match(lastRecords.opportunity.image.caption, /June 10, 2018/)
  assert.match(lastRecords.opportunity.detail, /not the last image taken/)
  assert.match(lastRecords.opportunity.explanation, /camera noise/)
  assert.ok(lastRecords.ingenuity.image.src.endsWith('PIA26243.jpg'))
  assert.match(lastRecords.ingenuity.image.caption, /January 18, 2024/)
  assert.match(lastRecords.ingenuity.limit, /does not reconstruct/)
})

test('context records do not pretend to be last-signal images or direct detections', () => {
  assert.match(lastRecords['lunar-roving-vehicle'].limit, /planned route/i)
  assert.match(lastRecords['viking-1'].limit, /cannot tell us whether organisms/)
  assert.match(lastRecords['pioneer-10'].explanation, /not a new message/)
  assert.match(lastRecords.spirit.limit, /predates/)
})
