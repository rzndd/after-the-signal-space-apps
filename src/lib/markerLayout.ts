interface Point { x: number; y: number }
/** Separate touch targets; leader lines preserve the original geographic location. */
export function layoutMarkers(points: Point[], width: number, height: number) {
  const size = 44, gap = 6
  const placed: { left: number; top: number }[] = []
  let needsGrid = false
  const result = points.map(point => {
    const origin = { left: point.x * width - size * .32, top: point.y * height - size * .88 }
    const candidates = [{ ...origin }]
    for (let ring = 1; ring <= points.length; ring++) {
      for (let y = -ring; y <= ring; y++) for (let x = -ring; x <= ring; x++) {
        if (Math.max(Math.abs(x), Math.abs(y)) === ring) candidates.push({ left: origin.left + x * (size + gap), top: origin.top + y * (size + gap) })
      }
    }
    candidates.sort((a, b) => Math.hypot(a.left-origin.left, a.top-origin.top) - Math.hypot(b.left-origin.left, b.top-origin.top))
    const fit = candidates.find(p => p.left >= 0 && p.top >= 0 && p.left + size <= width && p.top + size <= height &&
      placed.every(q => p.left + size + gap <= q.left || q.left + size + gap <= p.left || p.top + size + gap <= q.top || q.top + size + gap <= p.top))
    if (!fit) needsGrid = true
    const position = fit ?? origin
    placed.push(position)
    return { x: (position.left + size * .32) / width, y: (position.top + size * .88) / height }
  })
  if (!needsGrid) return result
  // A dense group near an edge can exhaust greedy offsets. Repack all targets
  // into distinct 44px cells; leader lines still point to the real coordinates.
  const cells: { left: number; top: number }[] = []
  for (let top = 0; top + size <= height; top += size + gap)
    for (let left = 0; left + size <= width; left += size + gap) cells.push({ left, top })
  if (cells.length < points.length) return result
  return points.map(point => {
    const left = point.x * width - size * .32, top = point.y * height - size * .88
    cells.sort((a,b) => Math.hypot(a.left-left,a.top-top) - Math.hypot(b.left-left,b.top-top))
    const cell = cells.shift()!
    return {x:(cell.left+size*.32)/width,y:(cell.top+size*.88)/height}
  })
}

