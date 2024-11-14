import { UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { editFeedback, getFeedbackById } from 'src/apis/feedback'
import { Feedback, FeedbackBody } from 'src/types/feedback.type'
import { ApiError } from 'src/types/client.type'

interface FeedbackResult {
  feedback: Feedback | undefined
  isLoading: boolean
  error: ApiError | null
  editFeedbackMutationResult: UseMutationResult<Feedback, ApiError, Partial<FeedbackBody>>
}

export function useFeedback(feedbackId: number): FeedbackResult {
  const queryClient = useQueryClient()

  const { data: feedback, isLoading, error } = getFeedbackById(feedbackId)

  const editFeedbackMutationResult = editFeedback(feedbackId, {
    onSuccess: (data) => {
      queryClient.setQueryData<Feedback>(['getFeedbackById', feedbackId], () => {
        return data
      })
      queryClient.setQueriesData<Feedback[]>({ queryKey: ['getFeedbacks'] }, (currentFeedbacks) =>
        currentFeedbacks ? currentFeedbacks.map((feedback) => (feedback.id === data.id ? data : feedback)) : [data]
      )
    }
  })

  return { feedback, isLoading, error, editFeedbackMutationResult }
}
