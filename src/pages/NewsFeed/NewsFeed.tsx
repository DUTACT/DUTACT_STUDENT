import { toast } from 'react-toastify'
import { useNewsFeeds } from './hooks/useNewsFeeds'
import NewsFeedItem from './components/NewsFeedItem'

export default function NewsFeed() {
  const { newsfeeds, error, isLoading } = useNewsFeeds()

  if (error) {
    toast.error(error.message)
    return
  }

  return (
    <div className='flex h-full w-full max-w-page flex-col items-center bg-neutral-1'>
      <header className='flex h-header-page items-center justify-between'>
        <div className='text-md font-semibold'>Bản tin</div>
      </header>
      <main className='flex w-full flex-grow flex-col gap-4 rounded-xl border border-neutral-3 bg-neutral-0 p-6 shadow-sm'>
        {isLoading && <div>Loading...</div>}
        {!isLoading && newsfeeds.length === 0 && <div>Hiện tại không còn sự kiện nào cả</div>}
        {!isLoading &&
          newsfeeds.length > 0 &&
          newsfeeds.map((newsFeed) => <NewsFeedItem key={newsFeed.id} newsFeed={newsFeed} />)}
      </main>
    </div>
  )
}
