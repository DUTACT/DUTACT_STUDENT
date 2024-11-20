import EventContainer from 'src/components/EventContainer'
import { useEvents } from '../../hooks/useEvents'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { cn } from 'src/lib/tailwind/utils'

export default function HomePage() {
  const [isNewEvent, setIsNewEvent] = useState<boolean>(true)
  const { newEvents, upcomingEvents, isLoading, error } = useEvents()

  if (error) {
    toast.error(error.message)
    return
  }

  return (
    <div className='relative flex h-full w-full max-w-page flex-col items-center bg-neutral-1'>
      <header className='flex h-header-page items-center justify-between'>
        <div className='text-md font-semibold'>Trang chủ</div>
      </header>
      <main className='flex w-full flex-grow flex-col gap-4 rounded-xl border border-neutral-3 bg-neutral-0 p-6 shadow-sm'>
        <div className='sticky left-0 top-0 flex w-full items-center justify-between gap-4 rounded-md bg-neutral-2 px-4 py-2 shadow-custom'>
          <div
            className={cn('flex-1 rounded-md px-2 py-1 text-center text-neutral-7', {
              'bg-neutral-1 font-medium shadow-sm hover:cursor-default': isNewEvent,
              'bg-neutral-2 font-normal hover:cursor-pointer': !isNewEvent
            })}
            onClick={() => setIsNewEvent(true)}
          >
            Sự kiện mới
          </div>
          <div
            className={cn('flex-1 rounded-md px-2 py-1 text-center text-neutral-7', {
              'bg-neutral-1 font-medium shadow-sm hover:cursor-default': !isNewEvent,
              'bg-neutral-2 font-normal hover:cursor-pointer': isNewEvent
            })}
            onClick={() => setIsNewEvent(false)}
          >
            Sự kiện sắp diễn ra
          </div>
        </div>
        {isLoading && <div>Loading...</div>}
        {!isLoading && (isNewEvent ? newEvents : upcomingEvents).length === 0 && (
          <div>Hiện tại không còn sự kiện nào cả</div>
        )}
        {!isLoading &&
          (isNewEvent ? newEvents : upcomingEvents).length > 0 &&
          (isNewEvent ? newEvents : upcomingEvents).map((event) => <EventContainer key={event.id} event={event} />)}
      </main>
    </div>
  )
}
