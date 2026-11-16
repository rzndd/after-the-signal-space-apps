import { mulberry32 } from './rng'

/** Full globe: longitude -180..180 (east positive), latitude 90..-90. */
const X = (lon: number, w: number) => ((lon + 180) / 360) * w
const Y = (lat: number, h: number) => ((90 - lat) / 180) * h
const INK = '#5f2608'

const dark = [
  { lon: 69, lat: 9, rx: 14, ry: 12 }, // Syrtis Major
  { lon: -30, lat: 45, rx: 32, ry: 14 }, // Acidalia
  { lon: -10, lat: -5, rx: 18, ry: 10 },
  { lon: 150, lat: -35, rx: 25, ry: 12 },
  { lon: -95, lat: -45, rx: 25, ry: 10 },
  { lon: 40, lat: -40, rx: 22, ry: 11 },
]

const labels = [
  { lon: -47.95, lat: 22.27, text: 'Chryse Planitia', side: 'left' },
  { lon: -5.5, lat: -1.95, text: 'Meridiani Planum', side: 'right' },
  { lon: 77.45, lat: 18.44, text: 'Jezero Crater', side: 'right' },
] as const

export function drawMars(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = '#f4b183'
  ctx.fillRect(0, 0, w, h)

  for (const d of dark) {
    ctx.save()
    ctx.translate(X(d.lon, w), Y(d.lat, h))
    ctx.scale(d.rx * (w / 360), d.ry * (h / 180))
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1)
    g.addColorStop(0, 'rgba(140,70,44,0.62)')
    g.addColorStop(1, 'rgba(140,70,44,0)')
    ctx.fillStyle = g
    ctx.beginPath(); ctx.arc(0, 0, 1, 0, Math.PI * 2); ctx.fill()
    ctx.restore()
  }

  // canyon system
  ctx.strokeStyle = 'rgba(94,42,24,0.75)'
  ctx.lineWidth = Math.max(3, h / 55)
  ctx.lineCap = 'round'
  ctx.beginPath(); ctx.moveTo(X(-100, w), Y(-8, h)); ctx.bezierCurveTo(X(-85, w), Y(-14, h), X(-70, w), Y(-10, h), X(-55, w), Y(-13, h)); ctx.stroke()

  // craters: ink outlines
  const rnd = mulberry32(2004)
  for (let i = 0; i < 80; i++) {
    const r = (1 + rnd() * rnd() * 7) * (w / 1000) * 3
    ctx.strokeStyle = 'rgba(58,22,10,0.26)'
    ctx.lineWidth = 1.2
    ctx.beginPath(); ctx.arc(rnd() * w, rnd() * h, r, 0, Math.PI * 2); ctx.stroke()
  }

  // polar caps
  const cap = (y: number, flip: number) => {
    const g = ctx.createLinearGradient(0, y, 0, y + flip * h * 0.09)
    g.addColorStop(0, 'rgba(255,248,240,0.96)')
    g.addColorStop(1, 'rgba(255,248,240,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, flip > 0 ? y : y + flip * h * 0.09, w, h * 0.09)
  }
  cap(0, 1)
  cap(h, -1)

  // graticule + labels
  const fs = Math.max(11, w / 80)
  ctx.strokeStyle = 'rgba(58,22,10,0.2)'
  ctx.setLineDash([4, 6])
  ctx.lineWidth = 1
  ctx.fillStyle = 'rgba(58,22,10,0.78)'
  ctx.font = `${fs}px 'Atkinson Hyperlegible Next Variable', system-ui, sans-serif`
  for (let lon = -120; lon <= 120; lon += 60) {
    ctx.beginPath(); ctx.moveTo(X(lon, w), 0); ctx.lineTo(X(lon, w), h); ctx.stroke()
    ctx.fillText(`${Math.abs(lon)}°${lon < 0 ? 'W' : 'E'}`, X(lon, w) + 4, h - 8)
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    ctx.beginPath(); ctx.moveTo(0, Y(lat, h)); ctx.lineTo(w, Y(lat, h)); ctx.stroke()
    ctx.fillText(`${Math.abs(lat)}°${lat < 0 ? 'S' : lat > 0 ? 'N' : ''}`, 8, Y(lat, h) - 5)
  }
  ctx.setLineDash([])
  ctx.fillStyle = INK
  ctx.font = `700 ${fs * 1.15}px 'Baloo 2 Variable', system-ui, sans-serif`
  for (const l of labels) {
    const left = l.side === 'left'
    ctx.textAlign = left ? 'right' : 'left'
    ctx.fillText(l.text, X(l.lon, w) + (left ? -14 : 16), Y(l.lat, h) + 6)
  }
  ctx.textAlign = 'left'
}
