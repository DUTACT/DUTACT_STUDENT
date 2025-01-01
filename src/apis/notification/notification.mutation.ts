import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { mutationFetch } from 'src/config/queryClient'
import { BASE_API_URL_NOTIFICATIONS } from 'src/constants/endpoints'
import { ApiError } from 'src/types/client.type'

export const markAllNotificationsAsRead = (options?: UseMutationOptions<void, ApiError>) => {
  return useMutation<void, ApiError>({
    mutationFn: async () => {
      await mutationFetch<void>({
        url: `${BASE_API_URL_NOTIFICATIONS}/mark-all-as-read`,
        method: 'POST'
      })
      return
    },
    ...options
  })
}
