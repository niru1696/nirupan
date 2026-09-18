"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Hero({ tagline }: { tagline?: string }) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return
    const onScroll = () => setOffset(window.scrollY)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section className="vignette relative flex min-h-[100svh] items-end overflow-hidden">
      {/* Background image with parallax */}
      <div className="absolute inset-0" style={{ transform: `translateY(${offset * 0.25}px) scale(1.1)` }}>
        <Image
          src="/photos/nirupan-moog-rooftop.jpg"
          alt="Nirupan performing on a Moog synthesizer against a city skyline"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_center] opacity-70 grayscale"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-16 sm:px-8 md:pb-24">
        <p
          className="kicker mb-5 text-accent"
          style={{ opacity: 1, animation: "none" }}
        >
          Composer · Producer · Programmer
        </p>
        <h1 className="font-display text-hero text-foreground">Nirupan</h1>
        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-foreground/80 md:text-lg">
          {tagline ??
            "Crafting emotionally driven scores for film, and sound for the brands and stories in between."}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="/films"
            className="group inline-flex items-center gap-3 border border-foreground/30 px-7 py-3.5 text-sm uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            View Films
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/music"
            className="inline-flex items-center gap-3 px-2 py-3.5 text-sm uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-accent"
          >
            Listen
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-5 z-10 hidden items-center gap-3 sm:right-8 md:flex">
        <span className="kicker">Scroll</span>
        <span className="h-12 w-px bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  )
}
