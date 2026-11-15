export const surfaceMaps = {
  moon: { src: '/media/maps/moon-lroc.jpg', alt: 'LRO lunar-surface mosaic cropped around the zero meridian.', credit: 'NASA SVS / LRO / LROC · image mosaic', source: 'https://svs.gsfc.nasa.gov/4720/', extent: '60° W–60° E, 45° N–45° S' },
  mars: { src: '/media/maps/mars-viking.jpg', alt: 'Global Mars mosaic from Viking imagery, distributed by NASA Mars Trek.', credit: 'NASA / USGS / Mars Trek · Viking MDIM 2.1', source: 'https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars', extent: '180° W–180° E, 90° N–90° S' },
} as const

/** Moon uses a 120x90-degree window; Mars now shows the complete global mosaic. */
export function surfacePosition(_body: 'moon' | 'mars', point: { x: number; y: number }) {
  return { ...point }
}
