import { CertificateStatusOfEvent } from './certificate.type'

export interface CheckInCode {
  id: string
  title: string
  startAt: string
  endAt: string
}

export interface CheckInInformation {
  id: string
  checkInTime: string
  checkInCode: CheckInCode
}

export interface EventCheckIn {
  eventId: number
  eventTitle: string
  totalCheckIn: number
  certificateStatus: CertificateStatusOfEvent
  checkIns: CheckInInformation[]
}
