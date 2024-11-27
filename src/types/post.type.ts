export interface Post {
  id: number
  content: string
  postedAt: string
  coverPhotoUrl: string
  likedNumber: number
  likedAt: string | null
  event: {
    id: number
    name: string
  }
}
