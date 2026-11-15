/** Keep system metadata beside the story; group adjacent voice fragments into scenes. */
export function buildStoryScenes(lines) {
  const scenes = []
  let context = ''
  for (const line of lines) {
    if (line.type === 'sys') { context = line.text.replace(/^>\s*/, ''); continue }
    const previous = scenes.at(-1)
    if (line.type === 'narrative' && previous?.type === 'narrative' && previous.parts < 2 && previous.text.length + line.text.length < 380) {
      previous.text += '\n\n' + line.text
      previous.parts += 1
    } else scenes.push({ ...line, context, parts: 1 })
  }
  return scenes
}
