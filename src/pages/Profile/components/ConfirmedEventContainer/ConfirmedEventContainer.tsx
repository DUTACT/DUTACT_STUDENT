import moment from 'moment'
import { DATE_TIME_FORMATS } from 'src/constants/common'
import { RegisteredEvent } from 'src/types/event.type'
import OrganizerIcon from 'src/assets/icons/i-organizer.svg?react'
import TimeIcon from 'src/assets/icons/i-deadline.svg?react'

interface ConfirmedEventContainerProps {
  confirmedEvent: RegisteredEvent
}

export default function ConfirmedEventContainer({ confirmedEvent }: ConfirmedEventContainerProps) {
  return (
    <div className='flex w-full flex-col gap-1 rounded-lg border border-neutral-3 px-3 py-2 shadow-custom'>
      <div className='text-center font-semibold text-semantic-secondary'>{confirmedEvent.event.name}</div>
      <div className='mt-3 flex items-center gap-2 text-sm text-neutral-6'>
        <OrganizerIcon className='h-[16px] w-[16px]' />
        <div>
          Tổ chức: <span className='font-medium'>{confirmedEvent.event.organizer.name}</span>
        </div>
      </div>
      <div className='flex items-center gap-2 text-sm text-neutral-6'>
        <TimeIcon className='h-[16px] w-[16px]' />
        <div>
          Duyệt lúc:{' '}
          <span className='font-medium'>
            {moment(confirmedEvent.certificateStatus?.moderatedAt).format(DATE_TIME_FORMATS.DATE_TIME_COMMON)}
          </span>
        </div>
      </div>
    </div>
  )
}
