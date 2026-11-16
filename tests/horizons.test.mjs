import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildHorizonsUrl, parseHorizonsVectors, AU_KM } from '../shared/horizons.ts'
import { GET } from '../api/horizons.ts'

const fixture = `header
$$SOE
2461358.5 = A.D. 2026-Nov-14 00:00:00.0000 TDB
 VX= 3.0E+00 VY= 4.0E+00 VZ= 0.0E+00
 LT= 3.600000E+03 RG= 1.495978707E+08 RR= 2.0E+00
$$EOE`

test('explicit units and heliocentric reference are preserved across date rollover', () => {
  const url = new URL(buildHorizonsUrl('https://example.com/horizons', new Date('2026-12-31T23:59:00Z')))
  assert.equal(url.searchParams.get('OUT_UNITS'), "'KM-S'")
  assert.equal(url.searchParams.get('CENTER'), "'500@10'")
  assert.equal(url.searchParams.get('TIME_TYPE'), "'TDB'")
  assert.equal(url.searchParams.get('STOP_TIME'), "'2027-01-01'")
})

test('range rate is distinct from total speed; light time is converted to hours', () => {
  const state = parseHorizonsVectors(fixture)
  assert.ok(state)
  assert.equal(state.rangeKm, AU_KM)
  assert.equal(state.au, 1)
  assert.equal(state.lightHours, 1)
  assert.equal(state.speedKmS, 5)
  assert.equal(state.rangeRateKmS, 2)
  assert.equal(state.asOf, '2026-Nov-14')
  assert.equal(state.asOfTime, '00:00:00 TDB')
})

test('malformed and incomplete ephemerides are rejected', () => {
  for (const text of ['', 'upstream error', fixture.replace('RR= 2.0E+00', ''), fixture.replace('RG= 1.495978707E+08', 'RG= NaN')]) {
    assert.equal(parseHorizonsVectors(text), null)
  }
})

test('self-contained Vercel route agrees with shared parser and handles upstream failures', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response(fixture))
  const response = await GET()
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), parseHorizonsVectors(fixture))
  assert.match(response.headers.get('Cache-Control'), /s-maxage=3600/)
  globalThis.fetch = async () => new Response('unavailable', { status: 503 })
  assert.equal((await GET()).status, 502)
  globalThis.fetch = async () => { throw new Error('offline') }
  assert.equal((await GET()).status, 502)
})

test('an older record without an epoch time never invents a clock time', () => {
  const state = parseHorizonsVectors(fixture.replace(' 00:00:00.0000 TDB', ''))
  assert.ok(state)
  assert.equal(state.asOfTime, undefined)
})
