import { useInfiniteQuery, UseInfiniteQueryOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { queryFetch } from 'src/config/queryClient'
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, STALE_TIME } from 'src/constants/common'
import { BASE_API_URL_EVENT, getEventUrl } from 'src/constants/endpoints'
import { ApiError } from 'src/types/client.type'
import { EventOfOrganizer, RegisteredEvent } from 'src/types/event.type'
import { PageInfo } from 'src/types/pagination.type'
import { StudentInfo } from 'src/types/profile.type'
import { generateRegisteredEventTags } from 'src/utils/event'

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

export const getRegisteredEvents = (
  options?: UseInfiniteQueryOptions<PageInfo<RegisteredEvent>, ApiError, PageInfo<RegisteredEvent>>
) => {
  return useInfiniteQuery<PageInfo<RegisteredEvent>, ApiError>({
    queryKey: ['getRegisteredEvents'],
    queryFn: async ({ pageParam }) => {
      const response = await queryFetch<PageInfo<RegisteredEvent>>({
        url: `${getEventUrl()}/registered`,
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
      select: (data) => ({
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          data: page.data.map((registeredEvent) => ({
            ...registeredEvent,
            tags: generateRegisteredEventTags(registeredEvent)
          }))
        })),
        pageParams: data.pageParams || []
      })
    }
  })
}

export const getFollowedEvents = (
  options?: UseInfiniteQueryOptions<PageInfo<RegisteredEvent>, ApiError, PageInfo<RegisteredEvent>>
) => {
  return useInfiniteQuery<PageInfo<RegisteredEvent>, ApiError>({
    queryKey: ['getFollowedEvents'],
    queryFn: async ({ pageParam }) => {
      const response = await queryFetch<PageInfo<RegisteredEvent>>({
        url: `${getEventUrl()}/followed`,
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
      select: (data) => ({
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          data: page.data.map((followedEvent) => ({
            ...followedEvent,
            tags: generateRegisteredEventTags(followedEvent)
          }))
        })),
        pageParams: data.pageParams || []
      })
    }
  })
}

export const getConfirmedEvents = (
  options?: UseInfiniteQueryOptions<PageInfo<RegisteredEvent>, ApiError, PageInfo<RegisteredEvent>>
) => {
  return useInfiniteQuery<PageInfo<RegisteredEvent>, ApiError>({
    queryKey: ['getConfirmedEvents'],
    queryFn: async ({ pageParam }) => {
      const response = await queryFetch<PageInfo<RegisteredEvent>>({
        url: `${getEventUrl()}/confirmed`,
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
      select: (data) => ({
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          data: page.data.map((confirmedEvent) => ({
            ...confirmedEvent,
            tags: generateRegisteredEventTags(confirmedEvent)
          }))
        })),
        pageParams: data.pageParams || []
      })
    }
  })
}

export const getFollowersOfEvent = (eventId: number, options?: UseQueryOptions<StudentInfo[], ApiError>) => {
  return useQuery<StudentInfo[], ApiError>({
    queryKey: ['getFollowersOfEvent', eventId],
    queryFn: async () => {
      const response = await queryFetch<StudentInfo[]>({
        url: `${BASE_API_URL_EVENT}/followers/${eventId}`
      })
      return response
    },
    ...options
  })
}

export const getRegistrantsOfEvent = (eventId: number, options?: UseQueryOptions<StudentInfo[], ApiError>) => {
  return useQuery<StudentInfo[], ApiError>({
    queryKey: ['getRegistrantsOfEvent', eventId],
    queryFn: async () => {
      const response = await queryFetch<StudentInfo[]>({
        url: `${BASE_API_URL_EVENT}/registrants/${eventId}`
      })
      return response
    },
    ...options
  })
}
