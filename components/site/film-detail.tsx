"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Movie } from "@/lib/types"
import { resolveMoviePoster } from "@/lib/youtube"
import { YouTubeModal } from "@/components/site/youtube-modal"
import { Reveal } from "@/components/site/reveal"

export function FilmDetail({ movie }: { movie: Movie }) {
  const [open, setOpen] = useState(false)
  const poster = resolveMoviePoster(movie)
  const backdrop = movie.backdrop_image || movie.youtube_thumbnail || poster

  const credits = Array.isArray(movie.credits) ? movie.credits : []

  const externalLinks = [
    { label: movie.streaming_platform || "Watch", href: movie.external_url },
  ].filter((l) => l.href)

  return (
    <>
      {/* Backdrop hero */}
      <section className="vignette relative flex min-h-[70svh] items-end overflow-hidden">
        {backdrop && (
          <div className="absolute inset-0">
            <Image
              src={backdrop || "/placeholder.svg"}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-50"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-14 pt-32 sm:px-8">
          <Link
            href="/films"
            className="kicker mb-8 inline-flex items-center gap-2 text-foreground/60 transition-colors hover:text-accent"
          >
            <span aria-hidden>←</span> All films
          </Link>
          <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.25em] text-accent">
            {movie.year && <span>{movie.year}</span>}
            {movie.year && movie.language && <span aria-hidden>·</span>}
            {movie.language && <span>{movie.language}</span>}
          </div>
          <h1 className="mt-4 font-display text-section text-foreground">{movie.title}</h1>
          {movie.role && <p className="mt-3 text-lg text-foreground/70">{movie.role}</p>}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {movie.youtube_video_id && (
              <button
                onClick={() => setOpen(true)}
                className="group inline-flex items-center gap-3 bg-foreground px-7 py-3.5 text-sm uppercase tracking-[0.2em] text-background transition-colors hover:bg-accent"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play Trailer
              </button>
            )}
            {externalLinks.map((l) => (
              <a
                key={l.label}
                href={l.href!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-foreground/30 px-7 py-3.5 text-sm uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {l.label}
                <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-[1600px] gap-14 md:grid-cols-[1fr_320px] md:gap-20">
          <div>
            {movie.description && (
              <Reveal>
                <p className="max-w-2xl text-pretty text-xl leading-relaxed text-foreground/85 md:text-2xl">
                  {movie.description}
                </p>
              </Reveal>
            )}

            {movie.youtube_video_id && (
              <Reveal delay={0.05}>
                <button
                  onClick={() => setOpen(true)}
                  className="group relative mt-12 block aspect-video w-full max-w-3xl overflow-hidden bg-secondary"
                  aria-label={`Play ${movie.title} trailer`}
                >
                  {(movie.youtube_thumbnail || backdrop) && (
                    <Image
                      src={movie.youtube_thumbnail || backdrop || "/placeholder.svg"}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-foreground/60 bg-black/40 backdrop-blur-sm transition-colors group-hover:border-accent">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="translate-x-[1px] text-foreground"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </div>
                </button>
              </Reveal>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {poster && (
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-secondary">
                <Image src={poster || "/placeholder.svg"} alt={`${movie.title} poster`} fill sizes="320px" className="object-cover" />
              </div>
            )}

            {credits.length > 0 && (
              <div className="border-t border-border pt-6">
                <p className="kicker mb-5">Credits</p>
                <dl className="space-y-4">
                  {credits.map((c, i) => (
                    <div key={i} className="flex flex-col gap-0.5">
                      <dt className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">{c.role}</dt>
                      <dd className="text-foreground">{c.name}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </aside>
        </div>
      </section>

      <YouTubeModal
        videoId={open ? movie.youtube_video_id : null}
        title={movie.title}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
