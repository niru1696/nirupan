import type { Metadata } from "next"
import Image from "next/image"
import { SiteNav } from "@/components/site/site-nav"
import { SiteFooter } from "@/components/site/site-footer"
import { Reveal } from "@/components/site/reveal"
import { getSettings } from "@/lib/data"

export const metadata: Metadata = {
  title: "About",
  description:
    "Nirupan — composer, music producer and programmer. Trinity College London trained, featured by Rolling Stone India.",
}

const HIGHLIGHTS = [
  { title: "Trinity College London", detail: "Formally trained in music theory and performance." },
  { title: "Rolling Stone India", detail: "Featured artist and producer." },
  { title: "Disney India", detail: "Leading the vocal department." },
  { title: "4AM", detail: "Original independent music project." },
]

export default async function AboutPage() {
  const settings = await getSettings()

  return (
    <main className="relative">
      <SiteNav />

      <section className="px-5 pb-16 pt-32 sm:px-8 md:pt-44">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="kicker mb-5 text-accent">The story</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-mega text-foreground">About</h1>
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-[1600px] items-start gap-14 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <div className="space-y-6">
            <Reveal>
              <p className="text-pretty text-2xl leading-relaxed text-foreground/90 md:text-3xl">
                {settings.about_intro ??
                  "Nirupan is a composer, music producer and programmer working across feature films, commercials and brand campaigns."}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-pretty leading-relaxed text-foreground/70">
                {settings.about_body ??
                  "From intimate acoustic textures to full orchestral and electronic scores, the work is built around emotion first — finding the sound that carries a story. Trinity College London trained and featured by Rolling Stone India, Nirupan currently leads the vocal department at Disney India while continuing an independent artist practice under the 4AM project."}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary">
              <Image
                src="/photos/nirupan-studio-bw.jpg"
                alt="Nirupan in the studio"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.title} delay={(i % 4) * 0.05}>
                <div className="flex h-full flex-col justify-between bg-background p-8">
                  <span className="text-accent" aria-hidden>
                    ✦
                  </span>
                  <div className="mt-16">
                    <p className="font-display text-2xl text-foreground">{h.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
