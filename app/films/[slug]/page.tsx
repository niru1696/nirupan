import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteNav } from "@/components/site/site-nav"
import { SiteFooter } from "@/components/site/site-footer"
import { FilmDetail } from "@/components/site/film-detail"
import { getMovieBySlug, getMovies } from "@/lib/data"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const movie = await getMovieBySlug(slug)
  if (!movie) return { title: "Film not found" }
  return {
    title: movie.title,
    description: movie.description ?? `${movie.title} — original score by Nirupan.`,
  }
}

export default async function FilmPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const movie = await getMovieBySlug(slug)
  if (!movie) notFound()

  return (
    <main className="relative">
      <SiteNav />
      <FilmDetail movie={movie} />
      <SiteFooter />
    </main>
  )
}
