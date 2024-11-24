import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { mutationFetch, mutationFormData } from 'src/config/queryClient'
import { ApiError } from 'src/types/client.type'
import { getProfileUrl } from 'src/constants/endpoints'
import { ChangePasswordBody, StudentProfile, UpdateStudentProfileBody } from 'src/types/profile.type'

export const updateProfile = (
  studentId: number,
  options?: UseMutationOptions<StudentProfile, ApiError, Partial<UpdateStudentProfileBody>>
) => {
  return useMutation<StudentProfile, ApiError, Partial<UpdateStudentProfileBody>>({
    mutationFn: async (body) => {
      const response = await mutationFormData<StudentProfile>({
        url: getProfileUrl(studentId),
        method: 'PATCH',
        body
      })
      return response
    },
    ...options
  })
}

export const changePassword = (
  studentId: number,
  options?: UseMutationOptions<undefined, ApiError, ChangePasswordBody>
) => {
  return useMutation<undefined, ApiError, ChangePasswordBody>({
    mutationFn: async (body) => {
      const response = await mutationFetch<undefined>({
        url: `${getProfileUrl(studentId)}/change-password`,
        method: 'PUT',
        body
      })
      return response
    },
    ...options
  })
}
