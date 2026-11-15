import assert from 'node:assert/strict'
import { test } from 'node:test'
import { GET } from '../api/nasa-images.ts'

test('NASA image proxy rejects a missing query without contacting NASA', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => { throw new Error('must not fetch') })
  const response = await GET(new Request('https://example.com/api/nasa-images'))
  assert.equal(response.status, 400)
  assert.equal(globalThis.fetch.mock.callCount(), 0)
})

test('NASA image proxy limits inputs and preserves the JSON and cache headers', async (t) => {
  let requested
  t.mock.method(globalThis, 'fetch', async (url) => {
    requested = new URL(url)
    return Response.json({ collection: { items: [] } })
  })
  const response = await GET(new Request(`https://example.com/api/nasa-images?q=${'a'.repeat(200)}&nasa_id=${'b'.repeat(90)}`))
  assert.equal(response.status, 200)
  assert.equal(requested.hostname, 'images-api.nasa.gov')
  assert.equal(requested.searchParams.get('q').length, 120)
  assert.equal(requested.searchParams.get('nasa_id').length, 60)
  assert.equal(requested.searchParams.get('media_type'), 'image')
  assert.match(response.headers.get('content-type'), /application\/json/)
  assert.match(response.headers.get('cache-control'), /s-maxage=86400/)
  assert.deepEqual(await response.json(), { collection: { items: [] } })
})

test('NASA image proxy returns controlled failures for upstream HTTP and network errors', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response('unavailable', { status: 503 }))
  assert.equal((await GET(new Request('https://example.com/api/nasa-images?nasa_id=PIA00381'))).status, 502)
  globalThis.fetch = async () => { throw new Error('offline') }
  const response = await GET(new Request('https://example.com/api/nasa-images?nasa_id=PIA00381'))
  assert.equal(response.status, 502)
  assert.deepEqual(await response.json(), { error: 'network' })
})
