import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { queryFetch } from 'src/config/queryClient'
import { STALE_TIME } from 'src/constants/common'
import { BASE_API_URL_NEWSFEED } from 'src/constants/endpoints'
import { ApiError } from 'src/types/client.type'
import { NewsFeedItem } from 'src/types/newsfeed.type'

export const getNewsFeeds = (options?: UseQueryOptions<NewsFeedItem[], ApiError>) => {
  return useQuery<NewsFeedItem[], ApiError>({
    queryKey: ['getNewsFeeds'],
    queryFn: async () => {
      const response = await queryFetch<NewsFeedItem[]>({
        url: BASE_API_URL_NEWSFEED
      })
      return response
    },
    staleTime: options?.staleTime ?? STALE_TIME,
    ...options
  })
}
