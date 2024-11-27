import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { queryFetch } from 'src/config/queryClient'
import { STALE_TIME } from 'src/constants/common'
import { getEventCheckInUrl } from 'src/constants/endpoints'
import { ApiError } from 'src/types/client.type'
import { EventCheckIn } from 'src/types/eventCheckIn'

export const getEventCheckIns = (eventId: number, options?: UseQueryOptions<EventCheckIn, ApiError>) => {
  return useQuery<EventCheckIn, ApiError>({
    queryKey: ['getEventCheckIns', eventId],
    queryFn: async () => {
      const response = await queryFetch<EventCheckIn>({
        url: `${getEventCheckInUrl(eventId)}/check-in`
      })
      return response
    },
    staleTime: options?.staleTime ?? STALE_TIME,
    ...options
  })
}
