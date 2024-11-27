import { REGISTERED_EVENT_TAGS } from 'src/constants/event'
import { CertificateStatusOfEvent } from './certificate.type'
import { CheckInInformation } from './eventCheckIn'

export interface OrganizerInformation {
  id: number
  name: string
  avatarUrl: string
}

export interface EventOfOrganizer {
  id: number
  name: string
  content: string
  startAt: string
  endAt: string
  followerNumber: number
  registerNumber: number
  startRegistrationAt: string
  endRegistrationAt: string
  registeredAt: string | null
  followedAt: string | null
  status: {
    type: string
    moderatedAt: string
  }
  coverPhotoUrl: string
  organizer: OrganizerInformation
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

export interface EventTimeFilter {
  timeCreatedFrom: string
  timeCreatedTo: string
}

export type RegisteredEventTag = (typeof REGISTERED_EVENT_TAGS)[number]

export interface RegisteredEvent {
  studentId: string
  event: EventOfOrganizer
  totalCheckIn: number
  certificateStatus: CertificateStatusOfEvent | null
  checkIns: CheckInInformation[]
  tags: RegisteredEventTag[]
}
