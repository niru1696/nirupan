import type React from "react"
import type { Metadata } from "next"
import { Bebas_Neue, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Nirupan — Composer, Music Producer & Programmer",
    template: "%s — Nirupan",
  },
  description:
    "Nirupan is a composer, music producer and programmer scoring feature films, commercials and brand campaigns. Trinity College London trained. Featured by Rolling Stone India.",
  keywords: [
    "Nirupan",
    "music producer",
    "film composer",
    "music programmer",
    "4AM",
    "film score",
    "Indian cinema music",
  ],
  openGraph: {
    title: "Nirupan — Composer, Music Producer & Programmer",
    description:
      "Scoring feature films, commercials and brand campaigns. Trinity College London trained. Featured by Rolling Stone India.",
    type: "website",
  },
  generator: "v0.app",
}

export const viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${bebas.variable} ${inter.variable}`}>
      <body className="grain antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
