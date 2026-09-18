import type { Metadata } from "next"
import { SiteNav } from "@/components/site/site-nav"
import { SiteFooter } from "@/components/site/site-footer"
import { FilmCard } from "@/components/site/film-card"
import { Reveal } from "@/components/site/reveal"
import { getMovies } from "@/lib/data"

export const metadata: Metadata = {
  title: "Films",
  description: "Feature film scores and music programming by Nirupan.",
}

export default async function FilmsPage() {
  const movies = await getMovies()

  return (
    <main className="relative">
      <SiteNav />

      <section className="px-5 pb-16 pt-32 sm:px-8 md:pt-44">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="kicker mb-5 text-accent">Filmography</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-mega text-foreground">Films</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70">
              A selection of feature films with original score, music programming and production credits.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-28 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          {movies.length === 0 ? (
            <p className="text-muted-foreground">No films published yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
              {movies.map((m, i) => (
                <Reveal key={m.id} delay={(i % 5) * 0.04}>
                  <FilmCard movie={m} index={i} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
