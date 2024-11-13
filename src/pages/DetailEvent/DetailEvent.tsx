import { toast } from 'react-toastify'
import { useDetailEvent } from './hooks/useDetailEvent'
import { useEventId } from './hooks/useEventId'
import { timeAgo } from 'src/utils/datetime'
import { DATE_TIME_FORMATS } from 'src/constants/common'
import DotIcon from 'src/assets/icons/i-dot.svg?react'
import TimeIcon from 'src/assets/icons/i-time.svg?react'
import DeadlineIcon from 'src/assets/icons/i-deadline.svg?react'
import moment from 'moment'
import { Tab, Tabs } from 'src/components/Tab'
import PostList from './components/PostList'
import FeedbackList from './components/FeedbackList'

export default function DetailEvent() {
  const eventId = useEventId()
  const { event, error, isLoading } = useDetailEvent(eventId)

  if (error) {
    toast.error(error.message)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (event) {
    return (
      <div className='flex h-full w-full max-w-page flex-col items-center bg-neutral-1'>
        <header className='flex h-header-page items-center justify-between'>
          <div className='text-md font-semibold'>Sự kiện</div>
        </header>
        <main className='flex w-full flex-grow flex-col overflow-hidden rounded-xl border border-neutral-3 bg-neutral-0 shadow-sm'>
          <div className='aspect-h-6 aspect-w-16 w-full'>
            <img src={event.coverPhotoUrl} alt='ảnh bìa sự kiện' className='h-full w-full object-cover' />
          </div>
          <section className='p-4'>
            <h1 className='text-2xl font-semibold'>{event.name}</h1>
            <div className='mt-1 flex items-center'>
              <img
                src={event.organizer.avatarUrl}
                alt='avatar'
                className='h-[32px] w-[32px] rounded-full border-[2px] border-neutral-3 object-cover'
              />
              <div className='ml-1 flex cursor-default items-center gap-1 text-sm'>
                <span>Đăng bởi</span>
                <span className='font-medium underline underline-offset-2'>{event.organizer.name}</span>
              </div>
              <DotIcon className='h-[20px] w-[20px]' />
              <div className='text-sm font-light'>{timeAgo(event.status.moderatedAt, DATE_TIME_FORMATS.ISO)}</div>
            </div>
            <div className='mt-4 flex items-center gap-1 text-sm font-normal text-body-text-2'>
              <TimeIcon className='h-[16px] w-[16px]' />
              <span className='min-w-[120px] font-medium'>Thời gian diễn ra: </span>
              <span className='ml-1'>
                {moment(event.startAt).format(DATE_TIME_FORMATS.DATE_TIME_COMMON)} -{' '}
                {moment(event.endAt).format(DATE_TIME_FORMATS.DATE_TIME_COMMON)}
              </span>
            </div>
            <div className='mt-1 flex items-center gap-1 text-sm font-normal text-body-text-2'>
              <DeadlineIcon className='h-[16px] w-[16px]' />
              <span className='min-w-[120px] font-medium'>Thời gian đăng ký: </span>
              <span className='ml-1'>
                {' '}
                {moment(event.startRegistrationAt).format(DATE_TIME_FORMATS.DATE_TIME_COMMON)} -{' '}
                {moment(event.endRegistrationAt).format(DATE_TIME_FORMATS.DATE_TIME_COMMON)}
              </span>
            </div>
            <p className='break-word mt-4 flex whitespace-pre-line text-sm text-body-text'>{event.content}</p>
            <div className='relative flex h-full flex-col overflow-y-auto py-3 text-sm'>
              <Tabs>
                <Tab label='Bài đăng'>
                  <PostList />
                </Tab>
                <Tab label='Cảm nghĩ'>
                  <FeedbackList />
                </Tab>
              </Tabs>
            </div>
          </section>
        </main>
      </div>
    )
  }
}
