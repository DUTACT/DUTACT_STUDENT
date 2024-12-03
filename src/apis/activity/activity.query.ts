import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query'
import { queryFetch } from 'src/config/queryClient'
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from 'src/constants/common'
import { BASE_API_URL_ACTIVITY } from 'src/constants/endpoints'
import { Activity } from 'src/types/activity.type'
import { ApiError } from 'src/types/client.type'
import { PageInfo } from 'src/types/pagination.type'

export const getActivitiesOfStudent = (
  options?: UseInfiniteQueryOptions<PageInfo<Activity>, ApiError, PageInfo<Activity>>
) => {
  return useInfiniteQuery<PageInfo<Activity>, ApiError>({
    queryKey: ['getActivitiesOfStudent'],
    queryFn: async ({ pageParam }) => {
      const response = await queryFetch<PageInfo<Activity>>({
        url: BASE_API_URL_ACTIVITY,
        inputParams: {
          page: pageParam,
          pageSize: DEFAULT_PAGE_SIZE
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
    }
  })
}
