/** Shared by the browser client and the Vercel function in /api. */
export const AU_KM = 149_597_870.7

export interface PioneerState {
  au: number
  rangeKm: number
  lightHours: number
  speedKmS: number
  /** Heliocentric radial range rate, distinct from total velocity magnitude. */
  rangeRateKmS?: number
  /** Date of the ephemeris point, e.g. "2026-Nov-14". */
  asOf: string
  /** Model epoch time; omitted for older/stored records without a verified time. */
  asOfTime?: string
  source: 'live' | 'fallback'
}

/** Last values checked against NASA/JPL Horizons, used when the API cannot be reached. */
export const PIONEER_FALLBACK: PioneerState = {
  au: 142.23,
  rangeKm: 21_277_183_232,
  lightHours: 19.72,
  speedKmS: 11.85,
  asOf: '2026-Nov-14',
  source: 'fallback',
}

const pad = (n: number) => String(n).padStart(2, '0')
const iso = (d: Date) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`

/** URL for Pioneer 10 (id -23) heliocentric state vectors for today. */
export function buildHorizonsUrl(base: string, now = new Date()): string {
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

/** Parses the text output of Horizons (VEC_TABLE=3) into a PioneerState. */
export function parseHorizonsVectors(text: string): PioneerState | null {
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
    source: 'live',
  }
}
