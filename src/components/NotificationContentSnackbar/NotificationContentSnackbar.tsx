import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { DATE_TIME_FORMATS } from 'src/constants/common'
import { path } from 'src/routes/path'
import { EventNotificationContent } from 'src/types/notification.type'

interface NotificationContentSnackbarProps {
  content: EventNotificationContent
}

export default function NotificationContentSnackbar({ content }: NotificationContentSnackbarProps) {
  const navigate = useNavigate()

  const navigateToEventPage = () => {
    if (content.notificationType === 'post_created') {
      navigate(path.detailEvent.link(content.details.event.id, content.details.id))
    } else {
      navigate(path.detailEvent.link(content.details.eventId))
    }
  }
  return (
    <div className='flex items-start gap-2' onClick={navigateToEventPage}>
      {content.notificationType === 'post_created' && (
        <>
          <img
            src={content.details.organizer.avatarUrl}
            alt='avatar'
            className='mt-1 h-[40px] w-[40px] min-w-[40px] rounded-full border border-neutral-3 object-cover'
          />
          <div className='flex flex-col gap-[2px]'>
            <div className='text-base font-medium text-neutral-7'>{content.details.organizer.name}</div>
            <div className='text-sm font-normal text-neutral-6'>
              đã đăng một bài đăng mới trong sự kiện{' '}
              <span className='font-medium text-semantic-secondary'>{content.details.event.name}</span>.
            </div>
          </div>
        </>
      )}
      {content.notificationType === 'event_start_remind' && (
        <div className='text-sm font-normal text-neutral-6'>
          Sự kiện <span className='font-medium text-semantic-secondary'>{content.details.eventName}</span> sẽ diễn ra
          vào lúc{' '}
          <span className='font-medium text-semantic-secondary'>
            {moment(content.details.startAt).format(DATE_TIME_FORMATS.DATE_TIME_COMMON)}
          </span>
          . Hãy chuẩn bị tinh thần thật tốt để tham gia sự kiện nhé.
        </div>
      )}
    </div>
  )
}
