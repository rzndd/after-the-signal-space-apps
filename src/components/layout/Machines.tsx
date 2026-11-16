import { useState } from 'react'
import type { Machine } from '../../types/machine'
import type { PioneerState } from '../../../shared/horizons'
import { NasaCover } from '../story/NasaCover'
import type { BodyId } from '../../types/machine'
import { missionLabels } from '../../data/missionLabels'
import styles from './Machines.module.css'

interface Props {
  machines: Machine[]
  pioneer: PioneerState
  onPick: (machine: Machine) => void
  openedIds: string[]
}

const worldName = { moon: 'The Moon', mars: 'Mars', 'deep-space': 'Deep space' } as const

/** Mission cards with locally hosted, attributed NASA imagery. */
const themes: Record<string, string> = {
  'apollo-11-eagle': 'Leaving the Moon', 'lunar-roving-vehicle': 'Going farther', 'viking-1': 'Investigating life',
  opportunity: 'Evidence of water', ingenuity: 'Flight on Mars', 'pioneer-10': 'Beyond the planets',
}

export function Machines({ machines, pioneer, onPick, openedIds }: Props) {
  const [filter, setFilter] = useState<BodyId | 'all'>('all')
  const shown = filter === 'all' ? machines : machines.filter((machine) => machine.body === filter)
  const discovered = machines.filter((machine) => openedIds.includes(machine.id)).length
  const hasNew = shown.some((machine) => !openedIds.includes(machine.id))
  const discover = () => {
    const fresh = shown.filter((machine) => !openedIds.includes(machine.id))
    const pool = fresh.length ? fresh : shown
    if (pool.length) onPick(pool[Math.floor(Math.random() * pool.length)])
  }
  return (
    <section id="machines" className={styles.section} aria-labelledby="machines-title">
      <div className={styles.heading}>
        <h2 id="machines-title" className={styles.title}>Meet the machines<br />that stayed behind.</h2>
        <p className={styles.intro}>Landers, rovers, scientific stations and silent spacecraft. Each holds a design decision and a legacy.</p>
      </div>
      <div className={styles.notebook}>
        <div><h3>Your mission notebook</h3><p>Hear a machine’s story, then discover the NASA record behind it.</p></div>
        <div className={styles.progress}><span aria-live="polite">{discovered} of {machines.length} stories opened</span><progress aria-label="Stories opened" value={discovered} max={machines.length} /><small>Progress saved on this device.</small></div>
        <button className={styles.discover} type="button" onClick={discover}>{hasNew ? 'Discover a story' : 'Revisit a story'}</button>
      </div>
      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label="Filter by destination">
          {(['all', 'moon', 'mars', 'deep-space'] as const).map((world) => <button type="button" key={world} aria-pressed={filter === world} onClick={() => setFilter(world)}>{world === 'all' ? `All ${machines.length}` : worldName[world]}</button>)}
        </div>
        <p className={styles.count} role="status">{shown.length} {shown.length === 1 ? 'story' : 'stories'} to explore</p>
      </div>
      <ul className={styles.grid}>
        {shown.map((m) => {
          return (
            <li key={m.id}>
              <button type="button" className={styles.card} data-world={m.body} onClick={() => onPick(m)} aria-label={`Read the story of ${m.name}`}>
                <span className={styles.art}><NasaCover image={m.cover} /></span>
                {openedIds.includes(m.id) && <span className={styles.opened}>Opened <span aria-hidden="true">✓</span></span>}
                <span className={styles.foot}>
                  <span className={styles.text}>
                    <span className={styles.name}>{m.name.replace(/ \(.*\)/, '')}</span>
                    <span className={styles.meta}>{m.destination ?? worldName[m.body]} · {m.years}</span>
                    <span className={styles.status}>{missionLabels[m.id].state}</span>
                    <span className={styles.reason}>{missionLabels[m.id].reason}</span>
                    <span className={styles.theme}>{themes[m.id] ?? m.destination}</span>
                    <span className={styles.hook}>{missionLabels[m.id].legacy}</span>
                  </span>
                  <span className={styles.go} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      <aside className={styles.distance} aria-label="Pioneer 10 distance">
      <p className={styles.distanceTitle}>Still out there.</p>
      <p className={styles.live}>
        Pioneer 10 is an estimated <strong>{Math.round(pioneer.au)} astronomical units</strong> from the Sun.
        Light would take about {Math.round(pioneer.lightHours)} hours to cross that distance.
        {' '}{pioneer.source === 'live' ? 'JPL model result' : 'Stored estimate; current query unavailable'} ({pioneer.asOf}).
        {' '}The probe has been silent since 2003; this is not a current radio measurement.
      </p>
      </aside>
    </section>
  )
}
