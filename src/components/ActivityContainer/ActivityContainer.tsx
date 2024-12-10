import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { DATE_TIME_FORMATS } from 'src/constants/common'
import { path } from 'src/routes/path'
import { Activity } from 'src/types/activity.type'
import { timeAgo } from 'src/utils/datetime'

interface ActivityContainerProps {
  activity: Activity
}

export default function ActivityContainer({ activity }: ActivityContainerProps) {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col gap-2 rounded-md border border-neutral-3 bg-neutral-0 px-4 py-2 text-neutral-6 shadow-custom'>
      <div className='text-sm font-medium text-neutral-7'>
        {timeAgo(moment(activity.createdAt).format(DATE_TIME_FORMATS.DATE_TIME_COMMON))}
      </div>
      {activity.type === 'EVENT_REGISTER' && (
        <div>
          Bạn đã đăng ký sự kiện{' '}
          <span
            className='font-medium text-semantic-secondary hover:cursor-pointer'
            onClick={() => navigate(path.detailEvent.link(activity.eventId))}
          >
            {activity.eventName}
          </span>
        </div>
      )}
      {activity.type === 'EVENT_FOLLOW' && (
        <div>
          Bạn đã theo dõi sự kiện{' '}
          <span
            className='font-medium text-semantic-secondary hover:cursor-pointer'
            onClick={() => navigate(path.detailEvent.link(activity.eventId))}
          >
            {activity.eventName}
          </span>
        </div>
      )}
      {activity.type === 'POST_LIKE' && (
        <div>
          Bạn đã thích <span className='font-medium text-semantic-secondary'>một bài đăng</span> trong sự kiện{' '}
          <span
            className='font-medium text-semantic-secondary hover:cursor-pointer'
            onClick={() => navigate(path.detailEvent.link(activity.eventId))}
          >
            {activity.eventName}
          </span>
        </div>
      )}
      {activity.type === 'FEEDBACK_LIKE' && (
        <div>
          Bạn đã thích <span className='font-medium text-semantic-secondary'>một cảm nghĩ</span> trong sự kiện{' '}
          <span
            className='font-medium text-semantic-secondary hover:cursor-pointer'
            onClick={() => navigate(path.detailEvent.link(activity.eventId))}
          >
            {activity.eventName}
          </span>
        </div>
      )}
    </div>
  )
}
