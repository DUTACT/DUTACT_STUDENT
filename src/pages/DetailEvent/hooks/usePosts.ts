import { ApiError } from 'src/types/client.type'
import { getPostsOfEvent, likePost, unlikePost } from 'src/apis/post'
import { Post } from 'src/types/post.type'
import { UseMutationResult, useQueryClient } from '@tanstack/react-query'

interface PostResult {
  posts: Post[]
  isLoading: boolean
  error: ApiError | null
  onLikePost: UseMutationResult<number, ApiError, number>
  onUnlikePost: UseMutationResult<number, ApiError, number>
}

export function usePosts(eventId: number): PostResult {
  const queryClient = useQueryClient()

  const { data: posts = [], isLoading, error } = getPostsOfEvent(eventId)

  const onLikePost = likePost({
    onMutate: async (postId: number) => {
      console.log('postId', postId)
      await queryClient.cancelQueries({ queryKey: ['getPostsOfEvent', eventId] })

      const previousPosts = queryClient.getQueryData<Post[]>(['getPostsOfEvent', eventId])

      queryClient.setQueryData<Post[]>(['getPostsOfEvent', eventId], (currentPosts) => {
        return currentPosts?.map((post) => {
          if (post.id === postId) {
            return { ...post, likedAt: new Date().toISOString(), likeNumber: post.likeNumber + 1 }
          }
          return post
        })
      })

      return { previousPosts }
    },
    onError: (_error: ApiError, _eventId: number, context: { previousPosts?: Post[] } | undefined) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['getPostsOfEvent', eventId], context.previousPosts)
      }
    }
  })

  const onUnlikePost = unlikePost({
    onMutate: async (postId: number) => {
      await queryClient.cancelQueries({ queryKey: ['getPostsOfEvent', eventId] })

      const previousPosts = queryClient.getQueryData<Post[]>(['getPostsOfEvent', eventId])

      queryClient.setQueryData<Post[]>(['getPostsOfEvent', eventId], (currentPosts) => {
        return currentPosts?.map((post) => {
          if (post.id === postId) {
            return { ...post, likedAt: null, likeNumber: post.likeNumber - 1 }
          }
          return post
        })
      })

      return { previousPosts }
    },
    onError: (_error: ApiError, _eventId: number, context: { previousPosts?: Post[] } | undefined) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['getPostsOfEvent', eventId], context.previousPosts)
      }
    }
  })

  return {
    posts,
    isLoading,
    error,
    onLikePost,
    onUnlikePost
  }
}
