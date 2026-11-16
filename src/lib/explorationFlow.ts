export const explorationDestinations = { map: '#explore', machines: '#machines' } as const
/** Leaving a recovered story never grants unearned unlimited power. */
export function explorationPhaseAfterExit(unlocked: boolean) { return unlocked ? 'free' : 'pausedArchive' }
