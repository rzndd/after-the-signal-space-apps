/** Archived InSight feed. The client validates dates and labels every result as archival. */
export async function GET(): Promise<Response> {
  try {
    const response = await fetch('https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0', { signal: AbortSignal.timeout(2500) })
    if (!response.ok) return Response.json({ unavailable: true }, { headers: { 'Cache-Control': 's-maxage=60' } })
    const data = await response.json()
    return Response.json(data, { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' } })
  } catch { return Response.json({ unavailable: true }, { headers: { 'Cache-Control': 's-maxage=60' } }) }
}

