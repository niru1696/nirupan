import { Reveal } from "@/components/site/reveal"

export function ContactSection({
  email,
  socials,
}: {
  email?: string
  socials: { label: string; href: string }[]
}) {
  return (
    <section id="contact" className="relative scroll-mt-24 px-5 py-28 sm:px-8 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="kicker mb-6 text-accent">Get in touch</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display text-section text-foreground">
            Let&apos;s make
            <br />
            something loud.
          </h2>
        </Reveal>

        {email && (
          <Reveal delay={0.1}>
            <a
              href={`mailto:${email}`}
              className="group mt-10 inline-flex items-center gap-4 text-2xl text-foreground transition-colors hover:text-accent md:text-4xl"
            >
              <span className="border-b border-border-strong pb-1 group-hover:border-accent">{email}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
            </a>
          </Reveal>
        )}

        {socials.length > 0 && (
          <Reveal delay={0.15}>
            <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kicker text-foreground/70 transition-colors hover:text-accent"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
