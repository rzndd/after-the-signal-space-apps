import { useCallback, useEffect, useState } from 'react'
import type { Machine } from '../types/machine'
import { fetchNasaImage, type NasaPhoto } from '../lib/nasa'

export type PhotosState = { status: 'loading' } | { status: 'done'; photos: NasaPhoto[] } | { status: 'error' }

type Inner =
  | { kind: 'idle' }
  | { kind: 'ok'; id: string; photos: NasaPhoto[] }
  | { kind: 'err'; id: string }

/** Loads every hand-picked image of a machine. Images that fail are skipped, never shown as empty boxes. */
export function useNasaPhotos(machine: Machine | null): PhotosState & { retry: () => void } {
  const [inner, setInner] = useState<Inner>({ kind: 'idle' })
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!machine) return
    const ctrl = new AbortController()
    const id = machine.id
    Promise.all(machine.images.map((img) => fetchNasaImage(img, ctrl.signal)))
      .then((all) => {
        if (ctrl.signal.aborted) return
        const photos = all.filter((p): p is NasaPhoto => p !== null)
        if (photos.length === 0 && machine.images.length > 0) setInner({ kind: 'err', id })
        else setInner({ kind: 'ok', id, photos })
      })
      .catch(() => { if (!ctrl.signal.aborted) setInner({ kind: 'err', id }) })
    return () => ctrl.abort()
  }, [machine, tick])

  const retry = useCallback(() => setTick((t) => t + 1), [])

  if (machine && inner.kind === 'err' && inner.id === machine.id) return { status: 'error', retry }
  if (machine && inner.kind === 'ok' && inner.id === machine.id) return { status: 'done', photos: inner.photos, retry }
  return { status: 'loading', retry }
}
