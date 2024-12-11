import { useEffect, useRef, useState } from 'react'
import AddIcon from 'src/assets/icons/i-add.svg?react'
import CreateOrUpdateFeedbackPopup from '../CreateOrUpdateFeedbackPopup'
import { useFeedbacks } from '../../hooks/useFeedbacks'
import { toast } from 'react-toastify'
import FeedbackContainer from 'src/pages/DetailEvent/components/FeedbackContainer'
import { useSearchParams } from 'react-router-dom'

export default function FeedbackList() {
  const [isShowCreateOrUpdateFeedbackPopup, setIsShowCreateOrUpdateFeedbackPopup] = useState<boolean>(false)
  const { feedbacks, error, isLoading } = useFeedbacks()
  const [searchParams] = useSearchParams()
  const feedbackId = searchParams.get('feedbackId') ? parseInt(searchParams.get('feedbackId') || '0', 10) : 0
  const feedbackRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    if (feedbackId && feedbacks.length > 0) {
      const feedbackElement = feedbackRefs.current[feedbackId]
      if (feedbackElement) {
        feedbackElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [feedbackId, feedbacks])

  if (error) {
    toast.error(error.message)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {feedbacks && feedbacks.length === 0 && <div>Chưa có cảm nghĩ nào</div>}
      {feedbacks && feedbacks.length > 0 && (
        <div className='flex w-full flex-col gap-3'>
          {feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              ref={(el) => {
                feedbackRefs.current[feedback.id] = el
              }}
            >
              <FeedbackContainer feedback={feedback} />
            </div>
          ))}
        </div>
      )}
      <div
        className='fixed bottom-6 right-6 rounded-lg border border-neutral-3 bg-neutral-1 p-3 shadow-custom hover:cursor-pointer hover:bg-neutral-2'
        onClick={() => setIsShowCreateOrUpdateFeedbackPopup(true)}
      >
        <AddIcon className='h-[28px] w-[28px]' />
      </div>
      {isShowCreateOrUpdateFeedbackPopup && (
        <CreateOrUpdateFeedbackPopup setIsShowCreateOrUpdateFeedbackPopup={setIsShowCreateOrUpdateFeedbackPopup} />
      )}
    </>
  )
}
