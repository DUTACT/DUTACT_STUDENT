import { ApiError } from 'src/types/client.type'
import { StudentInfo } from 'src/types/profile.type'
import { getRegistrantsOfEvent } from 'src/apis/event'

interface RegistrantsOfEventResult {
  registrants: StudentInfo[]
  isLoading: boolean
  error: ApiError | null
}

export function useRegistrantsOfEvent(eventId: number): RegistrantsOfEventResult {
  const { data: registrants = [], isLoading, error } = getRegistrantsOfEvent(eventId)

  return {
    registrants,
    isLoading,
    error
  }
}
