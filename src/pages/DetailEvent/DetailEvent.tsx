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
import { cn } from 'src/lib/tailwind/utils'
import UserAddActiveIcon from 'src/assets/icons/i-user-add-active.svg?react'
import UserAddSecondaryIcon from 'src/assets/icons/i-user-add-secondary.svg?react'
import UserRemoveIcon from 'src/assets/icons/i-user-remove.svg?react'
import FollowIcon from 'src/assets/icons/i-follow.svg?react'
import FollowActiveIcon from 'src/assets/icons/i-follow-active.svg?react'

export default function DetailEvent() {
  const eventId = useEventId()
  const {
    event,
    error,
    isLoading,
    register: { mutate: registerEvent, isPending: isRegisterPending },
    unregister: { mutate: unregisterEvent, isPending: isUnregisterPending },
    follow: { mutate: followEvent },
    unfollow: { mutate: unfollowEvent }
  } = useDetailEvent(eventId)

  const handleRegisterEvent = () => {
    if (event) {
      registerEvent(event.id)
    }
  }

  const handleUnregisterEvent = () => {
    if (event) {
      unregisterEvent(event.id)
    }
  }

  const handleFollowEvent = () => {
    if (event) {
      followEvent(event.id)
    }
  }

  const handleUnfollowEvent = () => {
    if (event) {
      unfollowEvent(event.id)
    }
  }

  const isRegistrationExpired = moment().isAfter(moment(event?.endRegistrationAt))

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
            <div className='flex items-start gap-1'>
              <h1 className='flex-1 text-2xl font-semibold'>{event.name}</h1>
              {!isRegistrationExpired && (
                <div
                  className={cn(
                    'flex items-center gap-1 rounded-md px-6 py-2 opacity-90 hover:cursor-pointer hover:opacity-100',
                    {
                      'bg-neutral-3/80 hover:bg-neutral-3': event.registeredAt,
                      'bg-semantic-secondary-background/80 hover:bg-semantic-secondary-background': !event.registeredAt,
                      'opacity-50 hover:cursor-not-allowed hover:opacity-50': isRegisterPending || isUnregisterPending
                    }
                  )}
                  onClick={
                    isRegisterPending || isUnregisterPending
                      ? undefined
                      : event.registeredAt
                        ? handleUnregisterEvent
                        : handleRegisterEvent
                  }
                >
                  {event.registeredAt && (
                    <>
                      <UserRemoveIcon className='h-[16px] w-[16px]' />
                      <span className='select-none text-sm font-medium text-neutral-6'>Hủy đăng ký</span>
                    </>
                  )}
                  {!event.registeredAt && (
                    <>
                      <UserAddSecondaryIcon className='h-[16px] w-[16px]' />
                      <span className='select-none text-sm font-medium text-semantic-secondary'>Đăng ký</span>
                    </>
                  )}
                </div>
              )}
              {isRegistrationExpired && event.registeredAt && (
                <div className='flex items-center gap-1 rounded-md bg-semantic-success-background px-6 py-2 opacity-100'>
                  <UserAddActiveIcon className='h-[16px] w-[16px]' />
                  <span className='select-none text-sm font-medium text-semantic-success'>Đã đăng ký</span>
                </div>
              )}
            </div>
            <div className='flex items-center gap-1'>
              <div
                className='flex items-center gap-1 rounded-full bg-transparent px-2 py-1 text-body-text-2 hover:cursor-pointer hover:bg-neutral-2'
                onClick={event.followedAt ? handleUnfollowEvent : handleFollowEvent}
              >
                {event.followedAt && <FollowActiveIcon className='h-[16px] w-[16px]' />}
                {!event.followedAt && <FollowIcon className='h-[16px] w-[16px]' />}
                <span className='select-none text-sm font-normal'>{event.followerNumber}</span>
              </div>
              <div className='flex items-center gap-1 rounded-full bg-transparent px-2 py-1 text-body-text-2 hover:cursor-pointer hover:bg-neutral-2'>
                <UserAddActiveIcon className='h-[16px] w-[16px]' />
                <span className='select-none text-sm font-normal'>30</span>
              </div>
            </div>
            <div className='mt-2 flex items-center'>
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
                  <PostList organizer={event.organizer} />
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
