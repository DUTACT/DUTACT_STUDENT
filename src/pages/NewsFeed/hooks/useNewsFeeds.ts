import { getNewsFeeds } from 'src/apis/newsfeed'
import { ApiError } from 'src/types/client.type'
import { NewsFeedItem } from 'src/types/newsfeed.type'

interface NewsFeedResult {
  newsfeeds: NewsFeedItem[]
  isLoading: boolean
  error: ApiError | null
}

export function useNewsFeeds(): NewsFeedResult {
  const { data: newsfeeds = [], isLoading, error } = getNewsFeeds()

  return { newsfeeds, isLoading, error }
}
