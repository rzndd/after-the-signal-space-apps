import { useSyncExternalStore } from 'react'
import { useA11y } from '../contexts/A11yContext'

const subscribe = (listener: () => void) => {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  query.addEventListener('change', listener)
  return () => query.removeEventListener('change', listener)
}
const snapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
export function useCalmMotion() {
  const { isSafeMode } = useA11y()
  const reduced = useSyncExternalStore(subscribe, snapshot, () => true)
  return isSafeMode || reduced
}
