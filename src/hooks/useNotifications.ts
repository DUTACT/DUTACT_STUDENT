import { useMemo } from 'react'
import { ApiError } from 'src/types/client.type'
import { getNotifications } from 'src/apis/notification'
import { EventNotification } from 'src/types/notification.type'
import { useQueryClient } from '@tanstack/react-query'

interface NotificationsResult {
  notifications: EventNotification[]
  isLoading: boolean
  error: ApiError | null
  fetchMoreNotifications: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
  addNotificationToCache: (_newNotification: EventNotification) => void
}

export function useNotifications(): NotificationsResult {
  const queryClient = useQueryClient()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = getNotifications()

  const notifications = useMemo(() => {
    if (data) {
      return data.pages.flatMap((page) => page.data)
    }
    return []
  }, [data])

  const addNotificationToCache = (newNotification: EventNotification) => {
    queryClient.setQueryData(['getNotifications'], (prevData: any) => {
      if (prevData && prevData.pages && Array.isArray(prevData.pages[0])) {
        const updatedPages = [...prevData.pages]
        updatedPages[0] = [newNotification, ...updatedPages[0]]
        return { ...prevData, pages: updatedPages }
      }
      return prevData
    })
  }

  return {
    notifications,
    fetchMoreNotifications: fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
    isLoading,
    error,
    addNotificationToCache
  }
}
