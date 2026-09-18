import Link from "next/link"
import Image from "next/image"
import type { Movie } from "@/lib/types"
import { resolveMoviePoster } from "@/lib/youtube"

export function FilmCard({ movie, index }: { movie: Movie; index?: number }) {
  const poster = resolveMoviePoster(movie)

  return (
    <Link href={`/films/${movie.slug}`} className="group block">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-secondary">
        {poster ? (
          <Image
            src={poster || "/placeholder.svg"}
            alt={`${movie.title} poster`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-4 text-center">
            <span className="font-display text-3xl leading-none text-foreground/70">{movie.title}</span>
            <span className="text-accent/50" aria-hidden>
              ✦
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

        {movie.youtube_video_id && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground/60 bg-black/30 backdrop-blur-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="translate-x-[1px] text-foreground">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="font-display text-2xl leading-none text-foreground">{movie.title}</p>
          <div className="mt-1.5 flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-foreground/60">
            {movie.year && <span>{movie.year}</span>}
            {movie.year && movie.language && <span aria-hidden>·</span>}
            {movie.language && <span>{movie.language}</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}
