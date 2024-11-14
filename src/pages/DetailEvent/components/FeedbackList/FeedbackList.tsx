import { useState } from 'react'
import AddIcon from 'src/assets/icons/i-add.svg?react'
import CreateOrUpdateFeedbackPopup from '../CreateOrUpdateFeedbackPopup'
import { useFeedbacks } from '../../hooks/useFeedbacks'
import { toast } from 'react-toastify'
import FeedbackContainer from 'src/pages/DetailEvent/components/FeedbackContainer'

export default function FeedbackList() {
  const [isShowCreateOrUpdateFeedbackPopup, setIsShowCreateOrUpdateFeedbackPopup] = useState<boolean>(false)

  const { feedbacks, error, isLoading } = useFeedbacks()

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
            <FeedbackContainer key={feedback.id} feedback={feedback} />
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
