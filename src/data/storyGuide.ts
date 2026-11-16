import { expandedEntries } from './expandedMissions.ts'
export const storySections = ['Why I went', 'How I worked', 'What I found', 'Why I stayed', 'What I leave us'] as const

export const missionStates: Record<string, { hardware: string; legacy: string }> = {
  ...Object.fromEntries(expandedEntries.map(entry => [entry.id, {hardware: entry.reason, legacy: entry.legacy}])),
  "apollo-11-eagle": {
    "hardware": "Descent stage inactive; left at Tranquility Base in 1969",
    "legacy": "The separate Apollo reflector still supports lunar laser ranging."
  },
  "lunar-roving-vehicle": {
    "hardware": "Three inactive vehicles parked after Apollo 15, 16 and 17",
    "legacy": "Their sample locations, photographs and traverse records remain useful."
  },
  "viking-1": {
    "hardware": "No contact since November 11, 1982; remains in Chryse Planitia",
    "legacy": "Archived observations still inform research; the tests did not confirm life."
  },
  "opportunity": {
    "hardware": "No contact since June 10, 2018; mission end announced in 2019",
    "legacy": "Rock measurements and route records preserve evidence of past water."
  },
  "ingenuity": {
    "hardware": "Grounded after rotor damage in January 2024; flight mission ended",
    "legacy": "Flight and navigation records inform future planetary aircraft."
  },
  "pioneer-10": {
    "hardware": "No signal received since January 23, 2003; continues along its trajectory",
    "legacy": "Archived measurements remain useful; displayed position is a model estimate."
  }
}

export const glossary = [
  ['Sol', 'A solar day on Mars: about 24 hours and 40 minutes.'],
  ['AU', 'Astronomical unit: about 150 million kilometres, roughly the average Earth–Sun distance.'],
  ['Orbit', 'A path followed around another object under gravity. Not every spacecraft stays in orbit.'],
  ['Reflector', 'An object that redirects light. Apollo retroreflectors send incoming laser light back toward its source.'],
  ['Evidence', 'Observations or measurements used to test an explanation. A clue can support an idea without proving every part of it.'],
] as const
