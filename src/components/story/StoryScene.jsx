import { useEffect, useRef, useState } from 'react'
import { TerminalText } from '../ui/TerminalText'
import { useCalmMotion } from '../../hooks/useCalmMotion'
import styles from './StoryScene.module.css'
import { sceneMedia } from '../../data/sceneMedia'

const tiles = Array.from({length:24}, (_, index) => index)
export function StoryScene({ chapter, scene, sceneIndex, onReady, onPause, onTyped, reveal }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const calm = useCalmMotion()
  const element = useRef(null)
  const supporting = (scene.type === 'tech' || sceneIndex >= 3) && sceneMedia[chapter.machineId]
  const media = supporting || { src: chapter.bgImage, caption: chapter.imageCaption, kind: chapter.imageKind ?? 'Photographic mosaic', source: chapter.imageSource }
  const hasImage = media.src && !failed
  useEffect(() => {
    const node = element.current
    if (!node) return
    let disposed = false
    const image = node.querySelector('img')
    const check = () => {
      if (disposed || !node.isConnected) return
      const textElement = node.querySelector('[data-scene-text]')
      const footerElement = node.closest('main')?.querySelector('footer')
      if (!textElement || !footerElement) return
      const text = textElement.getBoundingClientRect()
      const footer = footerElement.getBoundingClientRect()
      onReady((!image || image.complete) && text.top >= 0 && text.bottom <= Math.min(window.innerHeight, footer.top))
    }
    const frame = requestAnimationFrame(check)
    const observer = new ResizeObserver(check)
    observer.observe(node)
    window.addEventListener('resize', check)
    window.addEventListener('scroll', check, true)
    image?.addEventListener('load', check)
    image?.addEventListener('error', check)
    return () => {
      disposed = true
      cancelAnimationFrame(frame); observer.disconnect()
      window.removeEventListener('resize', check); window.removeEventListener('scroll', check, true)
      image?.removeEventListener('load', check); image?.removeEventListener('error', check)
    }
  }, [hasImage, onReady])
  return <section ref={element} className={styles.scene} aria-label="Archive scene">
    {hasImage ? <figure className={styles.figure}>
      <span className={styles.imageWindow}>
        <img src={media.src} alt={media.caption} decoding="async" onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
        {loaded && !calm && <span className={styles.recoveryTiles} aria-hidden="true">{tiles.map(tile =>
          <i key={tile} style={{animationDelay: ((tile * 7) % 24) * 13 + 'ms'}} />
        )}</span>}
      </span>
      <figcaption><details onToggle={(event) => { if (event.currentTarget.open) onPause() }}><summary>NASA image · caption and source</summary>{media.caption}<span>{media.kind} · context image, not a record of the last signal</span>
        <a href={media.src} target="_blank" rel="noreferrer">Open unfiltered image ↗</a>
        {media.source ? <> · <a href={media.source} target="_blank" rel="noreferrer">NASA record ↗</a></> : null}
      </details></figcaption>
    </figure> : <div className={styles.absent} aria-label="Photograph unavailable">IMAGE NOT RECOVERED<br /><span>The written record remains available.</span></div>}
    <div className={styles.copy}>
      <p className={styles.context}>{scene.type === 'tech' ? 'EVIDENCE / ENGINEERING' : 'MEMORY / IMAGINED VOICE'} · {sceneIndex + 1}</p>
      <p data-scene-text className={`${styles.text} ${scene.type === 'tech' ? styles.tech : ''}`} aria-live="polite" aria-atomic="true"><TerminalText text={scene.text} kind={scene.type} reveal={reveal} onComplete={onTyped} /></p>
      <p className={styles.log}><TerminalText text={scene.context} kind="sys" /></p>
    </div>
  </section>
}
