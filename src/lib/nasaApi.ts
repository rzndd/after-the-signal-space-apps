import { COMMS_DELAY_FALLBACK, MARS_WEATHER_FALLBACK, type CommsDelay, type MarsWeather } from '../data/telemetryFallbacks.ts'

/** Bounds headers AND JSON decoding; external cancellation is preserved. */
export async function fetchWithTimeout<T>(url: string, ms = 3000, signal?: AbortSignal): Promise<T> {
  const controller = new AbortController()
  let timer: ReturnType<typeof setTimeout> | undefined
  let rejectAbort: (reason?: unknown) => void = () => {}
  const aborted = new Promise<never>((_, reject) => { rejectAbort = reject })
  const abort = () => { controller.abort(); rejectAbort(new Error('Request aborted')) }
  if (signal?.aborted) abort()
  else signal?.addEventListener('abort', abort, { once: true })
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => { controller.abort(); reject(new Error('Request timed out')) }, ms)
  })
  try {
    const request = (async () => {
      const response = await fetch(url, { signal: controller.signal })
      if (!response.ok) throw new Error('NASA request failed')
      return await response.json() as T
    })()
    return await Promise.race([request, timeout, aborted])
  } finally {
    clearTimeout(timer)
    signal?.removeEventListener('abort', abort)
  }
}
export function parseMarsWeather(raw: unknown): MarsWeather | null {
  if (!raw || typeof raw !== 'object') return null
  const data = raw as Record<string, unknown>
  if (!Array.isArray(data.sol_keys)) return null
  const sols = data.sol_keys.filter((sol): sol is string => typeof sol === 'string' && /^\d+$/.test(sol)).sort((a,b) => Number(b)-Number(a))
  for (const sol of sols) {
    const record = data[sol] as { AT?: { av?: unknown }; First_UTC?: unknown } | undefined
    const value = record?.AT?.av
    if (typeof value !== 'number' || !Number.isFinite(value) || value < -200 || value > 100 || typeof record?.First_UTC !== 'string' || !Number.isFinite(Date.parse(record.First_UTC))) continue
    return { temperatureC: value, source: 'archive', asOf: record.First_UTC, label: 'InSight archive · sol ' + sol, sourceUrl: 'https://api.nasa.gov/assets/insight/InSight%20Weather%20API%20Documentation.pdf' }
  }
  return null
}
export function parseCommsDelay(raw: unknown): CommsDelay | null {
  const data = raw as Partial<CommsDelay> | null
  if (!data || typeof data.minutes !== 'number' || !Number.isFinite(data.minutes) || data.minutes <= 0 || data.minutes > 60 || typeof data.asOf !== 'string' || !/^\d{4}-[A-Za-z]{3}-\d{2}/.test(data.asOf)) return null
  return { minutes: data.minutes, source: 'model', asOf: data.asOf, label: 'Earth–Mars · one-way light time', sourceUrl: 'https://ssd-api.jpl.nasa.gov/doc/horizons.html' }
}
export async function fetchMarsWeather(signal?: AbortSignal): Promise<MarsWeather> {
  try { return parseMarsWeather(await fetchWithTimeout('/api/mars-weather', 3000, signal)) ?? MARS_WEATHER_FALLBACK } catch { return MARS_WEATHER_FALLBACK }
}
export async function fetchCommsDelay(signal?: AbortSignal): Promise<CommsDelay> {
  try { return parseCommsDelay(await fetchWithTimeout('/api/comms-delay', 3000, signal)) ?? COMMS_DELAY_FALLBACK } catch { return COMMS_DELAY_FALLBACK }
}

