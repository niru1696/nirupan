/**
 * Extract a YouTube video ID from the common URL variants:
 *  - https://www.youtube.com/watch?v=ID
 *  - https://youtu.be/ID
 *  - https://www.youtube.com/embed/ID
 *  - https://www.youtube.com/shorts/ID
 *  - a bare 11-char ID
 */
export function extractYouTubeId(input: string | null | undefined): string | null {
  if (!input) return null
  const url = input.trim()
  if (!url) return null

  // Bare ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url

  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  ]

  for (const p of patterns) {
    const m = url.match(p)
    if (m?.[1]) return m[1]
  }
  return null
}

export function youtubeThumbnail(videoId: string | null | undefined, quality: "max" | "hq" | "mq" = "max"): string | null {
  if (!videoId) return null
  const q = quality === "max" ? "maxresdefault" : quality === "hq" ? "hqdefault" : "mqdefault"
  return `https://img.youtube.com/vi/${videoId}/${q}.jpg`
}

export function youtubeEmbedUrl(videoId: string | null | undefined, opts?: { autoplay?: boolean; mute?: boolean }): string | null {
  if (!videoId) return null
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  })
  if (opts?.autoplay) params.set("autoplay", "1")
  if (opts?.mute) params.set("mute", "1")
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
}

/**
 * Resolve the best available image for a movie following the fallback chain:
 * custom backdrop → custom poster → youtube maxres → youtube hq → null (elegant placeholder handled in UI)
 */
export function resolveMovieImage(movie: {
  backdrop_image?: string | null
  poster_image?: string | null
  youtube_thumbnail?: string | null
  youtube_video_id?: string | null
}): string | null {
  return (
    movie.backdrop_image ||
    movie.poster_image ||
    movie.youtube_thumbnail ||
    youtubeThumbnail(movie.youtube_video_id, "hq") ||
    null
  )
}

export function resolveMoviePoster(movie: {
  poster_image?: string | null
  backdrop_image?: string | null
  youtube_thumbnail?: string | null
  youtube_video_id?: string | null
}): string | null {
  return (
    movie.poster_image ||
    movie.backdrop_image ||
    movie.youtube_thumbnail ||
    youtubeThumbnail(movie.youtube_video_id, "hq") ||
    null
  )
}
