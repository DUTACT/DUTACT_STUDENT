import { ApiError } from 'src/types/client.type'
import { followEvent, getEvents, registerEvent, unfollowEvent, unregisterEvent } from 'src/apis/event'
import { EventOfOrganizer, FollowResponse, RegisterResponse } from 'src/types/event.type'
import { UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

interface EventResult {
  events: EventOfOrganizer[]
  isLoading: boolean
  error: ApiError | null
  register: UseMutationResult<RegisterResponse, ApiError, number>
  unregister: UseMutationResult<number, ApiError, number>
  follow: UseMutationResult<FollowResponse, ApiError, number>
  unfollow: UseMutationResult<number, ApiError, number>
}

export function useEvents(): EventResult {
  const queryClient = useQueryClient()

  const { data: events = [], isLoading, error } = getEvents()

  const register = registerEvent({
    onSuccess: (data: RegisterResponse) => {
      queryClient.setQueryData<EventOfOrganizer[]>(['getEvents'], (currentEvents) => {
        return currentEvents?.map((event) => {
          if (event.id === data.eventId) {
            return { ...event, registeredAt: data.registeredAt }
          }
          return event
        })
      })
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    }
  })

  const unregister = unregisterEvent({
    onSuccess: (eventId: number) => {
      queryClient.setQueryData<EventOfOrganizer[]>(['getEvents'], (currentEvents) => {
        return currentEvents?.map((event) => {
          if (event.id === eventId) {
            return { ...event, registeredAt: null }
          }
          return event
        })
      })
    },
    onError: (error: ApiError) => {
      toast.error(error.message)
    }
  })

  const follow = followEvent({
    onMutate: async (eventId: number) => {
      await queryClient.cancelQueries({ queryKey: ['getEvents'] })

      const previousEvents = queryClient.getQueryData<EventOfOrganizer[]>(['getEvents'])

      queryClient.setQueryData<EventOfOrganizer[]>(['getEvents'], (currentEvents) => {
        return currentEvents?.map((event) => {
          if (event.id === eventId) {
            return { ...event, followedAt: new Date().toISOString() }
          }
          return event
        })
      })

      return { previousEvents }
    },
    onError: (_error: ApiError, _eventId: number, context: { previousEvents?: EventOfOrganizer[] } | undefined) => {
      if (context?.previousEvents) {
        queryClient.setQueryData(['getEvents'], context.previousEvents)
      }
    }
  })

  const unfollow = unfollowEvent({
    onMutate: async (eventId: number) => {
      await queryClient.cancelQueries({ queryKey: ['getEvents'] })

      const previousEvents = queryClient.getQueryData<EventOfOrganizer[]>(['getEvents'])

      queryClient.setQueryData<EventOfOrganizer[]>(['getEvents'], (currentEvents) => {
        return currentEvents?.map((event) => {
          if (event.id === eventId) {
            return { ...event, followedAt: null }
          }
          return event
        })
      })

      return { previousEvents }
    },
    onError: (_error: ApiError, _eventId: number, context: { previousEvents?: EventOfOrganizer[] } | undefined) => {
      if (context?.previousEvents) {
        queryClient.setQueryData(['getEvents'], context.previousEvents)
      }
    }
  })

  return {
    events,
    isLoading,
    error,
    register,
    unregister,
    follow,
    unfollow
  }
}
