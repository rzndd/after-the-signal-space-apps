import { useEffect, useRef, useState } from 'react'
import type { MachineImage } from '../../types/machine'
import { fetchNasaImage, type NasaPhoto } from '../../lib/nasa'
import styles from './NasaCover.module.css'
import { CorruptedImage } from '../ui/CorruptedImage'

type Props = { image: MachineImage & { position?: string }; story?: boolean }

/** Documentary covers only. Loading or failure never substitutes an illustration. */
export function NasaCover({ image, story = false }: Props) {
  const coverRef = useRef<HTMLSpanElement>(null)
  const [nearby, setNearby] = useState(story || Boolean(image.localSrc))
  const [result, setResult] = useState<{ id: string; photo: NasaPhoto | null } | null>(null)
  const [failedUrl, setFailedUrl] = useState('')
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    if (story || image.localSrc || !coverRef.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNearby(true); observer.disconnect() }
    }, { rootMargin: '240px' })
    observer.observe(coverRef.current)
    return () => observer.disconnect()
  }, [image.localSrc, story])
  useEffect(() => {
    if (!nearby || image.localSrc) return
    const controller = new AbortController()
    fetchNasaImage(image, controller.signal).then((photo) => {
      if (!controller.signal.aborted) setResult({ id: image.nasaId, photo })
    })
    return () => controller.abort()
  }, [image, attempt, nearby])
  const current = result?.id === image.nasaId ? result : null
  const photo = current?.photo
  const url = image.localSrc ?? photo?.url
  const failed = image.localSrc ? failedUrl === image.localSrc : Boolean(current && (!photo || failedUrl === photo.url))
  const retry = () => { setResult(null); setFailedUrl(''); setAttempt((value) => value + 1) }

  return (
    <span ref={coverRef} className={styles.cover + (story ? ' ' + styles.story : '')}>
      <span className={styles.visual}>
        {!failed && url && <CorruptedImage key={`${url}-${attempt}`} src={url} alt={image.label} className={styles.photo}
          style={{ objectPosition: image.position }} loading={story ? 'eager' : 'lazy'} decoding="async"
          onError={() => setFailedUrl(url)} />}
        {!failed && !url && <span className={styles.loading} aria-hidden="true">0101 #@%&amp; 0010 · RECOVERING IMAGE_</span>}
        {failed && <span className={styles.missing}>Mission photograph unavailable.{story ? <button type="button" onClick={retry}>Try again</button> : <span>Open the story to retry.</span>}</span>}
      </span>
      {image.localSrc && !failed && <span className={styles.credit}>{image.classification ?? 'Selected image'} · {image.credit ?? 'Unverified origin'}{story && <> · <a href={'https://images.nasa.gov/details/' + image.nasaId} target="_blank" rel="noreferrer">NASA record</a></>}</span>}
      {photo && !image.localSrc && !failed && <span className={styles.credit}>Photo: {photo.credit}{image.date ? ' · ' + image.date : ''}{story && <> · <a href={photo.pageUrl} target="_blank" rel="noreferrer">NASA record</a></>}</span>}
    </span>
  )
}
