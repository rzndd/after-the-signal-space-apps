import { expandedEntries } from './expandedMissions.ts'
/** Discussion prompts are editorial; the mission facts remain in machines.ts. */
export const learning: Record<string, { legacy: string; question: string; answer: string }> = {
  ...Object.fromEntries(expandedEntries.map(entry => [entry.id, { legacy: entry.legacy, question: 'What can this mission still teach us?', answer: entry.science }])),
  'apollo-11-eagle': { legacy: 'A departure can leave a scientific legacy.', question: 'Why leave half a spacecraft behind?', answer: 'The descent stage had finished its job. Using it as a launch pad let the astronauts return with less mass. The nearby reflector gave scientists another way to study the Moon.' },
  'lunar-roving-vehicle': { legacy: 'Mobility changed the questions astronauts could ask.', question: 'How can a buggy help us understand the Moon?', answer: 'It lets astronauts visit more places and collect samples from different landscapes. Those samples connect a rock to the place where it formed.' },
  'viking-1': { legacy: 'An uncertain result can inspire a better experiment.', question: 'Does a surprising soil reaction prove there is life?', answer: 'No. Non-living chemistry can also produce reactions. Scientists compare several experiments and keep testing other explanations.' },
  opportunity: { legacy: 'A silent rover still leaves evidence of a wetter Mars.', question: 'What can a rock tell us about water that is gone?', answer: 'Its minerals and layers preserve clues about how it formed. Opportunity found evidence that liquid water had changed parts of the Martian surface.' },
  ingenuity: { legacy: 'A small test can open a new way to explore.', question: 'Is a grounded helicopter still a success?', answer: 'Yes. Ingenuity demonstrated powered, controlled flight on Mars. Its 72 flights gave engineers experience that future aircraft can build on.' },
  'pioneer-10': { legacy: 'Our ability to predict motion reaches beyond our radio contact.', question: 'How can a map show a spacecraft we cannot hear?', answer: 'Horizons calculates an estimated trajectory. The displayed distance is a model prediction, not a new radio measurement from Pioneer 10.' },
}
