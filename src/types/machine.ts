export type BodyId = 'moon' | 'mars' | 'deep-space'
export type Mode = 'kids' | 'deep'
export type MachineStatus = 'parked' | 'silent' | 'grounded' | 'drifting'

/** Position on a map, as 0..1 fractions of the map width / height. */
export interface MapPoint {
  x: number
  y: number
  label: string
}

export interface Fact {
  label: string
  value: string
}

export interface MachineImage {
  /** NASA Image and Video Library id, e.g. "PIA23178". */
  nasaId: string
  /** Project-supplied local asset used when a curated cover must appear without an API round-trip. */
  localSrc?: string
  credit?: string
  classification?: string
  /** One plain sentence saying what the picture shows. */
  label: string
  /** Editorial classification checked against the NASA record. */
  kind?: 'photograph' | 'illustration' | 'map'
  /** Verified capture/event date. Omit when uncertain; never infer from catalog ingestion. */
  date?: string
  /** What to examine, and what the image does not establish. */
  lookFor?: string
}

export interface Source {
  label: string
  url: string
}

export interface Machine {
  id: string
  name: string
  body: BodyId
  /** Actual destination within a broad exploration group. */
  destination?: string
  /** One short line used as the story title. */
  headline: string
  tagline: string
  years: string
  status: MachineStatus
  statusLabel: string
  /** Concise, sourced explanation of why the machine was left, stopped, or became unable to operate. */
  endReason: string
  /** Where it sits on the map (several points for the three rovers). */
  points: MapPoint[]
  /** First-person story, short paragraphs for ages ~8-12. */
  kids: string[]
  /** First-person story with more detail. */
  deep: string[]
  facts: Fact[]
  /** Optional extra note shown only in deep mode. */
  note?: string
  /** Photos and maps from the NASA Image and Video Library, each picked and checked by hand. */
  images: MachineImage[]
  /** The photo shown on the machine's card on the home screen. */
  cover: MachineImage & { position?: string }
  sources: Source[]
}
