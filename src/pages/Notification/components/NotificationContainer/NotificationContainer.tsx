import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { DATE_TIME_FORMATS } from 'src/constants/common'
import { path } from 'src/routes/path'
import { EventNotification } from 'src/types/notification.type'
import { timeAgo } from 'src/utils/datetime'

interface NotificationContainerProps {
  notification: EventNotification
}

export default function NotificationContainer({ notification }: NotificationContainerProps) {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col gap-2 rounded-md border border-neutral-3 bg-neutral-0 px-4 py-2 text-neutral-6 shadow-custom'>
      <div className='text-sm font-medium text-neutral-7'>
        {timeAgo(moment(notification.created_at).format(DATE_TIME_FORMATS.DATE_TIME_COMMON))}
      </div>
      {notification.notification_type === 'post_created' && (
        <div>
          <span className='font-medium text-semantic-secondary hover:cursor-pointer'>
            {notification.details.organizer.name}
          </span>{' '}
          đã đăng một bài đăng về sự kiện{' '}
          <span
            className='font-medium text-semantic-secondary hover:cursor-pointer'
            onClick={() => navigate(path.detailEvent.link(notification.details.event.id))}
          >
            {notification.details.event.name}
          </span>
        </div>
      )}
      {notification.notification_type === 'event_start_remind' && (
        <div>
          Chỉ còn <span>30 phút</span> nữa thôi là sự kiện
          <span
            className='font-medium text-semantic-secondary hover:cursor-pointer'
            onClick={() => navigate(path.detailEvent.link(notification.details.eventId))}
          >
            {notification.details.eventName}
          </span>{' '}
          diễn ra rồi. Hãy chuẩn bị một tinh thần thật tốt để tham gia sự kiện nhé.
        </div>
      )}
    </div>
  )
}
