import type { Collaboration } from "@/lib/types"

export function CollaborationsMarquee({ collaborations }: { collaborations: Collaboration[] }) {
  if (!collaborations.length) return null
  const items = [...collaborations, ...collaborations]

  return (
    <div className="relative overflow-hidden border-y border-border py-8">
      <div className="flex w-max animate-marquee items-center gap-16 whitespace-nowrap">
        {items.map((c, i) => (
          <span key={`${c.id}-${i}`} className="flex items-center gap-16">
            <span className="font-display text-4xl text-foreground/40 transition-colors hover:text-accent md:text-6xl">
              {c.name}
            </span>
            <span className="text-accent/50" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  )
}
