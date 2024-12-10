import { Post } from './post.type'

export type NotificationType = 'post_created' | 'event_start_remind'

export type CommonNotification = {
  id: number
  account_id: number
  created_at: string
  notification_type: NotificationType
}

export type PostCreatedNotification = CommonNotification & {
  notification_type: 'post_created'
  details: Post
}

export type EventStartRemindNotification = CommonNotification & {
  notification_type: 'event_start_remind'
  details: {
    eventId: number
    eventName: string
    startAt: string
  }
}

export type EventNotification = PostCreatedNotification | EventStartRemindNotification
