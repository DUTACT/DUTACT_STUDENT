import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query'
import { queryFetch } from 'src/config/queryClient'
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from 'src/constants/common'
import { BASE_API_URL_NOTIFICATIONS } from 'src/constants/endpoints'
import { ApiError } from 'src/types/client.type'
import { EventNotification } from 'src/types/notification.type'
import { PageInfo } from 'src/types/pagination.type'

export const getNotifications = (
  options?: UseInfiniteQueryOptions<PageInfo<EventNotification>, ApiError, PageInfo<EventNotification>>
) => {
  return useInfiniteQuery<PageInfo<EventNotification>, ApiError>({
    queryKey: ['getNotifications'],
    queryFn: async ({ pageParam }) => {
      const response = await queryFetch<PageInfo<EventNotification>>({
        url: BASE_API_URL_NOTIFICATIONS,
        inputParams: {
          page: pageParam,
          size: DEFAULT_PAGE_SIZE
        }
      })

      return response
    },
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPage } = lastPage.pagination
      return currentPage < totalPage ? currentPage + 1 : undefined
    },
    initialPageParam: DEFAULT_PAGE_NUMBER,
    ...{
      ...options,
      select: (data) => data
    },
    refetchOnWindowFocus: false
  })
}
