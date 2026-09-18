"use client"

import { useEffect } from "react"
import { youtubeEmbedUrl } from "@/lib/youtube"

export function YouTubeModal({
  videoId,
  title,
  onClose,
}: {
  videoId: string | null
  title?: string
  onClose: () => void
}) {
  useEffect(() => {
    if (!videoId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [videoId, onClose])

  if (!videoId) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} trailer` : "Video player"}
    >
      <button
        onClick={onClose}
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-foreground/80 transition-colors hover:border-accent hover:text-accent"
        aria-label="Close video"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
      <div
        className="aspect-video w-full max-w-5xl overflow-hidden bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={youtubeEmbedUrl(videoId, { autoplay: true }) ?? ""}
          title={title ?? "Video"}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
