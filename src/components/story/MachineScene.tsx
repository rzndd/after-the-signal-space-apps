// deslop-ignore-file 24: this is an accessible mission-scene diagram used for the empty story state.
import { useId } from 'react'
import type { BodyId, Machine } from '../../types/machine'
import { mulberry32 } from '../../lib/rng'
import { silhouettes } from './silhouettes'
import styles from './MachineScene.module.css'

const W = 400, H = 210, HORIZON = 150, GROUND = 178
const SCALE = 1.35

const rnd = mulberry32(42)
const stars = Array.from({ length: 60 }, () => ({ x: rnd() * W, y: rnd() * (HORIZON - 10), r: 0.5 + rnd() * 1.1, o: 0.35 + rnd() * 0.65 }))
const rocks = Array.from({ length: 7 }, () => ({ x: 20 + rnd() * 360, y: HORIZON + 14 + rnd() * 40, rx: 3 + rnd() * 6 }))

interface Props {
  world: BodyId
  machine: Machine | null
}

/** One lonely machine, its long shadow, and the flag that marks the spot. */
export function MachineScene({ world, machine }: Props) {
  const sceneId = useId().replaceAll(':', '')
  const skyId = `sky-${sceneId}`
  const earthId = `earth-${sceneId}`
  const Silhouette = machine ? silhouettes[machine.id] : undefined
  const space = world === 'deep-space'
  const x0 = space ? 140 : 70
  const y0 = GROUND - 100 * SCALE

  return (
    <svg className={styles.scene} viewBox={`0 0 ${W} ${H}`} role="img"
      aria-label={machine ? `Silhouette of ${machine.name} on its own` : 'An empty landscape with a flag'}>
      <defs>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--sky-top)" />
          <stop offset="1" stopColor="var(--sky-bottom)" />
        </linearGradient>
        <radialGradient id={earthId} cx="35%" cy="35%" r="70%">
          <stop offset="0" stopColor="#d9ecff" />
          <stop offset="0.55" stopColor="#3f7fd6" />
          <stop offset="1" stopColor="#12306b" />
        </radialGradient>
      </defs>
      <rect width={W} height={space ? H : HORIZON + 1} fill={`url(#${skyId})`} />
      {(world !== 'mars') && stars.map((s, i) => <circle key={i} cx={s.x} cy={space ? s.y * 1.35 : s.y} r={s.r} fill="#fff" opacity={s.o} />)}
      {world === 'moon' && <circle cx="322" cy="46" r="17" fill={`url(#${earthId})`} />}
      {world === 'mars' && <circle cx="320" cy="62" r="13" fill="#fff4dc" opacity="0.9" />}

      {!space && (
        <>
          <rect y={HORIZON} width={W} height={H - HORIZON} fill="var(--ground)" />
          <rect y={HORIZON} width={W} height="3" fill="var(--ground-dark)" opacity="0.55" />
          {rocks.map((r, i) => <ellipse key={i} cx={r.x} cy={r.y} rx={r.rx} ry={r.rx * 0.42} fill="var(--ground-dark)" opacity="0.55" />)}
        </>
      )}

      {Silhouette && !space && (
        <g className={styles.shadow} transform={`translate(${x0 + 6} ${GROUND}) scale(${SCALE} ${-SCALE * 0.32}) skewX(52) translate(0 -100)`}>
          <Silhouette />
        </g>
      )}
      {Silhouette && (
        <g className={styles.machine} transform={space ? `translate(${x0} 30) scale(1.5) rotate(-8 60 50)` : `translate(${x0} ${y0}) scale(${SCALE})`}>
          <Silhouette />
        </g>
      )}

      {!space && (
        <g className={styles.flagWrap}>
          <ellipse cx="318" cy={GROUND + 2} rx="9" ry="2.6" fill="var(--ground-dark)" opacity="0.7" />
          <line x1="318" y1={GROUND} x2="318" y2={GROUND - 66} className={styles.pole} />
          <path className={styles.pennant} d={`M318 ${GROUND - 66} L350 ${GROUND - 55} L318 ${GROUND - 43} Z`} />
        </g>
      )}
    </svg>
  )
}
