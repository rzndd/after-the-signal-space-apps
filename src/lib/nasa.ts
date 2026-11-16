import type { MachineImage } from '../types/machine'

export interface NasaPhoto {
  url: string
  title: string
  credit: string
  nasaId: string
  date: string
  lookFor?: string
  kind: NonNullable<MachineImage['kind']>
  description: string
  pageUrl: string
  /** Our own one-line explanation of what the picture shows. */
  label: string
}

interface ImagesApiItem {
  data?: Array<{
    nasa_id?: string
    title?: string
    description?: string
    date_created?: string
    secondary_creator?: string
    center?: string
  }>
  links?: Array<{ href?: string; rel?: string; render?: string }>
}

export const imageCreditLabel = { photograph: 'Photo', illustration: 'Illustration', map: 'Annotated map' } as const

const DIRECT = 'https://images-api.nasa.gov/search'

function parse(json: unknown, image: MachineImage): NasaPhoto | null {
  const items = (json as { collection?: { items?: ImagesApiItem[] } })?.collection?.items ?? []
  const item = items.find((i) => i.data?.[0]?.nasa_id === image.nasaId) ?? items[0]
  const data = item?.data?.[0]
  const link = item?.links?.find((l) => l.render === 'image' && l.href)
  if (!data?.nasa_id || !link?.href) return null
  return {
    url: link.href.replace(/^http:/, 'https:'),
    title: data.title ?? data.nasa_id,
    credit: data.secondary_creator ?? data.center ?? 'NASA',
    nasaId: data.nasa_id,
    date: image.date ?? '',
    lookFor: image.lookFor,
    kind: image.kind ?? 'photograph',
    description: (data.description ?? '').slice(0, 280),
    pageUrl: `https://images.nasa.gov/details/${encodeURIComponent(data.nasa_id)}`,
    label: image.label,
  }
}

async function getJson(url: string, signal?: AbortSignal): Promise<unknown | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.any([...(signal ? [signal] : []), AbortSignal.timeout(8000)]) })
    return res.ok ? await res.json() : null
  } catch {
    return null
  }
}

function cacheGet(key: string): NasaPhoto | null {
  try {
    const raw = sessionStorage.getItem(key)
    return raw ? (JSON.parse(raw) as NasaPhoto) : null
  } catch {
    return null
  }
}

function cacheSet(key: string, photo: NasaPhoto) {
  try {
    sessionStorage.setItem(key, JSON.stringify(photo))
  } catch {
    /* storage may be blocked; ignore */
  }
}

/** Loads one hand-picked NASA image by id. Tries our /api proxy first, then NASA directly. */
export async function fetchNasaImage(image: MachineImage, signal?: AbortSignal): Promise<NasaPhoto | null> {
  const key = `nasa-image:${image.nasaId}`
  const cached = cacheGet(key)
  if (cached) return { ...cached, label: image.label, date: image.date ?? '', lookFor: image.lookFor, kind: image.kind ?? 'photograph' }

  const id = encodeURIComponent(image.nasaId)
  for (const url of [`/api/nasa-images?nasa_id=${id}`, `${DIRECT}?nasa_id=${id}&media_type=image`]) {
    const photo = parse(await getJson(url, signal), image)
    if (photo) {
      cacheSet(key, photo)
      return photo
    }
  }
  return null
}
