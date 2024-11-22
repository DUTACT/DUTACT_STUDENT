import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { queryFetch } from 'src/config/queryClient'
import { STALE_TIME } from 'src/constants/common'
import { getProfileUrl } from 'src/constants/endpoints'
import { ApiError } from 'src/types/client.type'
import { StudentProfile } from 'src/types/profile.type'

export const getStudentProfile = (studentId: number, options?: UseQueryOptions<StudentProfile, ApiError>) => {
  return useQuery<StudentProfile, ApiError>({
    queryKey: ['getStudentProfile', studentId],
    queryFn: async () => {
      const response = await queryFetch<StudentProfile>({
        url: getProfileUrl(studentId)
      })
      return response
    },
    staleTime: options?.staleTime ?? STALE_TIME,
    ...options
  })
}
