import { RegisteredEventTag } from 'src/types/event.type'

export const REGISTERED_EVENT_TAGS = ['notStarted', 'onGoing', 'pending', 'participated', 'notParticipated'] as const

export const REGISTERED_EVENT_TAG_LABEL: Record<RegisteredEventTag, string> = {
  notStarted: 'Chưa diễn ra',
  onGoing: 'Đang diễn ra',
  pending: 'Chờ phê duyệt',
  participated: 'Phê duyệt thành công',
  notParticipated: 'Không tham gia'
}

export const EVENT_STATUS_COLOR_CLASSES: Record<RegisteredEventTag, { backgroundColor: string; textColor: string }> = {
  notStarted: {
    backgroundColor: 'bg-semantic-secondary-background',
    textColor: 'text-semantic-secondary'
  },
  onGoing: {
    backgroundColor: 'bg-semantic-secondary-background',
    textColor: 'text-semantic-secondary'
  },
  pending: {
    backgroundColor: 'bg-semantic-secondary-background',
    textColor: 'text-semantic-secondary'
  },
  participated: {
    backgroundColor: 'bg-semantic-success-background',
    textColor: 'text-semantic-success'
  },
  notParticipated: {
    backgroundColor: 'bg-semantic-cancelled-background',
    textColor: 'text-semantic-cancelled'
  }
}
