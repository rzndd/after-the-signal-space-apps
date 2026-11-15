// deslop-ignore-file 24: these SVGs are machine silhouettes in the educational map language.
import type { ReactElement } from 'react'
import styles from './MachineScene.module.css'

/**
 * Original, simplified silhouettes drawn for this project (not copies of NASA artwork).
 * Each one lives in a 120 x 100 box with the ground at y = 100.
 */
const F = styles.fill
const D = styles.detail

function Eagle() {
  return (
    <g className={F}>
      <path className={D} d="M40 62 L12 97 M80 62 L108 97 M52 70 L44 98 M68 70 L76 98" strokeWidth="3" />
      <ellipse cx="12" cy="98" rx="8" ry="2.4" />
      <ellipse cx="108" cy="98" rx="8" ry="2.4" />
      <ellipse cx="44" cy="99" rx="5.5" ry="1.8" />
      <ellipse cx="76" cy="99" rx="5.5" ry="1.8" />
      <path d="M32 40 H88 L92 56 L84 74 H36 L28 56 Z" />
      <path d="M50 74 H70 L76 90 H44 Z" />
      <path className={D} d="M34 52 H86 M36 63 H84" strokeWidth="1.6" />
      <rect className={D} x="57" y="42" width="6" height="10" strokeWidth="1.4" />
    </g>
  )
}

function Rover() {
  return (
    <g className={F}>
      <circle cx="26" cy="87" r="13" />
      <circle cx="94" cy="87" r="13" />
      <circle className={D} cx="26" cy="87" r="6" strokeWidth="2" />
      <circle className={D} cx="94" cy="87" r="6" strokeWidth="2" />
      <path d="M12 68 H108 V77 H12 Z" />
      <path d="M40 54 H56 V68 H40 Z M62 54 H78 V68 H62 Z" />
      <path className={D} d="M88 68 L92 48 M86 48 H98" strokeWidth="3" />
      <path className={D} d="M26 68 L22 36" strokeWidth="2.4" />
      <ellipse cx="21" cy="31" rx="10" ry="6" transform="rotate(-20 21 31)" />
    </g>
  )
}

function Viking() {
  return (
    <g className={F}>
      <path className={D} d="M44 68 L16 97 M76 68 L104 97 M60 74 L60 98" strokeWidth="3" />
      <ellipse cx="16" cy="98" rx="8" ry="2.2" />
      <ellipse cx="104" cy="98" rx="8" ry="2.2" />
      <ellipse cx="60" cy="99" rx="6" ry="1.8" />
      <path d="M36 54 H84 L92 70 H28 Z" />
      <rect x="92" y="56" width="12" height="10" rx="2" />
      <path className={D} d="M68 54 L78 30" strokeWidth="2.6" />
      <ellipse cx="80" cy="26" rx="13" ry="5" transform="rotate(-28 80 26)" />
      <path className={D} d="M46 54 V34" strokeWidth="2" />
      <circle cx="46" cy="32" r="3" />
      <path className={D} d="M34 64 L12 80 L8 76" strokeWidth="3" />
    </g>
  )
}

function Opportunity() {
  return (
    <g className={F}>
      <circle cx="30" cy="90" r="9" />
      <circle cx="60" cy="90" r="9" />
      <circle cx="90" cy="90" r="9" />
      <path className={D} d="M30 90 L50 74 L60 90 M90 90 L70 72" strokeWidth="2.6" />
      <rect x="36" y="58" width="48" height="18" rx="3" />
      <path d="M22 58 H98 L92 51 H28 Z" />
      <rect x="76" y="26" width="4" height="26" />
      <rect x="70" y="20" width="16" height="9" rx="2" />
      <path className={D} d="M42 51 L46 44" strokeWidth="2" />
      <ellipse cx="46" cy="42" rx="9" ry="4" transform="rotate(-22 46 42)" />
      <path className={D} d="M36 68 L18 78 L14 74" strokeWidth="2.6" />
    </g>
  )
}

function Ingenuity() {
  return (
    <g className={F}>
      <path className={D} d="M50 80 L42 98 M54 80 L52 98 M66 80 L68 98 M70 80 L78 98" strokeWidth="2.2" />
      <rect x="48" y="62" width="24" height="18" rx="2" />
      <rect x="58" y="36" width="4" height="26" />
      <rect x="45" y="30" width="30" height="6" rx="1" />
      <rect x="8" y="43" width="104" height="2.6" rx="1.3" />
      {/* the lower rotor is missing its right tip: the damage that ended its flights */}
      <rect x="12" y="50" width="50" height="2.6" rx="1.3" />
      <path d="M62 50 H86 L91 52.6 H62 Z" />
      <circle cx="60" cy="48" r="3.4" />
    </g>
  )
}

function Pioneer() {
  return (
    <g className={F}>
      <ellipse cx="46" cy="52" rx="30" ry="38" transform="rotate(14 46 52)" />
      <ellipse className={D} cx="46" cy="52" rx="20" ry="26" transform="rotate(14 46 52)" strokeWidth="2" />
      <path className={D} d="M46 52 L24 36" strokeWidth="2" />
      <circle cx="22" cy="35" r="3" />
      <rect x="64" y="42" width="18" height="16" rx="2" />
      <path className={D} d="M82 46 L112 38 M82 56 L110 70" strokeWidth="2.2" />
      <rect x="96" y="30" width="18" height="7" rx="3" transform="rotate(-14 105 33)" />
      <rect x="94" y="66" width="18" height="7" rx="3" transform="rotate(24 103 69)" />
      <path className={D} d="M64 56 L58 88" strokeWidth="2" />
      <circle cx="58" cy="90" r="3" />
    </g>
  )
}

export const silhouettes: Record<string, () => ReactElement> = {
  'apollo-11-eagle': Eagle,
  'lunar-roving-vehicle': Rover,
  'viking-1': Viking,
  opportunity: Opportunity,
  ingenuity: Ingenuity,
  'pioneer-10': Pioneer,
}
