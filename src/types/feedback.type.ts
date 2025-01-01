export interface Feedback {
  id: number
  content: string
  postedAt: string
  coverPhotoUrl: string | null
  coverPhotoUrls: string[]
  likedNumber: number
  likedAt: string | null
  student: {
    id: number
    name: string
    avatarUrl: string
  }
  event: {
    id: number
    name: string
    coverPhotoUrl: string
  }
}

export interface FeedbackBody {
  eventId: number
  content: string
  coverPhoto?: File | null
  keepCoverPhotoUrls?: string[]
  coverPhotos?: File[]
  deleteCoverPhoto?: boolean
}

export interface CoverPhotoData {
  type: 'file' | 'url'
  file?: File
  url?: string
}
