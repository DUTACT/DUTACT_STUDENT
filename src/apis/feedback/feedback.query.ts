import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { queryFetch } from 'src/config/queryClient'
import { STALE_TIME } from 'src/constants/common'
import { getFeedbackUrl } from 'src/constants/endpoints'
import { ApiError } from 'src/types/client.type'
import { Feedback } from 'src/types/feedback.type'

export const getFeedbacks = (
  params?: {
    eventId?: number
    studentId?: number
  },
  options?: UseQueryOptions<Feedback[], ApiError>
) => {
  return useQuery<Feedback[], ApiError>({
    queryKey: ['getFeedbacks', params],
    queryFn: async () => {
      const response = await queryFetch<Feedback[]>({
        url: getFeedbackUrl(),
        inputParams: params
      })
      return response
    },
    staleTime: options?.staleTime ?? STALE_TIME,
    ...options
  })
}

export const getFeedbackById = (feedbackId: number, options?: UseQueryOptions<Feedback, ApiError>) => {
  return useQuery<Feedback, ApiError>({
    queryKey: ['getFeedbackById', feedbackId],
    queryFn: async () => {
      const response = await queryFetch<Feedback>({
        url: getFeedbackUrl(feedbackId)
      })
      return response
    },
    staleTime: options?.staleTime ?? STALE_TIME,
    ...options
  })
}
