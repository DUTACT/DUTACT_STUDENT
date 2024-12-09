import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { ApiError } from 'src/types/client.type'
import { mutationFetch } from 'src/config/queryClient'
import { AuthBody, AuthResponse, ConfirmRegistrationBody, RegisterBody } from 'src/types/account.type'
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

export const register = (options?: UseMutationOptions<void, ApiError, RegisterBody>) => {
  return useMutation<void, ApiError, RegisterBody>({
    mutationFn: async (body) => {
      return await mutationFetch({
        url: AUTH_URL.REGISTER,
        method: 'POST',
        body
      })
    },
    ...options
  })
}

export const confirmRegistration = (options?: UseMutationOptions<void, ApiError, ConfirmRegistrationBody>) => {
  return useMutation<void, ApiError, ConfirmRegistrationBody>({
    mutationFn: async (body) => {
      return await mutationFetch({
        url: AUTH_URL.CONFIRM_REGISTRATION,
        method: 'PUT',
        body
      })
    },
    ...options
  })
}