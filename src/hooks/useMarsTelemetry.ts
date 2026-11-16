import { useEffect, useState } from 'react'
import { fetchCommsDelay, fetchMarsWeather } from '../lib/nasaApi'
import { COMMS_DELAY_FALLBACK, MARS_WEATHER_FALLBACK } from '../data/telemetryFallbacks'
export function useMarsTelemetry(enabled: boolean) {
  const [data, setData] = useState({ weather: MARS_WEATHER_FALLBACK, delay: COMMS_DELAY_FALLBACK })
  useEffect(() => {
    if (!enabled) return
    const controller = new AbortController()
    void Promise.all([fetchMarsWeather(controller.signal), fetchCommsDelay(controller.signal)]).then(([weather, delay]) => {
      if (!controller.signal.aborted) setData({ weather, delay })
    })
    return () => controller.abort()
  }, [enabled])
  return data
}

