import { useEffect, useRef, useState } from 'react'
import type { Machine } from '../../types/machine'
import { MapMarker } from './MapMarker'
import { surfaceMaps, surfacePosition } from '../../lib/surfaceMaps'
import styles from './SurfaceMap.module.css'
import { layoutMarkers } from '../../lib/markerLayout'

interface Props {
  body: 'moon' | 'mars'
  machines: Machine[]
  selectedId: string | null
  onSelect: (id: string) => void
}
export function SurfaceMap({ body, machines, selectedId, onSelect }: Props) {
  const [failedBody, setFailedBody] = useState('')
  const element = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 640, height: 480 })
  useEffect(() => {
    if (!element.current) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize((old) => old.width === width && old.height === height ? old : { width, height })
    })
    observer.observe(element.current)
    return () => observer.disconnect()
  }, [])
  const map = surfaceMaps[body]
  const points = machines.flatMap((m) => m.points.map((p) => ({ m, p, origin: surfacePosition(body, p) })))
  const positions = layoutMarkers(points.map(point => point.origin), size.width, size.height)
  return <figure className={styles.figure}>
    <div ref={element} className={styles.map}>
      {failedBody !== body ? <img key={body} className={styles[body]} src={map.src} alt={map.alt} loading="lazy" decoding="async" onError={() => setFailedBody(body)} /> : <p className={styles.missing}>Image unavailable. Flags and the machine list remain accessible.</p>}
      <div className={styles.shade} aria-hidden="true" />
      <svg className={styles.connectors} viewBox={`0 0 ${size.width} ${size.height}`} preserveAspectRatio="none" aria-hidden="true">
        {points.map(({ m, p, origin }, i) => positions[i].x === origin.x && positions[i].y === origin.y ? null : <g key={m.id + p.label}><line x1={origin.x * size.width} y1={origin.y * size.height} x2={positions[i].x * size.width} y2={positions[i].y * size.height} /><circle cx={origin.x * size.width} cy={origin.y * size.height} r="3" /></g>)}
      </svg>
      {points.map(({ m, p }, i) => {
        const point = positions[i]
        return <MapMarker key={m.id + p.label} x={point.x} y={point.y} index={i}
          label={m.name + ', ' + p.label} selected={selectedId === m.id} onSelect={() => onSelect(m.id)} />
      })}
    </div>
    <figcaption className={styles.caption}>{map.credit} · {map.extent}. Approximate positions; connector dots mark locations when flags are separated for touch. Not a current image of the equipment. <a href={map.source} target="_blank" rel="noreferrer">NASA source ↗</a></figcaption>
  </figure>
}
