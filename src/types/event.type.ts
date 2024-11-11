export interface EventOfOrganizer {
  id: number
  name: string
  content: string
  startAt: string
  endAt: string
  startRegistrationAt: string
  endRegistrationAt: string
  registeredAt: string | null
  followedAt: string | null
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

export interface RegisterResponse {
  studentId: number
  eventId: number
  registeredAt: string
}

export interface FollowResponse {
  studentId: number
  eventId: number
  followAt: string
}