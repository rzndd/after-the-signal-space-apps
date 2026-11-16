import { useState, type ImgHTMLAttributes } from 'react'
import styles from './CorruptedImage.module.css'
import { useA11y } from '../../contexts/A11yContext'

type Props = ImgHTMLAttributes<HTMLImageElement>

/** Visual recovery effect only: the source image and documentary caption stay intact. */
export function CorruptedImage({ src, alt, className = '', onLoad, onError, ...props }: Props) {
  const { isSafeMode } = useA11y()
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  return (
    <span className={`${styles.frame} ${className} ${loaded ? styles.recovered : ''}`}>
      <img {...props} src={src} alt={alt} className={styles.image}
        onLoad={(event) => { setLoaded(true); onLoad?.(event) }}
        onError={(event) => { setFailed(true); onError?.(event) }} />
      {!loaded && !failed ? <span className={styles.ascii} aria-hidden="true"><span>{isSafeMode ? 'Loading NASA image…' : <>0101 #@%&amp; 0010<br />%#@&amp; 1100 #@%&amp;<br />RECOVERING IMAGE_<br />0010 &amp;#@% 1011</>}</span></span> : null}
      {failed ? <span className={styles.error}>Image unavailable.</span> : null}
      {loaded ? <span className={styles.crosshair} aria-hidden="true">+</span> : null}
    </span>
  )
}
