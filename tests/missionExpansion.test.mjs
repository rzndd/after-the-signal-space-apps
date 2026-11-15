import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { machines } from '../src/data/machines.ts'
import { expandedEntries } from '../src/data/expandedMissions.ts'
import { timeline } from '../src/data/timeline.js'
import { validCompletion } from '../src/lib/completion.js'
import { learning } from '../src/data/learning.ts'
import { missionStates } from '../src/data/storyGuide.ts'

test('every requested addition is connected to a card, two reading levels and the compulsory archive', () => {
  const ids = ['alsep','surveyor-3','sojourner','spirit','viking-2','phoenix','insight','dawn','near-shoemaker','pioneer-11','kepler']
  assert.equal(machines.length,17)
  assert.equal(new Set(machines.map(m=>m.id)).size,17)
  for (const id of ids) {
    const machine=machines.find(m=>m.id===id)
    assert.ok(machine?.kids.length===5 && machine?.deep.length===5,id)
    assert.equal(timeline.filter(c=>c.machineId===id).length,1)
    assert.ok(learning[id].answer && missionStates[id].hardware)
  }
})
test('the new images are local documentary assets, with valid image bytes and individual NASA records', () => {
  for (const entry of expandedEntries) {
    assert.match(new URL(entry.source).hostname, /(^|\.)nasa\.gov$/)
    for (const id of entry.photos) {
      const bytes=readFileSync(new URL('../public/media/machines/nasa-'+id+'.jpg',import.meta.url))
      assert.ok(bytes.length>1000,id)
      assert.ok(bytes[0]===0xff && bytes[1]===0xd8 || bytes[0]===0x89 && bytes[1]===0x50,id)
    }
  }
})
test('chronology includes exact event ordering and requires the expanded archive for unlimited energy', () => {
  assert.equal(timeline[0].machineId,'surveyor-3')
  assert.equal(timeline.at(-1).machineId,'ingenuity')
  for (let i=1;i<timeline.length;i++) assert.ok(timeline[i].eventDate>=timeline[i-1].eventDate)
  assert.equal(validCompletion({version:1,chapters:['apollo11_descent','lrv_parked','viking_last_contact','pioneer_last_signal','spirit_last_contact','opportunity_last_contact','ingenuity_grounded']}),false)
})
test('small-body and heliocentric missions do not acquire fabricated Mars locations or Pioneer 10 telemetry', () => {
  for (const id of ['dawn','near-shoemaker','kepler','pioneer-11']) {
    const machine=machines.find(m=>m.id===id)
    assert.equal(machine.body,'deep-space')
    assert.equal(machine.points.length,0)
    assert.ok(machine.destination)
  }
  assert.equal(machines.find(m=>m.id==='alsep').points.length,5)
})
