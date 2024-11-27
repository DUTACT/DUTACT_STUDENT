import moment from 'moment'
import { RegisteredEvent, RegisteredEventTag } from 'src/types/event.type'

export const generateRegisteredEventTags = (registeredEvent: RegisteredEvent): RegisteredEventTag[] => {
  const tags: RegisteredEventTag[] = []
  const now = moment()
  const startAt = moment(registeredEvent.event.startAt)
  const endAt = moment(registeredEvent.event.endAt)

  if (startAt.isAfter(now)) {
    tags.push('notStarted')
  }

  if (startAt.isSameOrBefore(now) && endAt.isSameOrAfter(now)) {
    tags.push('onGoing')
  }

  if (!startAt.isAfter(now) && registeredEvent.certificateStatus?.type === 'pending') {
    tags.push('pending')
  }

  if (endAt.isBefore(now) && registeredEvent.certificateStatus?.type === 'confirmed') {
    tags.push('participated')
  }

  if (endAt.isBefore(now) && registeredEvent.certificateStatus?.type === 'rejected') {
    tags.push('notParticipated')
  }

  return tags
}
