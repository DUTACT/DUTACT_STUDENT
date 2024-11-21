import { Feedback } from 'src/types/feedback.type'
import DUTLogo from 'src/assets/img/dut-logo.jpg'
import { timeAgo } from 'src/utils/datetime'
import { DATE_TIME_FORMATS } from 'src/constants/common'
import HeartIcon from 'src/assets/icons/i-heart.svg?react'
import HeartActiveIcon from 'src/assets/icons/i-heart-active.svg?react'
import FeedbackMenu from '../FeedbackMenu'
import { useFeedbacks } from '../../hooks/useFeedbacks'

interface FeedbackContainerProps {
  feedback: Feedback
}

export default function FeedbackContainer({ feedback }: FeedbackContainerProps) {
  const {
    onLikeFeedback: { mutate: likeFeedback },
    onUnlikeFeedback: { mutate: unlikeFeedback }
  } = useFeedbacks()

  const handleLikeFeedback = () => {
    likeFeedback(feedback.id)
  }

  const handleUnlikeFeedback = () => {
    unlikeFeedback(feedback.id)
  }

  return (
    <div className='flex min-h-[100px] w-full flex-col gap-y-2 rounded-lg border border-neutral-2 bg-white p-4 shadow-sm'>
      <div className='flex w-full'>
        <div className='flex flex-1 gap-x-2'>
          <div className='relative h-[40px] w-[40px] min-w-[40px]'>
            <img
              src={feedback.student.avatarUrl || DUTLogo}
              alt='avatar'
              className='absolute left-0 top-0 mx-auto h-full w-full rounded-full border-[1px] border-gray-200 object-cover'
            />
          </div>
          <div className='flex flex-col'>
            <div className='text-md font-semibold text-neutral-8'>{feedback.student.fullName}</div>
            <div className='text-xs font-light text-neutral-6'>{timeAgo(feedback.postedAt, DATE_TIME_FORMATS.ISO)}</div>
          </div>
        </div>
        <FeedbackMenu feedbackId={feedback.id} />
      </div>

      <p className='break-word flex whitespace-pre-line text-sm text-body-text'>{feedback.content}</p>

      {feedback.coverPhotoUrl && (
        <div className='aspect-h-9 aspect-w-16 relative w-full'>
          <img
            src={feedback.coverPhotoUrl}
            alt='cover-image'
            className='absolute left-0 top-0 mx-auto h-full w-full rounded-lg object-cover'
          />
        </div>
      )}

      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <div
            className='flex items-center gap-1 rounded-full bg-transparent px-2 py-1 text-body-text-2 hover:cursor-pointer hover:bg-neutral-2'
            onClick={feedback.likedAt ? handleUnlikeFeedback : handleLikeFeedback}
          >
            {feedback.likedAt && <HeartActiveIcon className='h-[16px] w-[16px]' />}
            {!feedback.likedAt && <HeartIcon className='h-[16px] w-[16px]' />}
            <span className='select-none text-sm font-normal'>{feedback.likeNumber}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
