const sectionHashes = new Set(['#top', '#machines', '#about'])

/** Explicit section links take precedence over a machine query. */
export function storyIdFromUrl(url: URL, validIds: readonly string[]): string | null {
  if (sectionHashes.has(url.hash)) return null
  const id = url.searchParams.get('m')
  return id && validIds.includes(id) ? id : null
}

export function storyUrl(current: string, id: string): URL {
  const url = new URL(current)
  url.searchParams.set('m', id)
  url.hash = 'explore'
  return url
}

export function sectionUrl(current: string, hash: string): URL {
  const url = new URL(current)
  url.searchParams.delete('m')
  url.hash = hash
  return url
}
