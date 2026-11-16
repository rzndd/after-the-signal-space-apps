import { expandedEntries } from './expandedMissions.ts'
const detail = (id, caption, kind) => ({ src: '/media/machines/nasa-' + id + '.jpg', caption, kind, source: 'https://images.nasa.gov/details/' + id })
export const sceneMedia = {
  ...Object.fromEntries(expandedEntries.map(entry => [entry.id, detail(entry.photos[1], entry.captions[1], entry.kinds[1] + ' · ' + entry.credits[1])])),
  'apollo-11-eagle': detail('PIA12909', 'Apollo 11 landing site from lunar orbit, imaged by LRO. Equipment is tiny at this scale.', 'Orbital photograph · NASA/LRO'),
  'lunar-roving-vehicle': detail('S72-00147', 'Descartes landing area with Apollo 16 traverse routes and stops. Annotations describe exploration planning.', 'Annotated orbital image · NASA/JSC'),
  'viking-1': detail('PIA00381', 'Soil and part of a Viking 1 footpad after landing on July 20, 1976. The appearance of rocks does not confirm life.', 'Surface photograph · NASA/JPL'),
  'pioneer-10': detail('ARC-1972-AC72-1338', 'The Pioneer 10 plaque: a message about its origin, not a device that receives replies.', 'Photograph of the plaque · NASA/ARC'),
  opportunity: detail('PIA23178', 'Opportunity’s 45.16 km route to Perseverance Valley. The end marks last contact on June 10, 2018.', 'Traverse map over orbital mosaic · NASA/JPL/MSSS'),
  ingenuity: detail('PIA25080', 'Possible Ingenuity routes toward the Jezero delta in March 2022. These are planned alternatives, not a record of every completed flight.', 'Annotated orbital image · NASA/JPL'),
}
