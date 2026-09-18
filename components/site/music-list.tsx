"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import type { Music } from "@/lib/types"

function PlayIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

export function MusicList({ tracks }: { tracks: Music[] }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  const toggle = (track: Music) => {
    if (!track.audio_url) return
    const audio = audioRef.current
    if (!audio) return

    if (activeId === track.id) {
      audio.pause()
      setActiveId(null)
      return
    }
    audio.src = track.audio_url
    audio.play().catch(() => setActiveId(null))
    setActiveId(track.id)
  }

  if (!tracks.length) {
    return <p className="text-sm text-muted-foreground">No tracks published yet.</p>
  }

  return (
    <div className="divide-y divide-border border-y border-border">
      <audio ref={audioRef} onEnded={() => setActiveId(null)} className="hidden" />
      {tracks.map((track, i) => {
        const playing = activeId === track.id
        const links = [
          { label: "SoundCloud", href: track.soundcloud_url },
          { label: "Spotify", href: track.spotify_url },
          { label: "YouTube", href: track.youtube_url },
        ].filter((l) => l.href)

        return (
          <div
            key={track.id}
            className="group flex items-center gap-5 py-5 transition-colors hover:bg-background-elevated"
          >
            <span className="w-8 shrink-0 text-center font-display text-2xl text-muted-foreground/50">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-secondary">
              {track.cover ? (
                <Image src={track.cover || "/placeholder.svg"} alt={track.title} fill className="object-cover" sizes="56px" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-accent/40">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                </div>
              )}
              {track.audio_url && (
                <button
                  onClick={() => toggle(track)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 text-foreground opacity-0 transition-opacity group-hover:opacity-100 data-[playing=true]:opacity-100"
                  data-playing={playing}
                  aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}
                >
                  <PlayIcon playing={playing} />
                </button>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-2xl leading-none text-foreground">{track.title}</p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {[track.artist, track.project].filter(Boolean).join(" · ") || "—"}
              </p>
            </div>

            <div className="hidden items-center gap-5 pr-2 sm:flex">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kicker text-foreground/50 transition-colors hover:text-accent"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
