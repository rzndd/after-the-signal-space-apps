import { useEffect, useState } from 'react'
import { PIONEER_FALLBACK, type PioneerState } from '../../shared/horizons'
import { fetchPioneerState } from '../lib/pioneer'

/** Live Pioneer 10 distance; starts from the stored fallback so the counter is never empty. */
export function usePioneer(): PioneerState {
  const [state, setState] = useState<PioneerState>(PIONEER_FALLBACK)
  useEffect(() => {
    const ctrl = new AbortController()
    fetchPioneerState(ctrl.signal).then((s) => {
      if (!ctrl.signal.aborted) setState(s)
    })
    return () => ctrl.abort()
  }, [])
  return state
}
