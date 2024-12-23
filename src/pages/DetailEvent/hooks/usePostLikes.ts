import { ApiError } from 'src/types/client.type'
import { StudentLikeInfo } from 'src/types/profile.type'
import { getLikesOfPost } from 'src/apis/post'

interface PostLikesResult {
  likes: StudentLikeInfo[]
  isLoading: boolean
  error: ApiError | null
}

export function usePostLikes(postId: number): PostLikesResult {
  const { data: likes = [], isLoading, error } = getLikesOfPost(postId)

  return {
    likes,
    isLoading,
    error
  }
}
