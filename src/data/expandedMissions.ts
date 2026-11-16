import type { BodyId, Machine, MachineImage } from '../types/machine'

type Entry = {
  id: string; name: string; body: BodyId; destination: string; year: number; eventDate: string; years: string;
  location: string; lat?: number; lon?: number; source: string; title: string; headline: string;
  voice: [string,string]; science: string; duration: string; reason: string; legacy: string; limit: string;
  photos: [string,string]; captions: [string,string]; kinds: [string,string]; credits: [string,string];
}

export const expandedEntries: Entry[] = [
  {
    id: 'surveyor-3', name: 'Surveyor 3', body: 'moon', destination: 'The Moon', year: 1967, eventDate: '1967-05-04', years: '1967',
    location: 'Oceanus Procellarum', lat: -3.016, lon: -23.418, source: 'https://science.nasa.gov/mission/surveyor-3/', title: 'SURVEYOR 3 — A VISITOR CAME BACK', headline: 'Someone came back for part of me.',
    voice: ['Before footprints, my scoop tested the ground. Could this soil carry the next generation of explorers?', 'My radio stopped in 1967. Two years later, Apollo 12 astronauts visited me and brought selected parts home. Most of me stayed.'],
    science: 'Surveyor tested lunar soil and soft-landing technology before Apollo. Returned hardware let engineers examine exposure to the lunar environment.',
    duration: 'Landed April 20, 1967; last contact May 4, 1967. Apollo 12 visited in November 1969.', reason: 'Contact ended after the first lunar night; the lander was not recovered as a whole.', legacy: 'A robotic landing became a site that people could revisit.', limit: 'The Apollo photograph was made in 1969, not during Surveyor’s active mission. Returned components are not evidence that the whole lander came home.',
    photos: ['as12-48-7121','as12-48-7110'], captions: ['Surveyor 3 photographed by the Apollo 12 crew on the Moon in November 1969.','Surveyor 3 footpad and surface sampler photographed during Apollo 12.'], kinds: ['Surface photograph','Surface photograph'], credits: ['NASA/JSC','NASA/JSC'],
  },
  {
    id: 'alsep', name: 'ALSEP scientific stations', body: 'moon', destination: 'The Moon', year: 1977, eventDate: '1977-09-30', years: '1969–1977',
    location: 'Apollo 12, 14, 15, 16 and 17 sites', lat: -3.012, lon: -23.422, source: 'https://www.nasa.gov/wp-content/uploads/static/history/alsj/HamishALSEP.html', title: 'ALSEP — LISTENING AFTER DEPARTURE', headline: 'The footsteps stopped. We kept listening.',
    voice: ['The astronauts went home. Our stations stayed to measure the Moon long after the landing sites became quiet.', 'In September 1977, Earth sent the shutdown commands. Our science did not vanish when the receivers stopped collecting it.'],
    science: 'Apollo 12, 14, 15, 16 and 17 left ALSEP stations. Seismic and other measurements investigated the lunar environment and interior. Passive laser reflectors are separate experiments.',
    duration: 'Deployed during 1969–1972; remaining active ALSEP instruments were commanded off September 30, 1977.', reason: 'NASA ended support operations and commanded the remaining active stations off.', legacy: 'Long-running measurements outlasted the crews’ visits.', limit: 'The photograph shows Apollo 12 hardware, not every station. A separate passive retroreflector does not need an operating ALSEP transmitter.',
    photos: ['as12-47-6918','as12-46-6813'], captions: ['Apollo 12 ALSEP central station, seismometer and ion detector on the lunar surface.','Alan Bean deploying the Apollo 12 lunar magnetometer, part of ALSEP.'], kinds: ['Surface photograph','Surface photograph'], credits: ['NASA/JSC','NASA/JSC'],
  },
  {
    id: 'viking-2', name: 'Viking 2 Lander', body: 'mars', destination: 'Mars', year: 1980, eventDate: '1980-04-12', years: '1976–1980',
    location: 'Utopia Planitia', lat: 47.64, lon: 134.29, source: 'https://science.nasa.gov/mission/viking-2/', title: 'VIKING 2 — ANOTHER PATCH OF MARS', headline: 'My horizon was different from my twin’s.',
    voice: ['My twin landed first. I settled on another plain, where rocks and seasonal frost gave us a different view of Mars.', 'I watched from one place for years. In April 1980 my lander mission ended; the measurements remained open to new questions.'],
    science: 'Viking 2 recorded surface images, weather and soil experiments at Utopia Planitia. Its biology results did not establish life on Mars.',
    duration: 'Landed September 3, 1976; NASA lists lander mission end as April 12, 1980.', reason: 'The lander stopped operating in April 1980. Its orbiter had ended operations separately in 1978.', legacy: 'Two landing sites gave scientists observations to compare.', limit: 'Visible frost does not establish organisms. NASA’s Viking project summary dates the last received data April 11; the mission catalog lists April 12 as the end of operations.',
    photos: ['PIA00573','PIA00396'], captions: ['Frost photographed at the Viking 2 landing site.','Viking 2’s first surface picture on Mars.'], kinds: ['Surface photograph','Surface photograph'], credits: ['NASA/JPL','NASA/JPL'],
  },
  {
    id: 'pioneer-11', name: 'Pioneer 11', body: 'deep-space', destination: 'Outbound solar-system trajectory', year: 1995, eventDate: '1995-11-24', years: '1973–1995',
    location: 'Outbound trajectory after Jupiter and Saturn flybys', source: 'https://science.nasa.gov/mission/pioneer-11/', title: 'PIONEER 11 — THE FIRST SATURN ENCOUNTER', headline: 'I went close enough to see the rings.',
    voice: ['Jupiter changed my course. Saturn became my next encounter: a world no spacecraft had examined up close before me.', 'By 1995, the conversation was ending. The final engineering data arrived in November. My plaque and my silent instruments kept travelling.'],
    science: 'Pioneer 11 flew past Saturn on September 1, 1979. It carries a plaque, as Pioneer 10 does. Neither probe is transmitting new mission data today.',
    duration: 'Launched April 6, 1973 UTC; mission operations ended September 1995; final engineering data November 24, 1995.', reason: 'Declining power and communications geometry ended usable contact.', legacy: 'The first close Saturn encounter helped prepare later exploration.', limit: 'The launch photograph is from Earth. The plaque image documents the shared Pioneer plaque design; it is not a photograph of Pioneer 11 in flight. No current distance is inferred from Pioneer 10.',
    photos: ['9139575','ARC-1972-AC72-1338'], captions: ['Atlas-Centaur launching the Pioneer G spacecraft, later named Pioneer 11.','The plaque design carried by Pioneer 10 and Pioneer 11, photographed on Earth.'], kinds: ['Launch photograph','Photograph of mission hardware'], credits: ['NASA/MSFC','NASA/ARC'],
  },
  {
    id: 'sojourner', name: 'Sojourner rover', body: 'mars', destination: 'Mars', year: 1997, eventDate: '1997-09-27', years: '1997',
    location: 'Ares Vallis / Pathfinder site', lat: 19.13, lon: -33.22, source: 'https://science.nasa.gov/mission/mars-pathfinder/', title: 'SOJOURNER — THE FIRST SMALL TRACKS', headline: 'Small wheels. A much larger beginning.',
    voice: ['I rolled down Pathfinder’s ramp into a landscape nobody had driven across before. Every nearby rock could become a new test.', 'Pathfinder was my link to Earth. When that link went quiet in September 1997, Earth could no longer hear what happened beside my wheels.'],
    science: 'Sojourner was the first rover to operate on Mars. Its instruments examined rocks and soil; Pathfinder relayed the rover’s data to Earth.',
    duration: 'Landed with Pathfinder July 4, 1997; last Pathfinder transmission September 27, 1997.', reason: 'Contact with Pathfinder was lost. The exact failure was not established; battery depletion and cold were suspected.', legacy: 'A small technology demonstration opened the way for larger Mars rovers.', limit: 'Loss of the lander relay does not reveal the exact moment the rover itself stopped. Its final wheel position is not asserted here.',
    photos: ['PIA01551','PIA01121'], captions: ['Newly deployed Sojourner rover on Mars, photographed by Pathfinder.','Pathfinder lander seen from the Sojourner rover.'], kinds: ['Surface photograph','Surface photograph'], credits: ['NASA/JPL','NASA/JPL'],
  },
  {
    id: 'near-shoemaker', name: 'NEAR Shoemaker', body: 'deep-space', destination: '433 Eros · asteroid surface', year: 2001, eventDate: '2001-02-28', years: '1996–2001',
    location: 'Surface of asteroid 433 Eros', source: 'https://science.nasa.gov/mission/near-shoemaker/', title: 'NEAR SHOEMAKER — AN ORBITER THAT LANDED', headline: 'Landing was not what I was built for.',
    voice: ['For a year I circled Eros, turning a distant point into a world of ridges, craters and measurements.', 'Then I descended. I survived a landing I had not been designed to make and sent data from the surface for about two more weeks.'],
    science: 'NEAR was the first spacecraft to orbit and land on an asteroid. It measured Eros’s shape, composition and gravity-related properties.',
    duration: 'Launched February 17, 1996; landed February 12, 2001; last contact February 28, 2001.', reason: 'The spacecraft remained on Eros; NASA attributes the final loss of contact to extreme cold.', legacy: 'An orbital survey became the first asteroid landing.', limit: 'The preparation photograph was taken on Earth. Images of Eros show the target, not a photograph of the spacecraft resting there.',
    photos: ['9701593','PIA02900'], captions: ['NEAR spacecraft undergoing preflight preparation at Kennedy Space Center.','Eros’s saddle region imaged by NEAR Shoemaker.'], kinds: ['Pre-mission photograph','Spacecraft image of asteroid terrain'], credits: ['NASA/MSFC','NASA/JPL/JHUAPL'],
  },
  {
    id: 'phoenix', name: 'Phoenix Mars Lander', body: 'mars', destination: 'Mars', year: 2008, eventDate: '2008-11-02', years: '2008',
    location: 'Northern plains / Green Valley', lat: 68.22, lon: -125.75, source: 'https://science.nasa.gov/mission/mars-phoenix/', title: 'PHOENIX — ICE UNDER THE SOIL', headline: 'The ground was hiding ice.',
    voice: ['I did not need wheels to find a new world. My arm reached beneath the northern soil and carried samples to my instruments.', 'Winter brought less sunlight. My last signal came in November 2008. The ice I examined became part of a record that Earth could keep.'],
    science: 'Phoenix confirmed water ice in Martian subsurface samples and detected perchlorate. Neither result was a discovery of living organisms.',
    duration: 'Landed May 25, 2008; last signal November 2, 2008.', reason: 'Diminishing seasonal sunlight and harsh northern winter ended solar-powered operations.', legacy: 'Direct sampling connected buried water ice with Martian soil chemistry.', limit: 'A picture under the lander provides context. Water identification depends on instrument measurements, not the appearance of a bright patch alone.',
    photos: ['KSC-07PD-1090','PIA11379'], captions: ['Phoenix lander inside its backshell during preparation on Earth.','The Martian surface underneath the Phoenix lander.'], kinds: ['Pre-mission photograph','Surface photograph'], credits: ['NASA/KSC','NASA/JPL-Caltech/University of Arizona/Max Planck Institute'],
  },
  {
    id: 'spirit', name: 'Spirit rover', body: 'mars', destination: 'Mars', year: 2010, eventDate: '2010-03-22', years: '2004–2010',
    location: 'Gusev Crater / Home Plate', lat: -14.57, lon: 175.47, source: 'https://science.nasa.gov/mission/mer-spirit/', title: 'SPIRIT — WHEN THE WHEELS STOPPED', headline: 'The ground held my wheels. Not my discoveries.',
    voice: ['For more than six years, another question could mean another drive. In 2009 soft soil held my wheels. My team tried to free me.', 'I became a stationary science platform, but could not reach the winter tilt my panels needed. My last contact came in March 2010.'],
    science: 'Minerals including goethite supplied evidence of ancient liquid water. The observations did not confirm life.',
    duration: 'Landed January 2004; last contact March 22, 2010; mission declared complete May 2011.', reason: 'Trapped in soil without the desired winter tilt, Spirit most probably lost contact because of excessive cold.', legacy: 'Mineral measurements and traverse records preserve an investigation of ancient water.', limit: 'The McMurdo self-portrait dates to 2006; it predates the final entrapment. The route map shows an earlier part of the mission.',
    photos: ['PIA16442','PIA05581'], captions: ['Spirit in the McMurdo panorama, shown in polar projection in 2006.','Spirit’s route from its landing site toward Bonneville, through sol 72.'], kinds: ['Photographic mosaic / polar projection','Traverse map over orbital imagery'], credits: ['NASA/JPL-Caltech/Cornell','NASA/JPL/Cornell/ASU'],
  },
  {
    id: 'kepler', name: 'Kepler Space Telescope', body: 'deep-space', destination: 'Earth-trailing heliocentric orbit', year: 2018, eventDate: '2018-10-30', years: '2009–2018',
    location: 'Orbit around the Sun, trailing Earth', source: 'https://science.nasa.gov/mission/kepler/', title: 'KEPLER — WORLDS IN THE DIMMING', headline: 'I watched starlight for worlds I could not visit.',
    voice: ['A star grew slightly dimmer, then bright again. Repeating patterns helped my team find planets too distant for me to visit.', 'In 2018 my fuel ran out. I remained in my orbit around the Sun. The light curves had already reached Earth, where the search could continue.'],
    science: 'Kepler searched for transits: repeated drops in stellar brightness. Candidate signals require tests against other explanations.',
    duration: 'Launched March 2009; retired October 30, 2018 after Kepler and K2 operations.', reason: 'Fuel needed for further science operations was exhausted. Kepler remains in a safe Earth-trailing solar orbit.', legacy: 'Public stellar brightness records support planet discoveries after retirement.', limit: 'These photographs show preparation on Earth. A transit candidate alone is not a confirmed planet, and the telescope is not orbiting Mars.',
    photos: ['PIA11733','PIA11188'], captions: ['Kepler spacecraft at Ball Aerospace on Earth before launch.','Kepler in a clean room at Ball Aerospace before its mission.'], kinds: ['Pre-mission photograph','Pre-mission photograph'], credits: ['NASA/JPL-Caltech/Ball','NASA/JPL-Caltech/Ball Aerospace'],
  },
  {
    id: 'dawn', name: 'Dawn spacecraft', body: 'deep-space', destination: 'Ceres · unpowered orbit', year: 2018, eventDate: '2018-11-01', years: '2007–2018',
    location: 'Orbit around dwarf planet Ceres, in the asteroid belt', source: 'https://science.nasa.gov/mission/dawn/toolkit/end-of-mission/', title: 'DAWN — TWO WORLDS, ONE FINAL ORBIT', headline: 'My last destination became my resting orbit.',
    voice: ['Ion propulsion carried me into orbit around Vesta, then onward to Ceres. Two worlds could be studied by the same spacecraft.', 'My attitude-control fuel ran out in 2018. I could no longer keep doing science, but my final orbit kept me away from Ceres’s surface.'],
    science: 'Dawn orbited Vesta and Ceres. Its measurements investigated early solar-system bodies; the final orbit was chosen to reduce contamination risk.',
    duration: 'Launched September 2007; Ceres arrival March 2015; mission end announced November 1, 2018.', reason: 'Hydrazine exhaustion prevented attitude control needed for communications and power management.', legacy: 'One spacecraft compared two major bodies in the asteroid belt.', limit: 'The final Ceres orbit was designed to avoid impact for at least 20 years, likely longer. It is not guaranteed to last forever. The terrain image does not show the spacecraft.',
    photos: ['KSC-07PD-0864','PIA20309'], captions: ['Dawn spacecraft in a clean room at Astrotech before launch.','Tupo Crater on Ceres, imaged by Dawn.'], kinds: ['Pre-mission photograph','Orbital photograph'], credits: ['NASA/KSC','NASA/JPL-Caltech/UCLA/MPS/DLR/IDA'],
  },
  {
    id: 'insight', name: 'InSight Lander', body: 'mars', destination: 'Mars', year: 2022, eventDate: '2022-12-15', years: '2018–2022',
    location: 'Elysium Planitia', lat: 4.5, lon: 135.62, source: 'https://www.nasa.gov/missions/insight/nasa-retires-insight-mars-lander-mission-after-years-of-science/', title: 'INSIGHT — LISTENING THROUGH THE DUST', headline: 'I listened to a planet move.',
    voice: ['I stayed still so my seismometer could listen. Marsquakes sent waves through a planet whose interior we could not see.', 'Dust gathered on my solar panels. Less light became less power. In December 2022 the instruments fell quiet, after recording 1,319 marsquakes.'],
    science: 'Seismic waves constrained Mars’s crust, mantle and core. InSight’s heat probe did not reach its planned depth; not every experiment succeeded.',
    duration: 'Landed November 26, 2018; last contact December 15, 2022; mission end December 21, 2022.', reason: 'Dust-covered solar panels could no longer supply enough energy for operations.', legacy: 'The seismic archive opened a view of the Martian interior.', limit: 'The final selfie was taken April 24, 2022, months before the final contact. A dusty photograph alone does not measure electrical output.',
    photos: ['PIA22876','PIA25287'], captions: ['InSight’s first full selfie, a mosaic taken on Mars in December 2018.','InSight’s final selfie in April 2022, showing accumulated dust.'], kinds: ['Photographic mosaic','Photographic mosaic'], credits: ['NASA/JPL-Caltech','NASA/JPL-Caltech'],
  },
]

export function expansionImage(entry: Entry, index: 0 | 1): MachineImage {
  return { nasaId: entry.photos[index], localSrc: '/media/machines/nasa-' + entry.photos[index] + '.jpg', label: entry.captions[index], kind: entry.kinds[index].includes('map') ? 'map' : 'photograph', credit: entry.credits[index], classification: entry.kinds[index] }
}
export const expandedMachines: Machine[] = expandedEntries.map(entry => ({
  id: entry.id, name: entry.name, body: entry.body, destination: entry.destination,
  headline: entry.headline, tagline: entry.legacy, years: entry.years,
  status: entry.body === 'deep-space' && entry.id !== 'near-shoemaker' ? 'drifting' : 'silent',
  statusLabel: entry.location + ' · inactive', endReason: entry.reason,
  points: entry.id === 'alsep' ? [
    {lat:-3.012,lon:-23.422,site:'Apollo 12'}, {lat:-3.644,lon:-17.477,site:'Apollo 14'},
    {lat:26.134,lon:3.629,site:'Apollo 15'}, {lat:-8.975,lon:15.498,site:'Apollo 16'},
    {lat:20.19,lon:30.77,site:'Apollo 17'},
  ].map(site => ({x:(site.lon+60)/120,y:(45-site.lat)/90,label:site.site+' ALSEP station'})) : entry.lat === undefined || entry.lon === undefined ? [] : [{
    x: entry.body === 'moon' ? (entry.lon + 60) / 120 : (entry.lon + 180) / 360,
    y: entry.body === 'moon' ? (45 - entry.lat) / 90 : (90 - entry.lat) / 180,
    label: entry.id === 'alsep' ? 'Apollo 12 ALSEP representative site; other stations at Apollo 14–17' : entry.location,
  }],
  kids: [entry.voice[0], entry.science, entry.voice[1], entry.reason, entry.legacy],
  deep: [entry.duration, entry.science, entry.reason, entry.limit, entry.legacy],
  facts: [{label: 'Location',value: entry.location},{label: 'Mission record',value: entry.duration},{label: 'Why it stopped',value: entry.reason},{label: 'Scientific legacy',value: entry.legacy}],
  note: entry.limit, cover: expansionImage(entry,0), images: [expansionImage(entry,1)],
  sources: [{label: 'NASA mission record',url: entry.source},{label:'NASA image record',url:'https://images.nasa.gov/details/'+entry.photos[1]}],
}))
export const expandedChapters = expandedEntries.map(entry => ({
  id: entry.id === 'spirit' ? 'spirit_last_contact' : entry.id + '_archive', machineId: entry.id,
  year: entry.year, eventDate: entry.eventDate, title: entry.title, voice: entry.voice,
  tech: '[ SCIENCE: ' + entry.science + ' ]', duration: entry.duration, cause: entry.reason, legacy: entry.legacy,
}))
