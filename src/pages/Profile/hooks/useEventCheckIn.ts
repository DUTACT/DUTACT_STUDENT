import { ApiError } from 'src/types/client.type'
import { EventCheckIn } from 'src/types/eventCheckIn'
import { getEventCheckIns } from 'src/apis/eventCheckIn/eventCheckIn.query'

interface EventCheckInResult {
  eventCheckIn: EventCheckIn | undefined
  isPending: boolean
  error: ApiError | null
}

export function useEventCheckIn(eventId: number): EventCheckInResult {
  const { data: eventCheckIn, isPending, error } = getEventCheckIns(eventId)

  return {
    eventCheckIn,
    isPending,
    error
  }
}
