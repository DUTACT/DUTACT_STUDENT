import { OrganizerInformation } from './event.type'

export interface Post {
  id: number
  content: string
  postedAt: string
  coverPhotoUrls: string[]
  likedNumber: number
  likedAt: string | null
  event: {
    id: number
    name: string
  }
  organizer: OrganizerInformation
}
