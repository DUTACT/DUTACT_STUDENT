import { EventOfOrganizer, FollowResponse, RegisterResponse } from 'src/types/event.type'
import { followEvent, getEventById, registerEvent, unfollowEvent, unregisterEvent } from 'src/apis/event'
import { ApiError } from 'src/types/client.type'
import { UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

interface DetailEventResult {
  event: EventOfOrganizer | undefined
  isLoading: boolean
  error: ApiError | null
  register: UseMutationResult<RegisterResponse, ApiError, number>
  unregister: UseMutationResult<number, ApiError, number>
  follow: UseMutationResult<FollowResponse, ApiError, number>
  unfollow: UseMutationResult<number, ApiError, number>
}

export function useDetailEvent(eventId: number): DetailEventResult {
  const { data: event, isLoading, error } = getEventById(eventId)
  const queryClient = useQueryClient()

  const register = registerEvent({
    onSuccess: (data: RegisterResponse) => {
      queryClient.setQueryData<EventOfOrganizer>(['getEventById', eventId], (currentEvent) => {
        return currentEvent
          ? {
              ...currentEvent,
              registeredAt: data.registeredAt,
              registerNumber: currentEvent.registerNumber + 1,
              followedAt: data.registeredAt,
              followerNumber: currentEvent.followerNumber + 1
            }
          : undefined
      })
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    }
  })

  const unregister = unregisterEvent({
    onSuccess: () => {
      queryClient.setQueryData<EventOfOrganizer>(['getEventById', eventId], (currentEvent) => {
        return currentEvent
          ? { ...currentEvent, registeredAt: null, registerNumber: currentEvent.registerNumber - 1 }
          : undefined
      })
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    }
  })

  const follow = followEvent({
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getEventById', eventId] })

      const previousEvent = queryClient.getQueryData<EventOfOrganizer>(['getEventById', eventId])

      queryClient.setQueryData<EventOfOrganizer>(['getEventById', eventId], (currentEvent) => {
        return currentEvent
          ? { ...currentEvent, followedAt: new Date().toISOString(), followerNumber: currentEvent.followerNumber + 1 }
          : undefined
      })

      return { previousEvents: previousEvent ? [previousEvent] : undefined }
    },
    onError: (_error, _eventId, context: { previousEvents?: EventOfOrganizer[] } | undefined) => {
      if (context?.previousEvents) {
        queryClient.setQueryData(['getEventById', eventId], context.previousEvents[0])
      }
    }
  })

  const unfollow = unfollowEvent({
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['getEventById', eventId] })

      const previousEvent = queryClient.getQueryData<EventOfOrganizer>(['getEventById', eventId])

      queryClient.setQueryData<EventOfOrganizer>(['getEventById', eventId], (currentEvent) => {
        return currentEvent
          ? { ...currentEvent, followedAt: null, followerNumber: currentEvent.followerNumber - 1 }
          : undefined
      })

      return { previousEvents: previousEvent ? [previousEvent] : undefined }
    },
    onError: (_error, _eventId, context: { previousEvents?: EventOfOrganizer[] } | undefined) => {
      if (context?.previousEvents) {
        queryClient.setQueryData(['getEventById', eventId], context.previousEvents[0])
      }
    }
  })

  return {
    event,
    isLoading,
    error,
    register,
    unregister,
    follow,
    unfollow
  }
}
