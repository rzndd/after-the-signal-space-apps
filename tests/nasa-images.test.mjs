import assert from 'node:assert/strict'
import { test } from 'node:test'
import { fetchNasaImage } from '../src/lib/nasa.ts'

function setup(t, cached) {
  const store = new Map(cached ? [[`nasa-image:${cached.nasaId}`, JSON.stringify(cached)]] : [])
  const original = Object.getOwnPropertyDescriptor(globalThis, 'sessionStorage')
  Object.defineProperty(globalThis, 'sessionStorage', { configurable: true, value: {
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => store.set(key, value),
  } })
  t.after(() => { if (original) Object.defineProperty(globalThis, 'sessionStorage', original); else delete globalThis.sessionStorage })
  t.mock.method(globalThis, 'fetch', async () => Response.json({ collection: { items: [{
    data: [{ nasa_id: 'PIA00381', title: 'First Photograph Taken On Mars Surface', date_created: '1996-12-12T03:03:02Z', secondary_creator: 'NASA/JPL' }],
    links: [{ render: 'image', href: 'https://example.com/viking.jpg' }],
  }] } }))
}

test('catalog ingestion year is never shown as a capture date', async (t) => {
  setup(t)
  const photo = await fetchNasaImage({ nasaId: 'PIA00381', label: 'Viking first image' })
  assert.ok(photo)
  assert.equal(photo.date, '')
})

test('verified capture date overrides conflicting catalog metadata', async (t) => {
  setup(t)
  const photo = await fetchNasaImage({ nasaId: 'PIA00381', label: 'Viking first image', date: 'July 20, 1976' })
  assert.equal(photo.date, 'July 20, 1976')
})

test('existing cached images receive current classification, caption and verified date', async (t) => {
  setup(t, { nasaId: 'PIA24127', url: 'https://example.com/ingenuity.jpg', date: '2020', kind: 'photograph', label: 'Old photograph label' })
  const photo = await fetchNasaImage({ nasaId: 'PIA24127', label: 'Artist’s illustration of Ingenuity', kind: 'illustration' })
  assert.equal(photo.kind, 'illustration')
  assert.equal(photo.date, '')
  assert.equal(photo.label, 'Artist’s illustration of Ingenuity')
  assert.equal(globalThis.fetch.mock.callCount(), 0)
})
