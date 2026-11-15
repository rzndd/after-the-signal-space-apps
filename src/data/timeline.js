import { imageCatalog } from './imageCatalog.ts'
import { machines } from './machines.ts'
import { expandedChapters } from './expandedMissions.ts'

// Chronological by the event described, not by launch date. Voices are imagined.
/** @type {{ type: 'prompt', text: string, expected: string }} */
export const prologuePrompt = { type: 'prompt', text: '> THERMAL ALERT. TYPE [ IGNITE ]', expected: 'IGNITE' }
const chapters = [
  {
    "id": "apollo11_descent",
    "machineId": "apollo-11-eagle",
    "year": 1969,
    "title": "EAGLE — BUILT TO STAY",
    "voice": [
      "The next launch would happen from my back. First I had to bring two astronauts safely to the Moon.",
      "My upper stage rose into lunar orbit. My landing engine and legs stayed at Tranquility Base. I was built to make that separation possible."
    ],
    "tech": "[ ENGINEERING: Separating the stages avoided lifting the descent engine and landing gear back into orbit. ]",
    "duration": "Landed July 20, 1969. The ascent stage departed about 21.5 hours later.",
    "cause": "The descent stage was designed to remain at Tranquility Base.",
    "legacy": "The two-stage design enabled departure. Separate experiments placed nearby extended the scientific value of the landing."
  },
  {
    "id": "lrv_parked",
    "machineId": "lunar-roving-vehicle",
    "year": 1972,
    "title": "LUNAR ROVERS — A WIDER HORIZON",
    "voice": [
      "We arrived folded up. Once our wheels touched the Moon, a distant rock could become the next stop, instead of the edge of a walking route.",
      "Three crews drove us across three landing sites. We stayed parked; samples and their locations travelled home. Our tracks ended. Their investigation did not."
    ],
    "tech": "[ EVIDENCE: Sample labels, locations and observations connect laboratory measurements to their geological setting. ]",
    "duration": "Apollo 15 in 1971; Apollo 16 and 17 in 1972. About 28, 27 and 36 km driven.",
    "cause": "Returning the vehicles was outside the mission design. Their batteries were not rechargeable.",
    "legacy": "Mobility helped crews reach and document more geological settings."
  },
  {
    "id": "viking_last_contact",
    "machineId": "viking-1",
    "year": 1982,
    "title": "VIKING 1 — AN OPEN QUESTION",
    "voice": [
      "I could not drive to another rock. I had an arm, a laboratory and a question: could this soil hold evidence of life?",
      "My results demanded more questions, not a simple yes. A faulty command ended contact in 1982. It did not turn uncertainty into an answer."
    ],
    "tech": "[ LIMIT: A chemical reaction alone does not confirm life. Competing explanations must be tested. ]",
    "duration": "Landed July 20, 1976. Last contact November 11, 1982.",
    "cause": "A faulty command interrupted communications; attempts to restore contact failed.",
    "legacy": "Images, weather records and soil experiments helped refine later investigations. They did not confirm life or rule it out across Mars."
  },
  {
    "id": "pioneer_last_signal",
    "machineId": "pioneer-10",
    "year": 2003,
    "title": "PIONEER 10 — BEYOND THE RADIO",
    "voice": [
      "Beyond the asteroid belt, Jupiter was waiting. I crossed first; my measurements gave the spacecraft behind me a better idea of what lay ahead.",
      "In 2003 my last signal reached Earth. My electrical power had declined. The radio conversation ended; the journey through space continued."
    ],
    "tech": "[ MODEL: A calculated trajectory is not a fresh radio measurement. Distance estimates use a stated reference date. ]",
    "duration": "Launched March 2, 1972; Jupiter flyby December 1973; last signal January 23, 2003.",
    "cause": "Declining generator power limited transmission.",
    "legacy": "Measurements of Jupiter's radiation and magnetic environment supported later missions."
  },
  {
    "id": "spirit_last_contact",
    "optional": true,
    "year": 2010,
    "title": "SPIRIT — WHEN THE WHEELS STOPPED",
    "voice": [
      "For more than six years, the next question could mean another drive. In 2009, soft soil held my wheels. My team tried to free me.",
      "I became a stationary science platform. The winter tilt my panels needed could not be reached. My last contact came on March 22, 2010."
    ],
    "tech": "[ DISCOVERY: Minerals such as goethite supplied evidence of ancient liquid water, not a confirmed discovery of life. ]",
    "duration": "January 2004 to March 2010. Mission declared complete in May 2011.",
    "cause": "Spirit was trapped and could not achieve the desired winter tilt. NASA identifies excessive cold as the most probable cause of the final loss of contact.",
    "legacy": "Archived mineral measurements and geological observations remain available for study."
  },
  {
    "id": "opportunity_last_contact",
    "machineId": "opportunity",
    "year": 2018,
    "title": "OPPORTUNITY — THE DARKENING SKY",
    "voice": [
      "Ninety Martian days was the plan. I kept going for more than fourteen Earth years. Forty-five kilometres of tracks led past rocks that recorded ancient water.",
      "Then the dust hid the Sun. The light that powered my work faded. On June 10, 2018, I sent my last signal. Earth kept calling."
    ],
    "tech": "[ ENERGY: Atmospheric opacity, Tau, rose to about 10.8. Less sunlight reached the solar panels. ]",
    "duration": "January 2004 to June 2018. Mission end announced February 13, 2019.",
    "cause": "A planet-encircling dust storm reduced solar power and interrupted communication.",
    "legacy": "Layered rocks and hematite-rich spherules helped reconstruct ancient watery environments, without confirming life."
  },
  {
    "id": "ingenuity_grounded",
    "machineId": "ingenuity",
    "year": 2024,
    "title": "INGENUITY — PROOF OF FLIGHT",
    "voice": [
      "Earth could send a flight plan, but nobody there could catch my balance with a joystick. My sensors and software had to fly me.",
      "Five flights were planned. I completed seventy-two. A damaged rotor ended my flying, but the next aircraft will begin with something I proved possible."
    ],
    "tech": "[ CONTROL: Flight plans came from Earth; onboard sensors and software executed them despite communication delays. ]",
    "duration": "First flight April 19, 2021; last flight January 18, 2024. About 129 minutes and 17 km flown.",
    "cause": "Rotor damage after flight 72 prevented further flight; this does not mean every electronic subsystem immediately stopped.",
    "legacy": "Flight, navigation and control records inform future planetary aircraft."
  }
]

// Replace the former story-only Spirit entry with the complete mission record.
const eventDates = {apollo11_descent:'1969-07-21', lrv_parked:'1972-12-14', viking_last_contact:'1982-11-11', pioneer_last_signal:'2003-01-23', opportunity_last_contact:'2018-06-10', ingenuity_grounded:'2024-01-18'}
export const timeline = [...chapters.filter(chapter => chapter.id !== 'spirit_last_contact'), ...expandedChapters]
  .sort((a,b) => (a.eventDate ?? eventDates[a.id]).localeCompare(b.eventDate ?? eventDates[b.id]))
  .map((chapter) => {
  const machine = machines.find((item) => item.id === chapter.machineId)
  const image = imageCatalog[chapter.machineId]
  return {
    id: chapter.id, machineId: chapter.machineId, year: chapter.year, eventDate: chapter.eventDate ?? eventDates[chapter.id], title: chapter.title, optional: false,
    bgImage: image?.localSrc ?? '/media/machines/spirit-pia16442.jpg',
    imageCaption: image ? image.label + ' ' + image.credit : 'Spirit in the McMurdo panorama, April–October 2006. Polar-projection mosaic. NASA/JPL-Caltech/Cornell · PIA16442.',
    imageSource: 'https://images.nasa.gov/details/' + (image?.nasaId ?? 'PIA16442'),
    imageKind: image?.classification ?? 'Photographic mosaic',
    memorial: { duration: chapter.duration, cause: chapter.cause, legacy: chapter.legacy },
    sources: machine?.sources ?? [{ label: 'NASA: Spirit', url: 'https://science.nasa.gov/mission/mer-spirit/' }],
    lines: [
      { type: 'sys', text: '> ARCHIVE: ' + chapter.year + '. ' + chapter.title },
      { type: 'narrative', text: chapter.voice[0] },
      { type: 'tech', text: chapter.tech },
      { type: 'narrative', text: chapter.voice[1] },
    ],
  }
})
export default timeline
