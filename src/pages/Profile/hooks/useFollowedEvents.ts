import { useMemo } from 'react'
import { getFollowedEvents } from 'src/apis/event'
import { RegisteredEvent } from 'src/types/event.type'
import { ApiError } from 'src/types/client.type'

interface FollowedEventsResult {
  followedEvents: RegisteredEvent[]
  isLoading: boolean
  error: ApiError | null
  fetchMoreFollowedEvents: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

export function useFollowedEvents(): FollowedEventsResult {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = getFollowedEvents()

  const followedEvents = useMemo(() => {
    if (data) {
      return data.pages.flatMap((page) => page.data)
    }
    return []
  }, [data])

  return {
    followedEvents,
    fetchMoreFollowedEvents: fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
    isLoading,
    error
  }
}
