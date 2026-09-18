import Link from "next/link"
import Image from "next/image"
import { SiteNav } from "@/components/site/site-nav"
import { SiteFooter } from "@/components/site/site-footer"
import { Hero } from "@/components/site/hero"
import { FilmCard } from "@/components/site/film-card"
import { MusicList } from "@/components/site/music-list"
import { CollaborationsMarquee } from "@/components/site/collaborations-marquee"
import { ContactSection } from "@/components/site/contact-section"
import { Reveal } from "@/components/site/reveal"
import { getMovies, getMusic, getCollaborations, getCommercialProjects, getSettings } from "@/lib/data"

export default async function HomePage() {
  const [movies, music, collaborations, commercial, settings] = await Promise.all([
    getMovies(),
    getMusic(),
    getCollaborations(),
    getCommercialProjects(),
    getSettings(),
  ])

  const featured = movies.filter((m) => m.featured)
  const filmsToShow = (featured.length ? featured : movies).slice(0, 10)

  const socials = [
    { label: "Instagram", href: settings.instagram_url },
    { label: "YouTube", href: settings.youtube_url },
    { label: "SoundCloud", href: settings.soundcloud_url },
    { label: "LinkedIn", href: settings.linkedin_url },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href))

  return (
    <main className="relative">
      <SiteNav />
      <Hero tagline={settings.hero_tagline} />

      {/* Stats strip */}
      <section className="border-b border-border px-5 py-10 sm:px-8">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { n: `${movies.length}+`, l: "Film Projects" },
            { n: settings.songs_produced ? `${settings.songs_produced}+` : "200+", l: "Songs Produced" },
            { n: settings.soundcloud_streams ?? "500K+", l: "SoundCloud Streams" },
            { n: "5+", l: "Years Collaborating" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.05}>
              <div>
                <p className="font-display text-5xl text-foreground md:text-7xl">{s.n}</p>
                <p className="kicker mt-2">{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured films */}
      <section className="px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-14 flex items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="kicker mb-4 text-accent">Selected work</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-display text-section text-foreground">Films</h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Link
                href="/films"
                className="group mb-2 hidden items-center gap-3 text-sm uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-accent sm:inline-flex"
              >
                All films
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
            {filmsToShow.map((m, i) => (
              <Reveal key={m.id} delay={(i % 5) * 0.04}>
                <FilmCard movie={m} index={i} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 sm:hidden">
            <Link
              href="/films"
              className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-foreground/70 hover:text-accent"
            >
              All films →
            </Link>
          </div>
        </div>
      </section>

      {/* Collaborations marquee */}
      <CollaborationsMarquee collaborations={collaborations} />

      {/* Music */}
      <section className="px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-14 flex items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="kicker mb-4 text-accent">4AM · Original project</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-display text-section text-foreground">Music</h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Link
                href="/music"
                className="group mb-2 hidden items-center gap-3 text-sm uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-accent sm:inline-flex"
              >
                All music
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <MusicList tracks={music} />
          </Reveal>
        </div>
      </section>

      {/* About teaser */}
      <section className="border-t border-border px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1600px] items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
              <Image
                src="/photos/nirupan-studio-bw.jpg"
                alt="Nirupan in the studio"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="kicker mb-6 text-accent">About</p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-pretty text-xl leading-relaxed text-foreground/90 md:text-2xl">
                Trinity College London trained. Featured by Rolling Stone India. Leading the vocal department at Disney
                India — and chasing the score that hits you in the chest.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/about"
                className="group mt-10 inline-flex items-center gap-3 border border-foreground/30 px-7 py-3.5 text-sm uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Read more
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Beyond film */}
      {commercial.length > 0 && (
        <section className="border-t border-border px-5 py-24 sm:px-8 md:py-32">
          <div className="mx-auto max-w-[1600px]">
            <Reveal>
              <p className="kicker mb-4 text-accent">Beyond film</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mb-14 font-display text-section text-foreground">Commercial</h2>
            </Reveal>
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {commercial.map((c, i) => (
                <Reveal key={c.id} delay={(i % 4) * 0.05}>
                  <div className="flex h-full flex-col justify-between bg-background p-8 transition-colors hover:bg-background-elevated">
                    <span className="font-display text-3xl text-foreground/40">{String(i + 1).padStart(2, "0")}</span>
                    <div className="mt-16">
                      <p className="font-display text-3xl text-foreground">{c.category}</p>
                      {c.description && <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection email={settings.contact_email} socials={socials} />
      <SiteFooter />
    </main>
  )
}
