import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { queryFetch } from 'src/config/queryClient'
import { STALE_TIME } from 'src/constants/common'
import { getLikesOfPostOrFeedback, getPostUrl } from 'src/constants/endpoints'
import { ApiError } from 'src/types/client.type'
import { Post } from 'src/types/post.type'
import { StudentInfo } from 'src/types/profile.type'

export const getPostsOfEvent = (eventId: number, options?: UseQueryOptions<Post[], ApiError>) => {
  return useQuery<Post[], ApiError>({
    queryKey: ['getPostsOfEvent', eventId],
    queryFn: async () => {
      const response = await queryFetch<Post[]>({
        url: getPostUrl(),
        inputParams: { eventId }
      })
      return response
    },
    staleTime: options?.staleTime ?? STALE_TIME,
    ...options
  })
}

export const getLikesOfPost = (postId: number, options?: UseQueryOptions<StudentInfo[], ApiError>) => {
  return useQuery<StudentInfo[], ApiError>({
    queryKey: ['getLikesOfPost', postId],
    queryFn: async () => {
      const response = await queryFetch<StudentInfo[]>({
        url: getLikesOfPostOrFeedback('posts', postId)
      })
      return response
    },
    ...options
  })
}

export const getLikesOfFeedback = (feedbackId: number, options?: UseQueryOptions<StudentInfo[], ApiError>) => {
  return useQuery<StudentInfo[], ApiError>({
    queryKey: ['getLikesOfFeedback', feedbackId],
    queryFn: async () => {
      const response = await queryFetch<StudentInfo[]>({
        url: getLikesOfPostOrFeedback('feedbacks', feedbackId)
      })
      return response
    },
    ...options
  })
}
