import { useMemo } from 'react'
import { ApiError } from 'src/types/client.type'
import { getNotifications } from 'src/apis/notification'
import { EventNotification } from 'src/types/notification.type'

interface NotificationsResult {
  notifications: EventNotification[]
  isLoading: boolean
  error: ApiError | null
  fetchMoreNotifications: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

export function useNotifications(): NotificationsResult {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = getNotifications()

  const notifications = useMemo(() => {
    if (data) {
      return data.pages.flatMap((page) => page.data)
    }
    return []
  }, [data])

  return {
    notifications,
    fetchMoreNotifications: fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
    isLoading,
    error
  }
}
