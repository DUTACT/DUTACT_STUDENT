import { useMemo } from 'react'
import { getConfirmedEvents } from 'src/apis/event'
import { RegisteredEvent } from 'src/types/event.type'
import { ApiError } from 'src/types/client.type'

interface ConfirmedEventsResult {
  confirmedEvents: RegisteredEvent[]
  isLoading: boolean
  error: ApiError | null
  fetchMoreConfirmedEvents: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

export function useConfirmedEvents(): ConfirmedEventsResult {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = getConfirmedEvents()

  const confirmedEvents = useMemo(() => {
    if (data) {
      return data.pages.flatMap((page) => page.data)
    }
    return []
  }, [data])

  return {
    confirmedEvents,
    fetchMoreConfirmedEvents: fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
    isLoading,
    error
  }
}
