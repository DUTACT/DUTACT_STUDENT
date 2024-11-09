import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { ApiError } from 'src/types/client.type'
import { mutationFetch } from 'src/config/queryClient'
import { AuthBody, AuthResponse } from 'src/types/account.type'
import { AUTH_URL } from 'src/constants/endpoints'

export const login = (options?: UseMutationOptions<AuthResponse, ApiError, AuthBody>) => {
  return useMutation<AuthResponse, ApiError, AuthBody>({
    mutationFn: async (body) => {
      return await mutationFetch({
        url: AUTH_URL.LOGIN,
        method: 'POST',
        body
      })
    },
    ...options
  })
}
