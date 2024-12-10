import { useInView } from 'react-intersection-observer'
import { toast } from 'react-toastify'
import { useNotifications } from 'src/hooks/useNotifications'
import NotificationContainer from './components/NotificationContainer'

export default function Notification() {
  const { notifications, fetchMoreNotifications, hasNextPage, isFetchingNextPage, isLoading, error } =
    useNotifications()

  const { ref: scrollRef, inView } = useInView({
    threshold: 1.0,
    rootMargin: '100px'
  })

  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchMoreNotifications()
  }

  if (error) {
    toast.error(error.message)
  }

  return (
    <div className='flex h-full w-full max-w-page flex-col items-center bg-neutral-1'>
      <header className='flex h-header-page items-center justify-between'>
        <div className='text-md font-semibold'>Thông báo</div>
      </header>
      <main className='flex w-full flex-grow flex-col gap-4 rounded-xl border border-neutral-3 bg-neutral-0 p-6 shadow-sm'>
        {notifications.length === 0 && isLoading && <div>Loading...</div>}
        {notifications.length > 0 && (
          <div className='flex w-full flex-col gap-3'>
            {notifications.map((notification) => (
              <NotificationContainer key={notification.id} notification={notification} />
            ))}
          </div>
        )}
        {error && <div>Error: {error.message}</div>}
        <div ref={scrollRef} className='h-[1px] w-full' />
        {isFetchingNextPage && <div>Loading more...</div>}
      </main>
    </div>
  )
}
