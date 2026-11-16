import type { Machine } from '../../types/machine'
import type { PioneerState } from '../../../shared/horizons'
import styles from './DeepSpaceView.module.css'

interface Props {
  machine: Machine
  state: PioneerState
  selected: boolean
  onSelect: () => void
}

export function DeepSpaceView({ machine, state, selected, onSelect }: Props) {
  return (
    <section className={styles.wrap} aria-label="Pioneer 10 deep-space archive">
      <header className={styles.header}>
        <span>DEEP SPACE / RECOVERED FILE 010</span>
        <span className={styles.status}>LAST SIGNAL · 2003</span>
      </header>
      <div className={styles.scene}>
        <div className={styles.story}>
          <p className={styles.name}>PIONEER <span>10</span></p>
          <h3>We lost the signal.<br /><em>Not the story.</em></h3>
          <p className={styles.intro}>Built on Earth. Sent past Jupiter. Now beyond our radio contact, carrying a message about where it came from.</p>
          <button type="button" className={`${styles.recover} ${selected ? styles.selected : ''}`} onClick={onSelect} aria-pressed={selected} aria-label={`Open ${machine.name} story, ${state.au.toFixed(1)} AU from the Sun`}>
            <span>OPEN THE PIONEER ARCHIVE</span><span aria-hidden="true">↗</span>
          </button>
          <p className={styles.fileNote}>THE TRANSMISSION ENDED.<br />THE JOURNEY DID NOT.</p>
        </div>
        <figure className={styles.photograph}>
          <div className={styles.photoFrame}>
            <img src="/media/machines/nasa-ARC-1973-AC73-9019.jpg" alt="Pioneer 10 during final assembly at TRW on Earth, with its large dish antenna and extended instruments." loading="lazy" decoding="async" width="853" height="1280" />
            <span className={styles.photoIndex} aria-hidden="true">NASA / ARC<br />AC73–9019</span>
          </div>
          <figcaption>Before the silence.<span>Final assembly on Earth · NASA/ARC. Not a photograph in deep space.</span></figcaption>
        </figure>
      </div>
      <figure className={styles.flight}>
        <div className={styles.space}>
          <p className={styles.spaceLabel}>OUTBOUND / NO RETURN SIGNAL</p>
          <svg className={styles.flightLine} viewBox="0 0 800 260" preserveAspectRatio="none" aria-hidden="true">
            <path d="M80 190 C240 200 280 68 440 74 S570 90 640 78" className={styles.trail} />
            <path d="M640 78 Q700 64 775 30" className={styles.onward} />
            <circle className={styles.outboundPulse} cx="0" cy="0" r="3" />
          </svg>
          <span className={styles.origin}><span aria-hidden="true" />Sun</span>
          <button type="button" className={styles.spaceProbe} onClick={onSelect} aria-label="Recover Pioneer 10 from the deep-space illustration">
            <span className={styles.beacon} aria-hidden="true" />
            <strong>Pioneer 10</strong><span>{state.au.toFixed(1)} AU · open archive ↗</span>
          </button>
          <span className={styles.beyond}>STILL OUT THERE →</span>
        </div>
        <figcaption>Illustrative journey, not a plotted flight path or a scale map. Background: NASA/Hubble’s N49 composite, not Pioneer’s surroundings. <a href="https://images.nasa.gov/details/0301627" target="_blank" rel="noreferrer">NASA image ↗</a></figcaption>
      </figure>
      <div className={styles.readout}>
        <div className={styles.distance}>
          <span className={styles.distanceLabel}>STILL OUT THERE / FROM THE SUN</span>
          <p className={styles.distanceValue}>{state.au.toFixed(1)} <span>AU</span></p>
          <p className={styles.kilometres}>{(state.rangeKm / 1_000_000_000).toLocaleString('en-US', { maximumFractionDigits: 2 })} billion kilometres</p>
        </div>
        <dl className={styles.metrics}>
          <div><dt>Sun–probe light time</dt><dd>{state.lightHours.toFixed(1)} <span>hours</span></dd></div>
          <div><dt>Speed relative to the Sun</dt><dd>{state.speedKmS.toFixed(1)} <span>km/s</span></dd></div>
        </dl>
      </div>
      <footer className={styles.source}>
        <p>{state.source === 'live' ? 'NASA/JPL Horizons model' : 'Stored estimate · current query unavailable'} · {state.asOf || 'reference date unavailable'}. Calculated position, not a live signal.</p>
        <details><summary>Read the scientific record</summary>
          <p>Model epoch: {state.asOf || 'date unavailable'}{state.asOfTime ? `, ${state.asOfTime}` : ', time unavailable'}. TDB is the astronomical time scale used for this calculation.</p>
          <p>Distance, speed and light time use the Sun as reference. One AU is approximately the Earth–Sun distance. These values come from a trajectory model; Pioneer 10 has not sent a received signal since 2003.</p>
          <div className={styles.links}><a href="https://ssd-api.jpl.nasa.gov/doc/horizons.html" target="_blank" rel="noreferrer">JPL Horizons ↗</a><a href="https://images.nasa.gov/details/ARC-1973-AC73-9019" target="_blank" rel="noreferrer">Original NASA photograph ↗</a><a href="https://science.nasa.gov/mission/pioneer-10/" target="_blank" rel="noreferrer">Mission record ↗</a></div>
        </details>
      </footer>
    </section>
  )
}
