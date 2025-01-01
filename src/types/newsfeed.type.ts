type BaseNewsFeed = {
  event: {
    id: number
    name: string
    coverPhotoUrl: string
  }
  id: number
  content: string
  postedAt: string
  coverPhotoUrls: string[]
  likedNumber: number
  likedAt: string | null
}

type FeedbackInNewsFeed = BaseNewsFeed & {
  type: 'feedback'
  student: {
    id: number
    name: string
    avatarUrl: string
  }
}

type PostInNewsFeed = BaseNewsFeed & {
  type: 'post'
  organizer: {
    id: number
    name: string
    avatarUrl: string
  }
}

export type NewsFeedItem = FeedbackInNewsFeed | PostInNewsFeed
