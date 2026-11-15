import assert from 'node:assert/strict'
import { test } from 'node:test'
import { storyIdFromUrl, storyUrl, sectionUrl } from '../src/lib/navigation.ts'

const ids = ['viking-1', 'opportunity']
test('explicit destinations override story queries, but story and exploration links open the story', () => {
  for (const hash of ['top', 'machines', 'about']) assert.equal(storyIdFromUrl(new URL(`https://example.com/?m=viking-1#${hash}`), ids), null)
  for (const hash of ['', '#explore', '#story']) assert.equal(storyIdFromUrl(new URL(`https://example.com/?m=viking-1${hash}`), ids), 'viking-1')
  assert.equal(storyIdFromUrl(new URL('https://example.com/?m=unknown'), ids), null)
})
test('opening a story replaces conflicting fragments and preserves other query parameters', () => {
  const url = storyUrl('https://example.com/?lang=en#machines', 'viking-1')
  assert.equal(url.hash, '#explore')
  assert.equal(url.searchParams.get('m'), 'viking-1')
  assert.equal(url.searchParams.get('lang'), 'en')
})
test('section navigation removes the story query so reloading does not reopen a modal', () => {
  const url = sectionUrl('https://example.com/?m=viking-1&lang=en#explore', '#top')
  assert.equal(url.searchParams.has('m'), false)
  assert.equal(url.searchParams.get('lang'), 'en')
  assert.equal(url.hash, '#top')
})
