import { PIONEER_FALLBACK, buildHorizonsUrl, parseHorizonsVectors, type PioneerState } from '../../shared/horizons'

async function tryProxy(signal?: AbortSignal): Promise<PioneerState | null> {
  try {
    const res = await fetch('/api/horizons', { signal })
    if (!res.ok) return null
    const json = (await res.json()) as Partial<PioneerState>
    const finite = (n: unknown): n is number => typeof n === 'number' && Number.isFinite(n)
    if (![json.au, json.rangeKm, json.lightHours, json.speedKmS].every(finite) || !json.au || json.au < 0 || typeof json.asOf !== 'string') return null
    if (json.rangeRateKmS !== undefined && !finite(json.rangeRateKmS)) return null
    return { ...(json as PioneerState), source: 'live' }
  } catch {
    return null
  }
}

async function tryDirect(signal?: AbortSignal): Promise<PioneerState | null> {
  try {
    const res = await fetch(buildHorizonsUrl('https://ssd.jpl.nasa.gov/api/horizons.api'), { signal })
    if (!res.ok) return null
    return parseHorizonsVectors(await res.text())
  } catch {
    return null
  }
}

/** Pioneer 10 position from NASA/JPL Horizons, with a stored fallback so the page never breaks. */
export async function fetchPioneerState(signal?: AbortSignal): Promise<PioneerState> {
  const bounded = AbortSignal.any([...(signal ? [signal] : []), AbortSignal.timeout(8000)])
  const proxy = await tryProxy(bounded)
  if (proxy) return proxy
  if (bounded.aborted) return PIONEER_FALLBACK
  return (await tryDirect(bounded)) ?? PIONEER_FALLBACK
}
