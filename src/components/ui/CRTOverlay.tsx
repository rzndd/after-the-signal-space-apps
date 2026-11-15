import styles from './CRTOverlay.module.css'
import { useA11y } from '../../contexts/A11yContext'

/** Decorative CRT treatment. It never receives pointer events or changes app state. */
export function CRTOverlay({ matrix = false }: { matrix?: boolean }) {
  const { isSafeMode } = useA11y()
  if (isSafeMode) return null
  return <div className={`${styles.overlay} ${matrix ? styles.matrix : ''}`} aria-hidden="true" />
}
