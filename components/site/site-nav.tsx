"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/films", label: "Films" },
  { href: "/music", label: "Music" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-32 max-w-[1600px] items-center justify-between px-5 pt-4 sm:px-8 md:h-36 md:pt-5">
          <Link href="/" className="relative z-10 flex items-center" aria-label="Nirupan — home">
            <Image
  src="/brand/nirupan-white.png"
  alt="Nirupan"
  width={330}
  height={165}
  priority
  className="h-auto w-[240px] md:w-[260px]"
/>
          </Link>

          <ul className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="kicker text-foreground/70 transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className={`block h-px w-6 bg-foreground transition-all duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-foreground transition-all duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[65] flex flex-col items-center justify-center bg-background transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-6">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-5xl text-foreground transition-colors hover:text-accent"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${0.05 * i + 0.1}s`,
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
