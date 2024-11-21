import { UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useEventId } from './useEventId'
import { createFeedback, deleteFeedback, getFeedbacks, likeFeedback, unlikeFeedback } from 'src/apis/feedback'
import { Feedback, FeedbackBody } from 'src/types/feedback.type'
import { ApiError } from 'src/types/client.type'
import { toast } from 'react-toastify'
import { SUCCESS_MESSAGE } from 'src/constants/message'

interface FeedbacksResult {
  feedbacks: Feedback[]
  isLoading: boolean
  error: ApiError | null
  createFeedbackMutationResult: UseMutationResult<Feedback, ApiError, Partial<FeedbackBody>>
  deleteFeedbackMutationResult: UseMutationResult<number, ApiError, number>
  onLikeFeedback: UseMutationResult<number, ApiError, number>
  onUnlikeFeedback: UseMutationResult<number, ApiError, number>
}

export function useFeedbacks(): FeedbacksResult {
  const eventId = useEventId()
  const queryClient = useQueryClient()

  const {
    data: feedbacks = [],
    isLoading,
    error
  } = getFeedbacks({
    eventId
  })

  const createFeedbackMutationResult = createFeedback({
    onSuccess: (data) => {
      queryClient.setQueryData<Feedback[]>(['getFeedbacks', { eventId }], (currentFeedbacks) => {
        return currentFeedbacks ? [data, ...currentFeedbacks] : currentFeedbacks
      })
    }
  })

  const deleteFeedbackMutationResult = deleteFeedback({
    onSuccess: (feedbackId) => {
      queryClient.setQueryData<Feedback[]>(['getFeedbacks', { eventId }], (currentFeedbacks) => {
        return currentFeedbacks?.filter((feedback) => feedback.id !== feedbackId)
      })
      toast.success(SUCCESS_MESSAGE.DELETE_FEEDBACK)
    }
  })

  const onLikeFeedback = likeFeedback({
    onMutate: async (feedbackId: number) => {
      await queryClient.cancelQueries({ queryKey: ['getFeedbacks', { eventId }] })

      const previousFeedbacks = queryClient.getQueryData<Feedback[]>(['getFeedbacks', { eventId }])

      queryClient.setQueryData<Feedback[]>(['getFeedbacks', { eventId }], (currentFeedbacks) => {
        return currentFeedbacks?.map((feedback) => {
          if (feedback.id === feedbackId) {
            return { ...feedback, likedAt: new Date().toISOString(), likeNumber: feedback.likeNumber + 1 }
          }
          return feedback
        })
      })

      return { previousFeedbacks }
    },
    onError: (_error: ApiError, _eventId: number, context: { previousFeedbacks?: Feedback[] } | undefined) => {
      if (context?.previousFeedbacks) {
        queryClient.setQueryData(['getFeedbacks', { eventId }], context.previousFeedbacks)
      }
    }
  })

  const onUnlikeFeedback = unlikeFeedback({
    onMutate: async (feedbackId: number) => {
      await queryClient.cancelQueries({ queryKey: ['getFeedbacks', { eventId }] })

      const previousFeedbacks = queryClient.getQueryData<Feedback[]>(['getFeedbacks', { eventId }])

      queryClient.setQueryData<Feedback[]>(['getFeedbacks', { eventId }], (currentFeedbacks) => {
        return currentFeedbacks?.map((feedback) => {
          if (feedback.id === feedbackId) {
            return { ...feedback, likedAt: null, likeNumber: feedback.likeNumber - 1 }
          }
          return feedback
        })
      })

      return { previousFeedbacks }
    },
    onError: (_error: ApiError, _eventId: number, context: { previousFeedbacks?: Feedback[] } | undefined) => {
      if (context?.previousFeedbacks) {
        queryClient.setQueryData(['getFeedbacks', { eventId }], context.previousFeedbacks)
      }
    }
  })

  return {
    feedbacks,
    isLoading,
    error,
    createFeedbackMutationResult,
    deleteFeedbackMutationResult,
    onLikeFeedback,
    onUnlikeFeedback
  }
}
