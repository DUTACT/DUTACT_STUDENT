import EventContainer from 'src/components/EventContainer'
import { useEvents } from '../../hooks/useEvents'

export default function HomePage() {
  const { events } = useEvents()
  return (
    <div className='flex h-full w-full max-w-page flex-col items-center bg-neutral-1'>
      <header className='flex h-header-page items-center justify-between'>
        <div className='text-md font-semibold'>Trang chủ</div>
      </header>
      <main className='flex w-full flex-grow flex-col gap-4 rounded-xl border border-neutral-3 bg-neutral-0 p-6 shadow-sm'>
        {events.map((event) => (
          <EventContainer key={event.id} event={event} />
        ))}
      </main>
    </div>
  )
}
