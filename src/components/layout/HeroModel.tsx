import { useEffect, useRef } from 'react'
import styles from './HeroModel.module.css'
import { useA11y } from '../../contexts/A11yContext'

/** The supplied model is pre-rendered: visitors never load a WebGL engine or Draco decoder. */
export function HeroModel() {
  const { isSafeMode } = useA11y()
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isSafeMode) { video.pause(); return }
    video.defaultPlaybackRate = .65
    video.playbackRate = .65
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    const economize = connection?.saveData || ['slow-2g', '2g', '3g'].includes(connection?.effectiveType ?? '')
    const compactMedia = window.matchMedia('(max-width: 760px)')
    let visible = false
    let attached = false
    let disposed = false
    let idle: number | undefined
    let fallback: number | undefined
    let currentSource = ''
    const mediaSource = () => compactMedia.matches
      ? '/media/hero-rotation-mobile.mp4'
      : '/media/hero-rotation.mp4'
    const start = () => {
      if (disposed || !visible || document.hidden || preference.matches || economize) return
      const nextSource = mediaSource()
      if (!attached || currentSource !== nextSource) {
        attached = true
        currentSource = nextSource
        video.src = nextSource
        video.load()
      }
      void video.play().catch(() => { /* The poster remains available if autoplay is blocked. */ })
    }
    const sync = () => {
      if (!visible || document.hidden || preference.matches || economize) { video.pause(); return }
      if (attached) { start(); return }
      if (idle !== undefined || fallback !== undefined) return
      if (typeof window.requestIdleCallback === 'function') idle = window.requestIdleCallback(() => { idle = undefined; start() }, { timeout: 1500 })
      else fallback = window.setTimeout(() => { fallback = undefined; start() }, 300)
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync() }, { threshold: .1 })
    observer.observe(video)
    preference.addEventListener('change', sync)
    compactMedia.addEventListener('change', sync)
    window.addEventListener('resize', sync, { passive: true })
    document.addEventListener('visibilitychange', sync)
    return () => {
      disposed = true
      observer.disconnect()
      preference.removeEventListener('change', sync)
      compactMedia.removeEventListener('change', sync)
      window.removeEventListener('resize', sync)
      document.removeEventListener('visibilitychange', sync)
      if (idle !== undefined) window.cancelIdleCallback(idle)
      if (fallback !== undefined) window.clearTimeout(fallback)
      video.pause()
    }
  }, [isSafeMode])
  return (
    <figure className={styles.frame}>
      <div className={styles.stage}>
        <video ref={videoRef} className={styles.video} poster="/media/hero-poster.webp" width="512" height="512"
          loop muted playsInline preload="none" disablePictureInPicture
          aria-label="A slowly rotating, stylized lunar mission diorama with a spacecraft and landing hardware." />
      </div>
      <figcaption className={styles.caption}><span className={styles.captionTag}>Mission relic · Apollo 11</span> Lunar diorama · not to scale. Rendered from <a href="https://sketchfab.com/3d-models/the-moon-landing-v2-7e310f6267e54c9da7a19b88d0b68fb1" target="_blank" rel="noreferrer">The Moon Landing V.2</a> by <a href="https://sketchfab.com/TGVMisterH" target="_blank" rel="noreferrer">MisterH</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0</a></figcaption>
    </figure>
  )
}
