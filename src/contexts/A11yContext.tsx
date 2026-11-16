import { createContext, useContext, useLayoutEffect, useMemo, useState, type ReactNode } from 'react'

interface A11ySettings {
  isSafeMode: boolean
  enableSafeMode: () => void
}

const A11yContext = createContext<A11ySettings | null>(null)

export function A11yProvider({ children }: { children: ReactNode }) {
  const [isSafeMode, setIsSafeMode] = useState(false)
  const value = useMemo(() => ({ isSafeMode, enableSafeMode: () => setIsSafeMode(true) }), [isSafeMode])

  // Set the CSS guard before painting, so enabling safety has no unsafe frame.
  useLayoutEffect(() => {
    const root = document.documentElement
    const previous = root.getAttribute('data-safe-mode')
    root.setAttribute('data-safe-mode', String(isSafeMode))
    return () => {
      if (previous === null) root.removeAttribute('data-safe-mode')
      else root.setAttribute('data-safe-mode', previous)
    }
  }, [isSafeMode])

  return <A11yContext.Provider value={value}>{children}</A11yContext.Provider>
}

export function useA11y() {
  const settings = useContext(A11yContext)
  if (!settings) throw new Error('useA11y must be used within A11yProvider')
  return settings
}

