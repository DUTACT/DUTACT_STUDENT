import { useInView } from 'react-intersection-observer'
import NoData from 'src/assets/img/no-data.png'
import { useConfirmedEvents } from '../../hooks/useConfirmedEvents'
import ConfirmedEventContainer from '../ConfirmedEventContainer'

export default function ActivityProofs() {
  const { confirmedEvents, fetchMoreConfirmedEvents, hasNextPage, isFetchingNextPage, isLoading, error } =
    useConfirmedEvents()

  const { ref: scrollRef, inView } = useInView({
    threshold: 1.0,
    rootMargin: '100px'
  })

  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchMoreConfirmedEvents()
  }

  if (confirmedEvents.length === 0 && isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <div className='flex flex-wrap gap-y-4 self-stretch'>
        {confirmedEvents.length > 0 &&
          confirmedEvents.map((event) => (
            <div key={event.event.id} className='w-1/2 p-1'>
              <ConfirmedEventContainer confirmedEvent={event} />
            </div>
          ))}
        {confirmedEvents.length === 0 && (
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
