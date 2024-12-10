export type ActivityType = 'EVENT_REGISTER' | 'EVENT_FOLLOW' | 'POST_LIKE' | 'FEEDBACK_LIKE' | 'FEEDBACK_CREATE'

export interface Activity {
  id: number
  type: ActivityType
  createdAt: string
  eventId: number
  eventName: string
  postId: number | null
  feedbackId: number | null
}
