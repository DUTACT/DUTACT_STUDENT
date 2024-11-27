import { useInView } from 'react-intersection-observer'
import { useRegisteredEvents } from '../../hooks/useRegisteredEvents'
import RegisteredEventContainer from 'src/pages/Profile/components/RegisteredEventContainer'
import { Tab, Tabs } from 'src/components/Tab'
import { REGISTERED_EVENT_TAG_LABEL, REGISTERED_EVENT_TAGS } from 'src/constants/event'
import NoData from 'src/assets/img/no-data.png'

export default function RegisteredEvents() {
  const {
    registeredEvents,
    registeredEventsByFilter,
    fetchMoreRegisteredEvents,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useRegisteredEvents()

  const { ref: scrollRef, inView } = useInView({
    threshold: 1.0,
    rootMargin: '100px'
  })

  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchMoreRegisteredEvents()
  }

  if (registeredEvents.length === 0 && isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <Tabs>
        {REGISTERED_EVENT_TAGS.map((tag) => (
          <Tab key={tag} label={REGISTERED_EVENT_TAG_LABEL[tag]}>
            <div className='flex flex-wrap gap-y-4 self-stretch'>
              {registeredEventsByFilter(tag).length > 0 &&
                registeredEventsByFilter(tag).map((event) => (
                  <div key={event.event.id} className='w-1/2 p-1'>
                    <RegisteredEventContainer registeredEvent={event} />
                  </div>
                ))}
              {registeredEventsByFilter(tag).length === 0 && (
                <div className='flex w-full flex-col items-center gap-2'>
                  <img src={NoData} alt='no-data' className='h-[100px] w-[100px]' />
                  <div className='text-sm font-medium text-neutral-6'>Không tìm thấy sự kiện nào</div>
                </div>
              )}
            </div>
          </Tab>
        ))}
      </Tabs>
      <div ref={scrollRef} className='h-[1px] w-full' />

      {isFetchingNextPage && <div>Loading more...</div>}
    </>
  )
}
