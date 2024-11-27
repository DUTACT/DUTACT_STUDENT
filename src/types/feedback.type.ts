export interface Feedback {
  id: number
  content: string
  postedAt: string
  coverPhotoUrl: string | null
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
  deleteCoverPhoto?: boolean
}
