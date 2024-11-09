export interface EventOfOrganizer {
  id: number
  name: string
  content: string
  startAt: string
  endAt: string
  startRegistrationAt: string
  endRegistrationAt: string
  registeredAt: string
  followedAt: string
  status: {
    type: string
    moderatedAt: string
  }
  coverPhotoUrl: string
  organizer: {
    id: number
    name: string
    avatarUrl: string
  }
}
