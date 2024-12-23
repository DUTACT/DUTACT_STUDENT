import { ApiError } from 'src/types/client.type'
import { StudentLikeInfo } from 'src/types/profile.type'
import { getLikesOfFeedback } from 'src/apis/post'

interface FeedbackLikesResult {
  likes: StudentLikeInfo[]
  isLoading: boolean
  error: ApiError | null
}

export function useFeedbackLikes(feedbackId: number): FeedbackLikesResult {
  const { data: likes = [], isLoading, error } = getLikesOfFeedback(feedbackId)

  return {
    likes,
    isLoading,
    error
  }
}
