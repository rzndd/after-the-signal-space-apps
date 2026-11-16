import { useCallback, useState } from 'react'
import type { Mode } from '../types/machine'

const KEY = 'abnf-mode'

function read(): Mode {
  try {
    return localStorage.getItem(KEY) === 'deep' ? 'deep' : 'kids'
  } catch {
    return 'kids'
  }
}

/** Kids / Deep-dive reading mode, remembered between visits when storage is available. */
export function useMode(): [Mode, (m: Mode) => void] {
  const [mode, setModeState] = useState<Mode>(read)
  const setMode = useCallback((m: Mode) => {
    setModeState(m)
    try {
      localStorage.setItem(KEY, m)
    } catch {
      /* ignore */
    }
  }, [])
  return [mode, setMode]
}
