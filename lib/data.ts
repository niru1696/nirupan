import { createClient } from "@/lib/supabase/server"
import type { Movie, Music, Collaboration, CommercialProject } from "@/lib/types"

export async function getMovies(opts?: { includeUnpublished?: boolean }): Promise<Movie[]> {
  const supabase = await createClient()
  let query = supabase.from("movies").select("*").order("display_order", { ascending: true })
  if (!opts?.includeUnpublished) query = query.eq("published", true)
  const { data, error } = await query
  if (error) {
    console.log("[v0] getMovies error:", error.message)
    return []
  }
  return (data as Movie[]) ?? []
}

export async function getMovieBySlug(slug: string): Promise<Movie | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("movies").select("*").eq("slug", slug).maybeSingle()
  if (error) {
    console.log("[v0] getMovieBySlug error:", error.message)
    return null
  }
  return (data as Movie) ?? null
}

export async function getMusic(opts?: { includeUnpublished?: boolean }): Promise<Music[]> {
  const supabase = await createClient()
  let query = supabase.from("music").select("*").order("display_order", { ascending: true })
  if (!opts?.includeUnpublished) query = query.eq("published", true)
  const { data, error } = await query
  if (error) {
    console.log("[v0] getMusic error:", error.message)
    return []
  }
  return (data as Music[]) ?? []
}

export async function getCollaborations(opts?: { includeUnpublished?: boolean }): Promise<Collaboration[]> {
  const supabase = await createClient()
  let query = supabase.from("collaborations").select("*").order("display_order", { ascending: true })
  if (!opts?.includeUnpublished) query = query.eq("published", true)
  const { data, error } = await query
  if (error) {
    console.log("[v0] getCollaborations error:", error.message)
    return []
  }
  return (data as Collaboration[]) ?? []
}

export async function getCommercialProjects(opts?: { includeUnpublished?: boolean }): Promise<CommercialProject[]> {
  const supabase = await createClient()
  let query = supabase.from("commercial_projects").select("*").order("display_order", { ascending: true })
  if (!opts?.includeUnpublished) query = query.eq("published", true)
  const { data, error } = await query
  if (error) {
    console.log("[v0] getCommercialProjects error:", error.message)
    return []
  }
  return (data as CommercialProject[]) ?? []
}

export async function getSettings(): Promise<Record<string, string>> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("site_settings").select("key, value")
  if (error) {
    console.log("[v0] getSettings error:", error.message)
    return {}
  }
  const map: Record<string, string> = {}
  for (const row of data ?? []) {
    if (row.value != null) map[row.key] = row.value
  }
  return map
}
