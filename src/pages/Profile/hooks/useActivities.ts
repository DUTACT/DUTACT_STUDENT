import { useMemo } from 'react'
import { ApiError } from 'src/types/client.type'
import { Activity } from 'src/types/activity.type'
import { getActivitiesOfStudent } from 'src/apis/activity'

interface ActivitiesResult {
  activities: Activity[]
  isLoading: boolean
  error: ApiError | null
  fetchMoreActivities: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

export function useActivities(): ActivitiesResult {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = getActivitiesOfStudent()

  const activities = useMemo(() => {
    if (data) {
      return data.pages.flatMap((page) => page.data)
    }
    return []
  }, [data])

  return {
    activities,
    fetchMoreActivities: fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
    isLoading,
    error
  }
}
