import EventContainer from 'src/components/EventContainer'
import { useEvents } from '../../hooks/useEvents'
import { toast } from 'react-toastify'

export default function HomePage() {
  const { events, isLoading, error } = useEvents()

  if (error) {
    toast.error(error.message)
    return
  }

  return (
    <div className='flex h-full w-full max-w-page flex-col items-center bg-neutral-1'>
      <header className='flex h-header-page items-center justify-between'>
        <div className='text-md font-semibold'>Trang chủ</div>
      </header>
      <main className='flex w-full flex-grow flex-col gap-4 rounded-xl border border-neutral-3 bg-neutral-0 p-6 shadow-sm'>
        {isLoading && <div>Loading...</div>}
        {!isLoading && events.length === 0 && <div>Hiện tại không còn sự kiện nào cả</div>}
        {!isLoading && events.length > 0 && events.map((event) => <EventContainer key={event.id} event={event} />)}
      </main>
    </div>
  )
}
