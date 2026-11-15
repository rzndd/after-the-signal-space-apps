import test from 'node:test'
import assert from 'node:assert/strict'
import { PROLOGUE_DURATION_MS, PROLOGUE_TICK_MS, batteryAt } from '../src/lib/prologue.ts'
import { commandMatches, createMissionReport, persistEnding, readRevoked, clearEnding } from '../src/lib/ending.ts'
import { createJourneyReducer, initialJourney } from '../src/lib/journey.js'
import { fetchWithTimeout, fetchMarsWeather, fetchCommsDelay, parseMarsWeather, parseCommsDelay } from '../src/lib/nasaApi.ts'
import { MARS_WEATHER_FALLBACK, COMMS_DELAY_FALLBACK } from '../src/data/telemetryFallbacks.ts'
import { GET as delayRoute } from '../api/comms-delay.ts'
import { GET as weatherRoute } from '../api/mars-weather.ts'

test('the compulsory power reserve expires at fifteen seconds, independently of a command', () => {
  assert.equal(PROLOGUE_DURATION_MS, 15000)
  assert.equal(batteryAt(1000, 15999, PROLOGUE_TICK_MS), 1)
  assert.equal(batteryAt(1000, 16000, PROLOGUE_TICK_MS), 0)
})
test('prompt scenes block ordinary advance and accept only the complete expected command', () => {
  assert.equal(commandMatches(' ignite ', 'IGNITE'), true)
  assert.equal(commandMatches('IGNIT', 'IGNITE'), false)
  const chapters = [{ id: 'test', scenes: [{ type: 'prompt', expected: 'IGNITE' }, { type: 'narrative' }] }]
  const reduce = createJourneyReducer(chapters)
  const state = initialJourney(chapters)
  assert.equal(reduce(state, { type: 'advance' }).sceneIndex, 0)
  assert.equal(reduce(state, { type: 'command', value: 'wrong' }).sceneIndex, 0)
  assert.equal(reduce(state, { type: 'command', value: ' ignite ' }).sceneIndex, 1)
})
test('dead status survives a new read and remembered status does not revoke access', () => {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  const map = new Map()
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: k => map.get(k) ?? null, setItem: (k,v) => map.set(k,v), removeItem: k => map.delete(k) } })
  try {
    assert.equal(readRevoked(), false)
    assert.equal(persistEnding('dead'), true)
    assert.equal(readRevoked(), true)
    assert.equal(map.get('sol404_status'), 'dead')
    persistEnding('remembered')
    assert.equal(readRevoked(), false)
    clearEnding()
    assert.equal(map.size, 0)
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: () => { throw Error() }, setItem: () => { throw Error() } } })
    assert.equal(readRevoked(), false)
    assert.equal(persistEnding('dead'), false)
  } finally {
    if (previous) Object.defineProperty(globalThis, 'localStorage', previous)
    else delete globalThis.localStorage
  }
})
test('the shareable report keeps the ASCII frame aligned and identifies fictional recovery', () => {
  const report = createMissionReport(7, ['EAGLE', 'INGENUITY'], new Date('2026-11-15T18:00:00Z'))
  assert.ok(report.split('\n').slice(0,5).every(line => line.length === 30))
  assert.match(report, /Recovered records: 7/)
  assert.match(report, /2026-11-15 UTC/)
  assert.match(report, /Fictional recovery session/)
})
test('weather parsing accepts zero degrees and labels capture dates as archival', () => {
  const record = parseMarsWeather({ sol_keys: ['1','2'], 1: { AT: { av: -60 }, First_UTC: '2019-01-01T00:00:00Z' }, 2: { AT: { av: 0 }, First_UTC: '2019-01-02T00:00:00Z' } })
  assert.equal(record.temperatureC, 0)
  assert.equal(record.source, 'archive')
  assert.equal(record.asOf, '2019-01-02T00:00:00Z')
  for (const bad of [null, {}, { unavailable: true }, { sol_keys: ['1'], 1: { AT: { av: -999 }, First_UTC: 'invalid' } }]) assert.equal(parseMarsWeather(bad), null)
})
test('delay parsing rejects malformed values and preserves the one-way model epoch', () => {
  assert.equal(parseCommsDelay({ minutes: 8, asOf: '2026-Nov-15 00:00:00 TDB' }).source, 'model')
  for (const minutes of [0, -1, NaN, 999, '8']) assert.equal(parseCommsDelay({ minutes, asOf: '2026-Nov-15' }), null)
  assert.equal(parseCommsDelay({ minutes: 8 }), null)
})
test('optional NASA requests quietly use attributed references on HTTP, JSON and network failures', async () => {
  const original = globalThis.fetch
  try {
    for (const request of [
      async () => new Response('', { status: 503 }),
      async () => { throw Error('offline') },
      async () => Response.json({ unavailable: true }),
      async () => new Response('not json'),
    ]) {
      globalThis.fetch = request
      assert.deepEqual(await fetchMarsWeather(), MARS_WEATHER_FALLBACK)
      assert.deepEqual(await fetchCommsDelay(), COMMS_DELAY_FALLBACK)
    }
  } finally { globalThis.fetch = original }
})
test('the three-second deadline also bounds slow JSON decoding when fetch ignores abort', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] })
  const original = globalThis.fetch
  let signal
  globalThis.fetch = async (_url, options) => { signal = options.signal; return { ok: true, json: () => new Promise(() => {}) } }
  try {
    const pending = fetchWithTimeout('/test')
    const rejected = assert.rejects(pending, /timed out/)
    await Promise.resolve()
    t.mock.timers.tick(3000)
    await rejected
    assert.equal(signal.aborted, true)
  } finally { globalThis.fetch = original }
})
test('external cancellation aborts optional telemetry without waiting for the deadline', async () => {
  const original = globalThis.fetch
  globalThis.fetch = () => new Promise(() => {})
  try {
    const controller = new AbortController()
    const request = fetchWithTimeout('/test', 3000, controller.signal)
    const rejected = assert.rejects(request, /aborted/)
    controller.abort()
    await rejected
  } finally { globalThis.fetch = original }
})
test('the Mars delay route queries an Earth-centred model and converts seconds to minutes', async () => {
  const original = globalThis.fetch
  let requested
  globalThis.fetch = async url => { requested = new URL(url); return new Response('$$SOE\nA.D. 2026-Nov-15 00:00:00.0000 TDB\n LT=4.800000E+02\n$$EOE') }
  try {
    const response = await delayRoute()
    const data = await response.json()
    assert.equal(data.minutes, 8)
    assert.equal(requested.searchParams.get('CENTER'), "'500@399'")
    assert.equal(requested.searchParams.get('COMMAND'), "'499'")
    assert.match(data.asOf, /TDB$/)
  } finally { globalThis.fetch = original }
})
test('optional proxy failures are explicit unavailable responses, not invented measurements', async () => {
  const original = globalThis.fetch
  globalThis.fetch = async () => { throw Error('upstream offline') }
  try {
    for (const route of [delayRoute, weatherRoute]) {
      const result = await route()
      assert.equal(result.status, 200)
      assert.deepEqual(await result.json(), { unavailable: true })
    }
  } finally { globalThis.fetch = original }
})

