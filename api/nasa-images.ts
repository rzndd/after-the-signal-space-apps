/** Vercel Function: thin cached proxy for the NASA Image and Video Library search. */
export async function GET(request: Request): Promise<Response> {
  const incoming = new URL(request.url).searchParams
  const params = new URLSearchParams({ media_type: 'image', page_size: '5' })
  const q = incoming.get('q')
  const nasaId = incoming.get('nasa_id')
  if (q) params.set('q', q.slice(0, 120))
  if (nasaId) params.set('nasa_id', nasaId.slice(0, 60))
  if (!q && !nasaId) return Response.json({ error: 'missing query' }, { status: 400 })
  try {
    const upstream = await fetch(`https://images-api.nasa.gov/search?${params.toString()}`)
    if (!upstream.ok) return Response.json({ error: 'upstream' }, { status: 502 })
    return new Response(await upstream.text(), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=86400, stale-while-revalidate=604800',
      },
    })
  } catch {
    return Response.json({ error: 'network' }, { status: 502 })
  }
}
