/** Geocentric Mars light time. Independent of the heliocentric Pioneer 10 diagram. */
export async function GET(): Promise<Response> {
  const date = new Date()
  const next = new Date(date.getTime() + 86_400_000)
  const params = new URLSearchParams({
    format: 'text', COMMAND: "'499'", OBJ_DATA: "'NO'", MAKE_EPHEM: "'YES'",
    EPHEM_TYPE: "'VECTORS'", CENTER: "'500@399'", START_TIME: "'" + date.toISOString().slice(0,10) + "'",
    STOP_TIME: "'" + next.toISOString().slice(0,10) + "'", STEP_SIZE: "'1 d'", VEC_TABLE: "'3'", OUT_UNITS: "'KM-S'", TIME_TYPE: "'TDB'",
  })
  try {
    const response = await fetch('https://ssd.jpl.nasa.gov/api/horizons.api?' + params, { signal: AbortSignal.timeout(2500) })
    if (!response.ok) return Response.json({ unavailable: true }, { headers: { 'Cache-Control': 's-maxage=60' } })
    const block = (await response.text()).split('$$SOE')[1]?.split('$$EOE')[0] ?? ''
    const seconds = Number(block.match(/\bLT\s*=\s*([-+0-9.Ee]+)/)?.[1])
    const epoch = block.match(/A\.D\.\s+(\d{4}-[A-Za-z]{3}-\d{2}\s+\d{2}:\d{2}:\d{2})/)?.[1]
    if (!Number.isFinite(seconds) || seconds <= 0 || seconds > 3600 || !epoch) return Response.json({ unavailable: true }, { headers: { 'Cache-Control': 's-maxage=60' } })
    return Response.json({ minutes: seconds / 60, asOf: epoch + ' TDB' }, { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' } })
  } catch { return Response.json({ unavailable: true }, { headers: { 'Cache-Control': 's-maxage=60' } }) }
}

