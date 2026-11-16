import { expandedEntries, expansionImage } from './expandedMissions.ts'
export interface LastRecordEntry {
  title: string
  image: { src: string; alt: string; caption: string; credit: string; kind: string; source: string }
  explanation: string
  detail: string
  limit: string
  source: { label: string; url: string }
}

const image = (id: string, alt: string, caption: string, credit: string, kind: string) => ({
  src: '/media/machines/nasa-' + id + '.jpg', alt, caption, credit, kind,
  source: 'https://images.nasa.gov/details/' + id,
})

/** Curated records, not a claim that every image was the mission's last photograph. */
export const lastRecords: Record<string, LastRecordEntry> = {
  ...Object.fromEntries(expandedEntries.map(entry => {
    const photo = expansionImage(entry, 1)
    return [entry.id, {
      title: entry.legacy,
      image: {src: photo.localSrc!, alt: photo.label, caption: photo.label, credit: photo.credit!, kind: photo.classification!, source: 'https://images.nasa.gov/details/' + photo.nasaId},
      explanation: entry.science, detail: entry.reason + ' ' + entry.duration, limit: entry.limit,
      source: {label: 'NASA mission record', url: entry.source},
    }]
  })),
  'apollo-11-eagle': {
    title: 'Leaving half behind was the plan.',
    image: image('PIA12909', 'LRO orbital view of the Apollo 11 landing site.',
      'Tranquility Base seen from lunar orbit. The landing hardware is tiny at this scale.',
      'NASA/GSFC/Arizona State University', 'Orbital photograph'),
    explanation: 'Eagle had two stages. The lower stage landed the crew; the upper stage launched them back into lunar orbit. The landing engine and legs stayed on the Moon because their work was complete.',
    detail: 'The descent stage served as the launch platform for ascent. Leaving used landing hardware behind avoided lifting its mass back into orbit. The laser reflector deployed nearby was a separate experiment, not part of the descent stage.',
    limit: 'This later orbital image documents the site. It does not show the moment the stages separated.',
    source: { label: 'Apollo 11 lunar module record', url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C' },
  },
  'lunar-roving-vehicle': {
    title: 'A parked rover. A much wider field of science.',
    image: image('S72-00147', 'Annotated map of planned Apollo 16 traverses near Descartes.',
      'Apollo 16 traverse planning map: routes and stops around the Descartes landing area.',
      'NASA/JSC', 'Annotated orbital image / planning map'),
    explanation: 'The lunar rovers let astronauts reach more places and carry samples back to the lander. The vehicles stayed, but the rocks and their carefully recorded locations came home. Those records help scientists interpret the samples.',
    detail: 'A sample needs context: its collection location, nearby geology and crew observations. Apollo 15, 16 and 17 used rovers to extend fieldwork beyond walking distance. This planning map illustrates that reach; completed routes must be checked against the mission traverse records.',
    limit: 'A planned route is not proof that every marked stop was visited or sampled.',
    source: { label: 'NASA lunar rover mission record', url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html' },
  },
  'viking-1': {
    title: 'A surface reached. A question left open.',
    image: image('PIA00381', 'Viking 1 footpad and Martian soil after landing.',
      'Viking 1 photographed its footpad and the nearby surface on July 20, 1976.',
      'NASA/JPL', 'Surface photograph'),
    explanation: 'Viking brought a laboratory to this soil. Its experiments produced results that scientists had to compare with non-living chemical explanations. A reaction was an observation to investigate, not a confirmed discovery of life.',
    detail: 'The surface photograph establishes the setting, not the experimental result. The biology experiments and chemical measurements must be interpreted together. Viking did not confirm life, and one landing site could not settle the question for all of Mars.',
    limit: 'The appearance of this soil cannot tell us whether organisms were present.',
    source: { label: 'NASA: Viking results revisited', url: 'https://astrobiology.nasa.gov/news/viking-results-revisited/' },
  },
  'pioneer-10': {
    title: 'The radio stopped. Motion did not.',
    image: image('ARC-1972-AC72-1338', 'Photograph of the plaque carried by Pioneer 10.',
      'The Pioneer plaque, photographed on Earth: a message about where the spacecraft came from.',
      'NASA/ARC', 'Photograph of mission hardware'),
    explanation: 'Pioneer 10 last sent a signal on January 23, 2003. It kept travelling after its radio fell silent. Its position can be calculated with a trajectory model; that calculation is not a new message from the probe.',
    detail: 'The exploration map uses NASA/JPL Horizons with a stated reference time and the Sun as its origin. The last received signal and a computed position answer different questions. The plaque pictured here is a physical message, not a transmitter or a record of the probe’s current condition.',
    limit: 'A trajectory estimate does not reveal whether the internal electronics still work.',
    source: { label: 'NASA: Pioneer 10 mission record', url: 'https://science.nasa.gov/mission/pioneer-10/' },
  },
  opportunity: {
    title: 'The transmission that did not finish.',
    image: image('PIA22929', 'Dark, noisy, incomplete Pancam image transmitted by Opportunity on June 10, 2018.',
      'June 10, 2018 · sol 5,111. An incomplete full-frame Pancam image transmitted during the dust storm.',
      'NASA/JPL-Caltech/Cornell/ASU', 'Incomplete surface-camera transmission'),
    explanation: 'Opportunity pointed its camera toward the Sun through a solar filter, but dust hid the light. The bright specks are camera noise. The black lower area marks the unfinished transmission. Without enough sunlight, the solar-powered rover fell silent.',
    detail: 'NASA identifies this as the last partial full-frame image transmitted. It was not the last image taken: thumbnails of images captured about three minutes later were also returned. Atmospheric opacity, Tau, rose to about 10.8. The mission’s rock and mineral records still preserve evidence of ancient watery environments.',
    limit: 'Noise and missing pixels are features of the received record, not stars or a simulated glitch. The image alone cannot diagnose every failed component.',
    source: { label: 'NASA: Opportunity’s last message', url: 'https://science.nasa.gov/resource/opportunitys-last-message/' },
  },
  ingenuity: {
    title: 'A shadow revealed the damage.',
    image: image('PIA26243', 'Ingenuity image showing the shadow of a damaged rotor blade.',
      'After flight 72 on January 18, 2024: the shadow of a rotor blade damaged during landing.',
      'NASA/JPL-Caltech', 'Surface photograph / rotor-blade shadow'),
    explanation: 'The damaged blade appears here as a shadow on the ground. Rotor damage ended Ingenuity’s flying after 72 flights. The aircraft had already proved that powered, controlled flight on Mars was possible.',
    detail: 'Ingenuity used onboard sensors and software to fly plans prepared on Earth. Radio delays prevented a pilot from correcting every movement in real time. Images after the final landing helped engineers investigate the damage; grounded did not mean every electronic subsystem immediately stopped.',
    limit: 'This shadow documents damage. By itself it does not reconstruct the complete accident sequence.',
    source: { label: 'NASA: the damaged rotor-blade shadow', url: 'https://science.nasa.gov/photojournal/ingenuity-spots-the-shadow-of-its-damaged-rotor-blade/' },
  },
}

