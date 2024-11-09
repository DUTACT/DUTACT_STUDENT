import { ApiError } from 'src/types/client.type'
import { getEvents } from 'src/apis/event'
import { EventOfOrganizer } from 'src/types/event.type'

interface EventResult {
  events: EventOfOrganizer[]
  isLoading: boolean
  error: ApiError | null
}

export function useEvents(): EventResult {
  const { data: events = [], isLoading, error } = getEvents()

  return {
    events,
    isLoading,
    error
  }
}
