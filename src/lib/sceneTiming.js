export function sceneDuration(scene, calm = false) {
  const words = scene.text.trim().split(/\s+/).length
  const base = scene.type === 'tech' ? Math.max(11000, words * 500 + 3500) : Math.max(5500, words * 400 + 1800)
  return Math.round(base * (calm ? 1.4 : 1))
}
