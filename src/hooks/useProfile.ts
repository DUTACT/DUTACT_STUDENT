import { ApiError } from 'src/types/client.type'
import { getStudentProfile, updateProfile } from 'src/apis/profile'
import { useStudentId } from './useStudentId'
import { StudentProfile, UpdateStudentProfileBody } from 'src/types/profile.type'
import { UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

interface ProfileResult {
  profile: StudentProfile | undefined
  isLoading: boolean
  error: ApiError | null
  onUpdateProfile: UseMutationResult<StudentProfile, ApiError, Partial<UpdateStudentProfileBody>>
}

export function useProfile(): ProfileResult {
  const studentId = useStudentId()
  const queryClient = useQueryClient()

  const { data: profile, isLoading, error } = getStudentProfile(studentId)

  const onUpdateProfile = updateProfile(studentId, {
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData<StudentProfile>(['getStudentProfile', studentId], () => updatedProfile)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return {
    profile,
    isLoading,
    error,
    onUpdateProfile
  }
}
