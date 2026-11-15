/** Reference examples, never presented as present-day measurements. */
export interface MarsWeather {
  temperatureC: number
  source: 'archive' | 'reference'
  asOf: string
  label: string
  sourceUrl: string
}
export interface CommsDelay {
  minutes: number
  source: 'model' | 'reference'
  asOf: string
  label: string
  sourceUrl: string
}
export const MARS_WEATHER_FALLBACK: MarsWeather = {
  temperatureC: -59, source: 'reference', asOf: 'Planet-wide climate reference',
  label: 'Climate reference · not current weather',
  sourceUrl: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html',
}
export const COMMS_DELAY_FALLBACK: CommsDelay = {
  minutes: 8, source: 'reference', asOf: 'InSight landing example · November 26, 2018',
  label: 'Historical example · not a current delay',
  sourceUrl: 'https://www.jpl.nasa.gov/news/press_kits/insight/landing/facts/',
}

