import { ApiError } from 'src/types/client.type'
import { getPostsOfEvent } from 'src/apis/post'
import { Post } from 'src/types/post.type'

interface PostResult {
  posts: Post[]
  isLoading: boolean
  error: ApiError | null
}

export function usePosts(eventId: number): PostResult {
  const { data: posts = [], isLoading, error } = getPostsOfEvent(eventId)

  return {
    posts,
    isLoading,
    error
  }
}
