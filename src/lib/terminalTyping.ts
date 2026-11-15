export function typingDelay(character: string, speed = 14) {
  if (/[.!?]/.test(character)) return speed + 150
  if (/[,;:]/.test(character)) return speed + 75
  if (character === '\n') return speed + 90
  return speed
}

/** One cancellable timer, no audio and no animation-frame polling. */
export function createTypingSession({
  text, from = 0, speed = 14, onUpdate, onComplete,
}: {
  text: string; from?: number; speed?: number
  onUpdate: (length: number) => void; onComplete: () => void
}) {
  const characters = Array.from(text)
  let length = Math.max(0, Math.min(from, characters.length))
  let stopped = false
  let timer: ReturnType<typeof setTimeout>
  const tick = () => {
    if (stopped) return
    if (length < characters.length) onUpdate(++length)
    if (length >= characters.length) { stopped = true; onComplete(); return }
    timer = setTimeout(tick, typingDelay(characters[length - 1], speed))
  }
  timer = setTimeout(tick, 0)
  return {
    stop() { stopped = true; clearTimeout(timer) },
    reveal() {
      if (stopped) return
      stopped = true; clearTimeout(timer)
      onUpdate(characters.length); onComplete()
    },
  }
}
