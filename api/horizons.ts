/**
 * Vercel Function: asks NASA/JPL Horizons for Pioneer 10 and returns a small JSON.
 * Self-contained on purpose: imports from outside api/ crash Vercel's function bundler at runtime.
 */
const AU_KM = 149_597_870.7

const pad = (n: number) => String(n).padStart(2, '0')
const iso = (d: Date) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`

function buildHorizonsUrl(base: string, now = new Date()): string {
  const tomorrow = new Date(now.getTime() + 86_400_000)
  const params = new URLSearchParams({
    format: 'text',
    COMMAND: "'-23'",
    OBJ_DATA: "'NO'",
    MAKE_EPHEM: "'YES'",
    EPHEM_TYPE: "'VECTORS'",
    CENTER: "'500@10'",
    START_TIME: `'${iso(now)}'`,
    STOP_TIME: `'${iso(tomorrow)}'`,
    STEP_SIZE: "'1 d'",
    VEC_TABLE: "'3'",
    OUT_UNITS: "'KM-S'",
    TIME_TYPE: "'TDB'",
  })
  return `${base}?${params.toString()}`
}

/** Parses the text output of Horizons (VEC_TABLE=3). Copied verbatim from shared/horizons.ts. */
function parseHorizonsVectors(text: string) {
  const block = text.split('$$SOE')[1]?.split('$$EOE')[0]
  if (!block) return null
  const num = (key: string) => {
    const m = block.match(new RegExp(`\\b${key}\\s*=\\s*([-+0-9.Ee]+)`))
    return m ? Number(m[1]) : NaN
  }
  const rangeKm = num('RG')
  const rangeRateKmS = num('RR')
  const lightSeconds = num('LT')
  const vx = num('VX')
  const vy = num('VY')
  const vz = num('VZ')
  const when = block.match(/A\.D\.\s+(\d{4}-[A-Za-z]{3}-\d{2})(?:\s+(\d{2}:\d{2}:\d{2})(?:\.\d+)?)?/)
  if ([rangeKm, rangeRateKmS, lightSeconds, vx, vy, vz].some((n) => !Number.isFinite(n))) return null
  return {
    au: rangeKm / AU_KM,
    rangeKm,
    lightHours: lightSeconds / 3600,
    speedKmS: Math.hypot(vx, vy, vz),
    rangeRateKmS,
    asOf: when?.[1] ?? '',
    asOfTime: when?.[2] ? `${when[2]} TDB` : undefined,
    source: 'live' as const,
  }
}

export async function GET(): Promise<Response> {
  try {
    const upstream = await fetch(buildHorizonsUrl('https://ssd.jpl.nasa.gov/api/horizons.api'), { signal: AbortSignal.timeout(10_000) })
    if (!upstream.ok) return Response.json({ error: 'upstream' }, { status: 502 })
    const state = parseHorizonsVectors(await upstream.text())
    if (!state) return Response.json({ error: 'parse' }, { status: 502 })
    return Response.json(state, {
      headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' },
    })
  } catch {
    return Response.json({ error: 'network' }, { status: 502 })
  }
}
