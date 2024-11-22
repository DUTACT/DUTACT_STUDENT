import { ApiError } from 'src/types/client.type'
import { getStudentProfile } from 'src/apis/profile'
import { useStudentId } from './useStudentId'
import { StudentProfile } from 'src/types/profile.type'

interface ProfileResult {
  profile: StudentProfile | undefined
  isLoading: boolean
  error: ApiError | null
}

export function useProfile(): ProfileResult {
  const organizerId = useStudentId()

  const { data: profile, isLoading, error } = getStudentProfile(organizerId)

  return {
    profile,
    isLoading,
    error
  }
}
