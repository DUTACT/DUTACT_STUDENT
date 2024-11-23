import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { mutationFormData } from 'src/config/queryClient'
import { ApiError } from 'src/types/client.type'
import { getProfileUrl } from 'src/constants/endpoints'
import { StudentProfile, UpdateStudentProfileBody } from 'src/types/profile.type'

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
