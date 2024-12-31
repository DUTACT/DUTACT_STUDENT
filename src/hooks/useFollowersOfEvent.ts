import { ApiError } from 'src/types/client.type'
import { StudentInfo } from 'src/types/profile.type'
import { getFollowersOfEvent } from 'src/apis/event'

interface FollowersOfEventResult {
  followers: StudentInfo[]
  isLoading: boolean
  error: ApiError | null
}

export function useFollowersOfEvent(eventId: number): FollowersOfEventResult {
  const { data: followers = [], isLoading, error } = getFollowersOfEvent(eventId)

  return {
    followers,
    isLoading,
    error
  }
}
