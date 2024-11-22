import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { likeFeedbackFn, unlikeFeedbackFn } from 'src/apis/feedback'
import { getNewsFeeds } from 'src/apis/newsfeed'
import { likePostFn, unlikePostFn } from 'src/apis/post'
import { ApiError } from 'src/types/client.type'
import { NewsFeedItem } from 'src/types/newsfeed.type'

interface NewsFeedResult {
  newsfeeds: NewsFeedItem[]
  isLoading: boolean
  error: ApiError | null
  onLikeNewsFeed: UseMutationResult<number, ApiError, { id: number; type: 'post' | 'feedback' }>
  onUnlikeNewsFeed: UseMutationResult<number, ApiError, { id: number; type: 'post' | 'feedback' }>
}

export function useNewsFeeds(): NewsFeedResult {
  const queryClient = useQueryClient()

  const { data: newsfeeds = [], isLoading, error } = getNewsFeeds()

  const onLikeNewsFeed = useMutation<
    number,
    ApiError,
    { id: number; type: 'post' | 'feedback' },
    { previousNewsFeeds?: NewsFeedItem[] }
  >({
    mutationFn: async ({ id, type }) => {
      if (type === 'post') {
        return likePostFn(id)
      } else {
        return likeFeedbackFn(id)
      }
    },
    onMutate: async ({ id, type }) => {
      await queryClient.cancelQueries({ queryKey: ['getNewsFeeds'] })

      const previousNewsFeeds = queryClient.getQueryData<NewsFeedItem[]>(['getNewsFeeds'])

      queryClient.setQueryData<NewsFeedItem[]>(['getNewsFeeds'], (currentNewsFeeds) =>
        currentNewsFeeds?.map((item) => {
          if (item.id === id && item.type === type) {
            return {
              ...item,
              likedAt: new Date().toISOString(),
              likedNumber: item.likedNumber + 1
            }
          }
          return item
        })
      )

      return { previousNewsFeeds }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousNewsFeeds) {
        queryClient.setQueryData(['getNewsFeeds'], context.previousNewsFeeds)
      }
    }
  })

  const onUnlikeNewsFeed = useMutation<
    number,
    ApiError,
    { id: number; type: 'post' | 'feedback' },
    { previousNewsFeeds?: NewsFeedItem[] }
  >({
    mutationFn: async ({ id, type }) => {
      if (type === 'post') {
        return unlikePostFn(id)
      } else {
        return unlikeFeedbackFn(id)
      }
    },
    onMutate: async ({ id, type }) => {
      await queryClient.cancelQueries({ queryKey: ['getNewsFeeds'] })

      const previousNewsFeeds = queryClient.getQueryData<NewsFeedItem[]>(['getNewsFeeds'])

      queryClient.setQueryData<NewsFeedItem[]>(['getNewsFeeds'], (currentFeeds) =>
        currentFeeds?.map((item) => {
          if (item.id === id && item.type === type) {
            return {
              ...item,
              likedAt: null,
              likedNumber: item.likedNumber - 1
            }
          }
          return item
        })
      )

      return { previousNewsFeeds }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousNewsFeeds) {
        queryClient.setQueryData(['getNewsFeeds'], context.previousNewsFeeds)
      }
    }
  })
  return { newsfeeds, isLoading, error, onLikeNewsFeed, onUnlikeNewsFeed }
}
