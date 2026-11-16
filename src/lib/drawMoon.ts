import { mulberry32 } from './rng'

/** Window shown: longitude -60..60, latitude 45..-45. Positions below are in degrees. */
const LON0 = -60, LON1 = 60, LAT0 = 45, LAT1 = -45
const INK = '#272f6e'

const maria: Array<{ lon: number; lat: number; r: number; name: string; dy?: number }> = [
  { lon: 31, lat: 8, r: 11, name: 'Sea of Tranquility', dy: -22 },
  { lon: 18, lat: 28, r: 9, name: 'Sea of Serenity' },
  { lon: -16, lat: 33, r: 16, name: 'Sea of Rains' },
  { lon: 59, lat: 17, r: 6, name: 'Sea of Crises' },
  { lon: -48, lat: 8, r: 19, name: 'Ocean of Storms' },
  { lon: -15, lat: -21, r: 10, name: 'Sea of Clouds' },
  { lon: 51, lat: -4, r: 8, name: 'Sea of Fertility' },
]

export function drawMoon(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const X = (lon: number) => ((lon - LON0) / (LON1 - LON0)) * w
  const Y = (lat: number) => ((LAT0 - lat) / (LAT0 - LAT1)) * h
  const degPx = w / (LON1 - LON0)

  ctx.fillStyle = '#c9d2f8'
  ctx.fillRect(0, 0, w, h)

  // dark "seas": flat patches, like shaded areas on a survey sheet
  for (const m of maria) {
    const g = ctx.createRadialGradient(X(m.lon), Y(m.lat), 0, X(m.lon), Y(m.lat), m.r * degPx)
    g.addColorStop(0, 'rgba(100,112,176,0.75)')
    g.addColorStop(0.75, 'rgba(112,124,186,0.5)')
    g.addColorStop(1, 'rgba(112,124,186,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
  }

  // craters: a few large, many small, with a lit rim on one side
  const rnd = mulberry32(1969)
  for (let i = 0; i < 110; i++) {
    const x = rnd() * w, y = rnd() * h
    const big = rnd() > 0.93
    const r = (big ? 14 + rnd() * 16 : 1.5 + rnd() * rnd() * 9) * (w / 900)
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(39,47,110,0.08)'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(x, y, r, Math.PI * 0.85, Math.PI * 1.85)
    ctx.lineWidth = Math.max(1, r * 0.1)
    ctx.strokeStyle = 'rgba(39,47,110,0.4)'
    ctx.stroke()
  }

  // graticule + labels
  const fs = Math.max(11, w / 62)
  ctx.strokeStyle = 'rgba(39,47,110,0.18)'
  ctx.setLineDash([4, 6])
  ctx.lineWidth = 1
  ctx.fillStyle = 'rgba(39,47,110,0.8)'
  ctx.font = `${fs}px 'Atkinson Hyperlegible Next Variable', system-ui, sans-serif`
  for (let lon = -40; lon <= 40; lon += 20) {
    ctx.beginPath(); ctx.moveTo(X(lon), 0); ctx.lineTo(X(lon), h); ctx.stroke()
    ctx.fillText(`${Math.abs(lon)}°${lon < 0 ? 'W' : lon > 0 ? 'E' : ''}`, X(lon) + 4, h - 8)
  }
  for (let lat = -30; lat <= 30; lat += 30) {
    ctx.beginPath(); ctx.moveTo(0, Y(lat)); ctx.lineTo(w, Y(lat)); ctx.stroke()
    ctx.fillText(`${Math.abs(lat)}°${lat < 0 ? 'S' : lat > 0 ? 'N' : ''}`, 8, Y(lat) - 5)
  }
  ctx.setLineDash([])
  ctx.fillStyle = INK
  ctx.font = `700 ${fs * 1.1}px 'Baloo 2 Variable', system-ui, sans-serif`
  for (const m of maria) ctx.fillText(m.name, X(m.lon) - m.r * degPx * 0.5, Y(m.lat) + (m.dy ?? 28))
}
