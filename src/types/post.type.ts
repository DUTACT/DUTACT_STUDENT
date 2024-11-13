export interface Post {
  id: number
  content: string
  postedAt: string
  coverPhotoUrl: string
  event: {
    id: number
    name: string
  }
}
