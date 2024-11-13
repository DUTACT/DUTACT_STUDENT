import { EventOfOrganizer } from 'src/types/event.type'
import { getEventById } from 'src/apis/event'
import { ApiError } from 'src/types/client.type'

interface DetailEventResult {
  event: EventOfOrganizer | undefined
  isLoading: boolean
  error: ApiError | null
}

export function useDetailEvent(eventId: number): DetailEventResult {
  const { data: event, isLoading, error } = getEventById(eventId)

  return {
    event,
    isLoading,
    error
  }
}
