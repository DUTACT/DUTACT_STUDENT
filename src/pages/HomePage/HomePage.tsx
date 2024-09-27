import EventContainer from 'src/components/EventContainer'

export default function HomePage() {
  return (
    <div className='max-w-page flex h-full w-full flex-col items-center bg-neutral-1'>
      <header className='h-header-page flex items-center justify-between'>
        <div className='text-md font-semibold'>Trang chủ</div>
      </header>
      <main className='flex w-full flex-grow flex-col gap-4 rounded-xl border border-neutral-3 bg-neutral-0 p-6 shadow-sm'>
        <EventContainer />
        <EventContainer />
        <EventContainer />
        <EventContainer />
      </main>
    </div>
  )
}
