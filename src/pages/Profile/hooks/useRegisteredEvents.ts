import { useMemo } from 'react'
import { getRegisteredEvents } from 'src/apis/event'
import { RegisteredEvent, RegisteredEventTag } from 'src/types/event.type'
import { ApiError } from 'src/types/client.type'

interface RegisteredEventsResult {
  registeredEvents: RegisteredEvent[]
  registeredEventsByFilter: (_tag: RegisteredEventTag) => RegisteredEvent[]
  isLoading: boolean
  error: ApiError | null
  fetchMoreRegisteredEvents: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

export function useRegisteredEvents(): RegisteredEventsResult {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = getRegisteredEvents()

  const registeredEvents = useMemo(() => {
    if (data) {
      return data.pages.flatMap((page) => page.data)
    }
    return []
  }, [data])

  const registeredEventsByFilter = (tag: RegisteredEventTag) =>
    registeredEvents.filter((event) => event.tags.includes(tag))

  return {
    registeredEvents,
    registeredEventsByFilter,
    fetchMoreRegisteredEvents: fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
    isLoading,
    error
  }
}
