import { machines } from './machines.ts'
export const missionLabels: Record<string, { state: string; reason: string; legacy: string }> = Object.fromEntries(
  machines.map((machine) => [machine.id, { state: machine.statusLabel, reason: machine.endReason, legacy: machine.tagline }]),
)
