import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { DATE_TIME_FORMATS } from 'src/constants/common'
import { cn } from 'src/lib/tailwind/utils'
import { path } from 'src/routes/path'
import { EventNotification } from 'src/types/notification.type'
import { timeAgo } from 'src/utils/datetime'

interface NotificationContainerProps {
  notification: EventNotification
}

export default function NotificationContainer({ notification }: NotificationContainerProps) {
  const navigate = useNavigate()

  const navigateToEventPage = () => {
    if (notification.notification_type === 'post_created') {
      navigate(path.detailEvent.link(notification.details.event.id, notification.details.id))
    } else {
      navigate(path.detailEvent.link(notification.details.eventId))
    }
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-md border border-neutral-3 px-4 py-2 text-neutral-6 shadow-custom hover:cursor-pointer',
        {
          'bg-neutral-0': notification.is_read,
          'bg-semantic-secondary-background/30': !notification.is_read
        }
      )}
      onClick={navigateToEventPage}
    >
      <div className='text-sm font-medium text-neutral-7'>
        {timeAgo(moment(notification.created_at).format(DATE_TIME_FORMATS.DATE_TIME_COMMON))}
      </div>
      {notification.notification_type === 'post_created' && (
        <div>
          <span className='font-medium text-semantic-secondary'>{notification.details.organizer.name}</span> đã đăng một
          bài đăng về sự kiện{' '}
          <span className='font-medium text-semantic-secondary'>{notification.details.event.name}</span>
        </div>
      )}
      {notification.notification_type === 'event_start_remind' && (
        <div>
          Chỉ còn <span>30 phút</span> nữa thôi là sự kiện
          <span className='font-medium text-semantic-secondary'>{notification.details.eventName}</span> diễn ra rồi. Hãy
          chuẩn bị một tinh thần thật tốt để tham gia sự kiện nhé.
        </div>
      )}
    </div>
  )
}
