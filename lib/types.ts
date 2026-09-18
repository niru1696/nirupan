export type Credit = {
  role: string
  name: string
}

export type Movie = {
  id: string
  title: string
  slug: string
  year: number | null
  language: string | null
  role: string | null
  description: string | null
  poster_image: string | null
  backdrop_image: string | null
  youtube_trailer_url: string | null
  youtube_video_id: string | null
  youtube_thumbnail: string | null
  streaming_platform: string | null
  external_url: string | null
  credits: Credit[]
  featured: boolean
  published: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export type Music = {
  id: string
  title: string
  artist: string | null
  project: string | null
  cover: string | null
  audio_url: string | null
  soundcloud_url: string | null
  spotify_url: string | null
  youtube_url: string | null
  featured: boolean
  published: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export type Collaboration = {
  id: string
  name: string
  published: boolean
  display_order: number
  created_at: string
}

export type CommercialProject = {
  id: string
  category: string
  title: string | null
  description: string | null
  published: boolean
  display_order: number
  created_at: string
}

export type SiteSetting = {
  key: string
  value: string | null
  updated_at: string
}
