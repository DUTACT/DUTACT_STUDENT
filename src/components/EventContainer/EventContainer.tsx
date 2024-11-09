import TimeIcon from 'src/assets/icons/i-time.svg?react'
import DeadlineIcon from 'src/assets/icons/i-deadline.svg?react'
import HeartIcon from 'src/assets/icons/i-heart.svg?react'
import HeartActiveIcon from 'src/assets/icons/i-heart-active.svg?react'
import FollowIcon from 'src/assets/icons/i-follow.svg?react'
import FollowActiveIcon from 'src/assets/icons/i-follow-active.svg?react'
import UserAddIcon from 'src/assets/icons/i-user-add.svg?react'
import UserAddActiveIcon from 'src/assets/icons/i-user-add-active.svg?react'
import UserAddSecondaryIcon from 'src/assets/icons/i-user-add-secondary.svg?react'
import { EventOfOrganizer } from 'src/types/event.type'
import moment from 'moment'
import { DATE_TIME_FORMATS } from 'src/constants/common'
import DUTLogo from 'src/assets/img/dut-logo.jpg'
import { timeAgo } from 'src/utils/datetime'

interface EventContainerProps {
  event: EventOfOrganizer
}

export default function EventContainer({ event }: EventContainerProps) {
  return (
    <div className='flex min-h-[100px] w-full flex-col gap-y-2 rounded-lg border border-neutral-2 bg-white p-4 shadow-sm'>
      <div className='flex w-full gap-x-2'>
        <div className='relative h-[40px] w-[40px] min-w-[40px]'>
          <img
            src={event.organizer.avatarUrl || DUTLogo}
            alt='avatar'
            className='absolute left-0 top-0 mx-auto h-full w-full rounded-full border-[1px] border-gray-200 object-cover'
          />
        </div>
        <div className='flex flex-col'>
          <div className='text-md font-semibold text-neutral-8'>{event.organizer.name}</div>
          <div className='text-xs font-light text-neutral-6'>
            {timeAgo(event.status.moderatedAt, DATE_TIME_FORMATS.ISO)}
          </div>
        </div>
      </div>
      <div className='text-sm font-normal text-title-text'>
        Sự kiện: <span className='text-sm font-semibold'>{event.name}</span>
      </div>
      <div className='flex items-center gap-1 text-sm font-normal text-body-text-2'>
        <TimeIcon className='h-[14px] w-[14px]' />
        <span className='min-w-[100px]'>Thời gian diễn ra: </span>
        <span className='ml-1'>
          {moment(event.startAt).format(DATE_TIME_FORMATS.DATE_TIME_COMMON)} -{' '}
          {moment(event.endAt).format(DATE_TIME_FORMATS.DATE_TIME_COMMON)}
        </span>
      </div>
      <div className='flex items-center gap-1 text-sm font-normal text-body-text-2'>
        <DeadlineIcon className='h-[14px] w-[14px]' />
        <span className='min-w-[100px]'>Thời gian đăng ký: </span>
        <span className='ml-1'>
          {' '}
          {moment(event.startRegistrationAt).format(DATE_TIME_FORMATS.DATE_TIME_COMMON)} -{' '}
          {moment(event.endRegistrationAt).format(DATE_TIME_FORMATS.DATE_TIME_COMMON)}
        </span>
      </div>
      <p className='break-word flex whitespace-pre-line text-sm text-body-text'>{event.content}</p>
      <div className='aspect-h-9 aspect-w-16 relative w-full'>
        <img
          src={event.coverPhotoUrl}
          alt='cover-image'
          className='absolute left-0 top-0 mx-auto h-full w-full rounded-lg object-cover'
        />
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <div className='flex items-center gap-1 rounded-full bg-transparent px-2 py-1 text-body-text-2 hover:cursor-pointer hover:bg-neutral-2'>
            <HeartActiveIcon className='h-[16px] w-[16px]' />
            <span className='text-sm font-normal'>123 lượt thích</span>
          </div>
          <div className='flex items-center gap-1 rounded-full bg-transparent px-2 py-1 text-body-text-2 hover:cursor-pointer hover:bg-neutral-2'>
            <FollowActiveIcon className='h-[16px] w-[16px]' />
            <span className='text-sm font-normal'>123 lượt theo dõi</span>
          </div>
          <div className='flex items-center gap-1 rounded-full bg-transparent px-2 py-1 text-body-text-2 hover:cursor-pointer hover:bg-neutral-2'>
            <UserAddActiveIcon className='h-[16px] w-[16px]' />
            <span className='text-sm font-normal'>30 lượt đăng ký</span>
          </div>
        </div>
        <div className='flex items-center gap-1 rounded-md bg-semantic-secondary-background px-6 py-2 opacity-90 hover:cursor-pointer hover:opacity-100'>
          <UserAddSecondaryIcon className='h-[16px] w-[16px]' />
          <span className='text-sm font-medium text-semantic-secondary'>Đăng ký</span>
        </div>
      </div>
    </div>
  )
}
