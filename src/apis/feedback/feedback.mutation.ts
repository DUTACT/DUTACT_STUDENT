import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { mutationFetch, mutationFormData } from 'src/config/queryClient'
import { getFeedbackUrl } from 'src/constants/endpoints'
import { ApiError } from 'src/types/client.type'
import { Feedback, FeedbackBody } from 'src/types/feedback.type'

export const createFeedback = (options?: UseMutationOptions<Feedback, ApiError, Partial<FeedbackBody>>) => {
  return useMutation<Feedback, ApiError, Partial<FeedbackBody>>({
    mutationFn: async (body) => {
      const response = await mutationFormData<Feedback>({
        url: getFeedbackUrl(),
        method: 'POST',
        body
      })
      return response
    },
    ...options
  })
}

export const deleteFeedback = (options?: UseMutationOptions<number, ApiError, number>) => {
  return useMutation<number, ApiError, number>({
    mutationFn: async (feedbackId: number) => {
      await mutationFetch<number>({
        url: getFeedbackUrl(feedbackId),
        method: 'DELETE'
      })
      return feedbackId
    },
    ...options
  })
}

export const editFeedback = (
  feedbackId: number,
  options?: UseMutationOptions<Feedback, ApiError, Partial<FeedbackBody>>
) => {
  return useMutation<Feedback, ApiError, Partial<FeedbackBody>>({
    mutationFn: async (body) => {
      const response = await mutationFormData<Feedback>({
        url: getFeedbackUrl(feedbackId),
        method: 'PATCH',
        body
      })
      return response
    },
    ...options
  })
}
