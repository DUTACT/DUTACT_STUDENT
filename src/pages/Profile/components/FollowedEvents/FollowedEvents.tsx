import { useInView } from 'react-intersection-observer'
import RegisteredEventContainer from 'src/pages/Profile/components/RegisteredEventContainer'
import NoData from 'src/assets/img/no-data.png'
import { useFollowedEvents } from '../../hooks/useFollowedEvents'

export default function FollowedEvents() {
  const { followedEvents, fetchMoreFollowedEvents, hasNextPage, isFetchingNextPage, isLoading, error } =
    useFollowedEvents()

  const { ref: scrollRef, inView } = useInView({
    threshold: 1.0,
    rootMargin: '100px'
  })

  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchMoreFollowedEvents()
  }

  if (followedEvents.length === 0 && isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <div className='flex flex-wrap gap-y-4 self-stretch'>
        {followedEvents.length > 0 &&
          followedEvents.map((event) => (
            <div key={event.event.id} className='w-1/2 p-1'>
              <RegisteredEventContainer isFollowedEvent={true} registeredEvent={event} />
            </div>
          ))}
        {followedEvents.length === 0 && (
          <div className='flex w-full flex-col items-center gap-2'>
            <img src={NoData} alt='no-data' className='h-[100px] w-[100px]' />
            <div className='text-sm font-medium text-neutral-6'>Không tìm thấy sự kiện nào</div>
          </div>
        )}
      </div>
      <div ref={scrollRef} className='h-[1px] w-full' />

      {isFetchingNextPage && <div>Loading more...</div>}
    </>
  )
}
