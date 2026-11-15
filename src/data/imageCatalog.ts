import { expandedEntries, expansionImage } from './expandedMissions.ts'
import type { MachineImage } from '../types/machine'
/** NASA Library metadata checked against nasa_id search results; originals remain untouched. */
export const imageCatalog = {
  'apollo-11-eagle': { nasaId: 'as11-40-5902', localSrc: '/media/machines/nasa-as11-40-5902.jpg', label: 'Buzz Aldrin beside an Eagle landing leg, July 20, 1969.', kind: 'photograph', date: '20 July 1969', credit: 'NASA/JSC · Neil Armstrong', classification: 'Surface photograph' },
  'lunar-roving-vehicle': { nasaId: 'as15-85-11451', localSrc: '/media/machines/nasa-as15-85-11451.jpg', label: 'David Scott and the lunar rover at Hadley Rille, Apollo 15, July 31, 1971.', kind: 'photograph', date: '31 July 1971', credit: 'NASA/JSC · James Irwin', classification: 'Surface photograph' },
  'viking-1': { nasaId: 'PIA09703', localSrc: '/media/machines/nasa-PIA09703.jpg', label: 'Viking lander model photographed on display, not on Mars.', kind: 'photograph', credit: 'NASA/JPL', classification: 'Photograph of a display model' },
  opportunity: { nasaId: 'PIA17759', localSrc: '/media/machines/nasa-PIA17759.jpg', label: 'Opportunity self-portrait assembled from January 2014 images.', kind: 'photograph', credit: 'NASA/JPL', classification: 'Photographic mosaic' },
  ingenuity: { nasaId: 'PIA23882', localSrc: '/media/machines/nasa-PIA23882.jpg', label: 'Ingenuity flight model photographed on Earth before the mission.', kind: 'photograph', credit: 'NASA/JPL', classification: 'Pre-mission photograph' },
  'pioneer-10': { nasaId: 'ARC-1973-AC73-9019', localSrc: '/media/machines/nasa-ARC-1973-AC73-9019.jpg', label: 'Final assembly of Pioneer 10 at TRW on Earth.', kind: 'photograph', credit: 'NASA/ARC', classification: 'Pre-mission photograph' },
  ...Object.fromEntries(expandedEntries.map(entry => [entry.id, expansionImage(entry, 0)])),
} satisfies Record<string, MachineImage>
