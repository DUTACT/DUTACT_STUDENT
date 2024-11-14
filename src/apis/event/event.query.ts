import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { queryFetch } from 'src/config/queryClient'
import { STALE_TIME } from 'src/constants/common'
import { getEventUrl } from 'src/constants/endpoints'
import { ApiError } from 'src/types/client.type'
import { EventOfOrganizer } from 'src/types/event.type'

export const getEvents = (options?: UseQueryOptions<EventOfOrganizer[], ApiError>) => {
  return useQuery<EventOfOrganizer[], ApiError>({
    queryKey: ['getEvents'],
    queryFn: async () => {
      const response = await queryFetch<EventOfOrganizer[]>({
        url: getEventUrl()
      })
      return response
    },
    staleTime: options?.staleTime ?? STALE_TIME,
    ...options
  })
}

export const getEventById = (eventId: number, options?: UseQueryOptions<EventOfOrganizer, ApiError>) => {
  return useQuery<EventOfOrganizer, ApiError>({
    queryKey: ['getEventById', eventId],
    queryFn: async () => {
      const response = await queryFetch<EventOfOrganizer>({
        url: getEventUrl(eventId)
      })
      return response
    },
    staleTime: options?.staleTime ?? STALE_TIME,
    ...options
  })
}
