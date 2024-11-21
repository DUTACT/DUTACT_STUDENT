import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { mutationFetch } from 'src/config/queryClient'
import { getPostUrl } from 'src/constants/endpoints'
import { ApiError } from 'src/types/client.type'
import { Post } from 'src/types/post.type'

export const likePostFn = async (postId: number) => {
  await mutationFetch<number>({
    url: `${getPostUrl(postId)}/like`,
    method: 'POST'
  })
  return postId
}

export const unlikePostFn = async (postId: number) => {
  await mutationFetch<number>({
    url: `${getPostUrl(postId)}/like`,
    method: 'DELETE'
  })
  return postId
}

export const likePost = (
  options?: UseMutationOptions<number, ApiError, number, { previousPosts?: Post[] } | undefined>
) => {
  return useMutation<number, ApiError, number, { previousPosts?: Post[] } | undefined>({
    mutationFn: likePostFn,
    ...options
  })
}

export const unlikePost = (
  options?: UseMutationOptions<number, ApiError, number, { previousPosts?: Post[] } | undefined>
) => {
  return useMutation<number, ApiError, number, { previousPosts?: Post[] } | undefined>({
    mutationFn: unlikePostFn,
    ...options
  })
}
