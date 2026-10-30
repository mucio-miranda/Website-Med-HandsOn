// Extrai o ID de um link do YouTube (watch, youtu.be, shorts, embed, live)
export function getYouTubeId(url?: string): string | null {
  if (!url) return null
  const match = url.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/
  )
  return match ? match[1] : null
}
