import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { mutationFetch } from 'src/config/queryClient'
import { getEventUrl } from 'src/constants/endpoints'
import { ApiError } from 'src/types/client.type'
import { EventOfOrganizer, FollowResponse, RegisterResponse } from 'src/types/event.type'

export const registerEvent = (options?: UseMutationOptions<RegisterResponse, ApiError, number>) => {
  return useMutation<RegisterResponse, ApiError, number>({
    mutationFn: async (eventId: number) => {
      const response = await mutationFetch<RegisterResponse>({
        url: `${getEventUrl(eventId, 'register')}`,
        method: 'POST'
      })
      return response
    },
    ...options
  })
}

export const unregisterEvent = (options?: UseMutationOptions<number, ApiError, number>) => {
  return useMutation<number, ApiError, number>({
    mutationFn: async (eventId: number) => {
      await mutationFetch<number>({
        url: `${getEventUrl(eventId, 'unregister')}`,
        method: 'POST'
      })
      return eventId
    },
    ...options
  })
}

export const followEvent = (
  options?: UseMutationOptions<FollowResponse, ApiError, number, { previousEvents?: EventOfOrganizer[] } | undefined>
) => {
  return useMutation<FollowResponse, ApiError, number, { previousEvents?: EventOfOrganizer[] } | undefined>({
    mutationFn: async (eventId: number) => {
      const response = await mutationFetch<FollowResponse>({
        url: `${getEventUrl(eventId, 'follow')}`,
        method: 'POST'
      })
      return response
    },
    ...options
  })
}

export const unfollowEvent = (
  options?: UseMutationOptions<number, ApiError, number, { previousEvents?: EventOfOrganizer[] } | undefined>
) => {
  return useMutation<number, ApiError, number, { previousEvents?: EventOfOrganizer[] } | undefined>({
    mutationFn: async (eventId: number) => {
      await mutationFetch<number>({
        url: `${getEventUrl(eventId, 'unfollow')}`,
        method: 'POST'
      })
      return eventId
    },
    ...options
  })
}
