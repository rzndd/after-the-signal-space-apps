import styles from './TelemetryHud.module.css'
import type { MarsWeather, CommsDelay } from '../../data/telemetryFallbacks'

interface TelemetryHudProps {
  battery: number
  unlimited: boolean
  paused?: boolean
  weather?: MarsWeather
  delay?: CommsDelay
}

export function TelemetryHud({ battery, unlimited, paused = false, weather, delay }: TelemetryHudProps) {
  return (
    <aside className={styles.hud} aria-label="Recovery telemetry">
      <span>TERMINAL · SIMULATION</span>
      <strong aria-label={unlimited ? 'Unlimited energy' : `${battery} percent`}>{unlimited ? '∞' : `${battery}%`}</strong>
      <span className={styles.status}>{unlimited ? 'ARCHIVES UNLOCKED' : paused ? 'LOCAL ARCHIVE · RECOVERY PAUSED' : battery < 5 ? 'CRITICAL POWER' : battery < 10 ? 'LOW RESERVE' : 'POWER DRAIN ACTIVE'}</span>
      {weather && delay && <details className={styles.data}>
        <summary aria-label="Mars weather and communication data">DATA</summary>
        <div className={styles.panel}>
          <h2>Mars context</h2>
          <p><strong>{weather.temperatureC.toFixed(1)} °C</strong><br />{weather.label}<br />{weather.asOf}</p>
          <a href={weather.sourceUrl} target="_blank" rel="noreferrer">Weather source ↗</a>
          <p><strong>{delay.minutes.toFixed(1)} min one way</strong><br />{delay.label}<br />{delay.asOf}</p>
          <p>Earth–Mars light time, not Pioneer 10 distance or a live rover signal.</p>
          <a href={delay.sourceUrl} target="_blank" rel="noreferrer">Delay source ↗</a>
        </div>
      </details>}
    </aside>
  )
}
