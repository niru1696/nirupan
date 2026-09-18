import Link from "next/link"
import Image from "next/image"
import { getSettings } from "@/lib/data"

export async function SiteFooter() {
  const settings = await getSettings()
  const year = new Date().getFullYear()

  const socials = [
    { label: "Instagram", href: settings.instagram_url },
    { label: "YouTube", href: settings.youtube_url },
    { label: "SoundCloud", href: settings.soundcloud_url },
    { label: "LinkedIn", href: settings.linkedin_url },
  ].filter((s) => s.href)

  return (
    <footer className="relative border-t border-border bg-background px-5 pb-10 pt-16 sm:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <Image
  src="/brand/nirupan-white.png"
  alt="Nirupan"
  width={440}
  height={220}
  className="h-auto w-[330px] md:w-[440px] max-w-none"
/>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Composer, music producer & programmer. Scoring films, commercials and brand campaigns.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4">
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
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {year} Nirupan. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {settings.contact_email && (
              <a href={`mailto:${settings.contact_email}`} className="transition-colors hover:text-accent">
                {settings.contact_email}
              </a>
            )}
            <Link href="/admin/login" className="transition-colors hover:text-accent">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
