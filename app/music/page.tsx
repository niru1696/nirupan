import type { Metadata } from "next"
import { SiteNav } from "@/components/site/site-nav"
import { SiteFooter } from "@/components/site/site-footer"
import { MusicList } from "@/components/site/music-list"
import { Reveal } from "@/components/site/reveal"
import { getMusic, getSettings } from "@/lib/data"

export const metadata: Metadata = {
  title: "Music",
  description: "Original music and productions by Nirupan, including the 4AM project.",
}

export default async function MusicPage() {
  const [tracks, settings] = await Promise.all([getMusic(), getSettings()])

  const links = [
    { label: "SoundCloud", href: settings.soundcloud_url },
    { label: "Spotify", href: settings.spotify_url },
    { label: "YouTube", href: settings.youtube_url },
  ].filter((l) => l.href)

  return (
    <main className="relative">
      <SiteNav />

      <section className="px-5 pb-16 pt-32 sm:px-8 md:pt-44">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="kicker mb-5 text-accent">4AM · Original project & productions</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-mega text-foreground">Music</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70">
              Original tracks, film cues and productions. Press play to preview, or open a track on your platform of
              choice.
            </p>
          </Reveal>
          {links.length > 0 && (
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="kicker text-foreground/70 transition-colors hover:text-accent"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="px-5 pb-28 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <MusicList tracks={tracks} />
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
