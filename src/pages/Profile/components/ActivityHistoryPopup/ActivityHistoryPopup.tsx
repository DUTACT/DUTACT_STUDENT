import { createPortal } from 'react-dom'
import Divider from 'src/components/Divider'
import CloseIcon from 'src/assets/icons/i-close.svg?react'
import { useActivities } from '../../hooks/useActivities'
import { useInView } from 'react-intersection-observer'
import ActivityContainer from 'src/components/ActivityContainer'
import { toast } from 'react-toastify'

interface ActivityHistoryPopupProps {
  setIsShowActivityHistoryPopup: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ActivityHistoryPopup({ setIsShowActivityHistoryPopup }: ActivityHistoryPopupProps) {
  const { activities, fetchMoreActivities, hasNextPage, isFetchingNextPage, isLoading, error } = useActivities()

  const { ref: scrollRef, inView } = useInView({
    threshold: 1.0,
    rootMargin: '100px'
  })

  if (error) {
    toast.error(error.message)
  }

  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchMoreActivities()
  }

  return createPortal(
    <div
      className='fixed left-0 right-0 top-0 z-20 flex h-[100vh] w-[100vw] items-center justify-center bg-overlay'
      onClick={(e) => {
        e.stopPropagation()
        setIsShowActivityHistoryPopup(false)
      }}
    >
      <div
        className='h-fit max-h-popup w-[600px] max-w-popup overflow-hidden rounded-lg bg-neutral-0 shadow-custom'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex h-header-popup items-center justify-between px-6'>
          <div className='text-base font-medium text-neutral-7'>Lịch sử hoạt động</div>
          <div
            className='-mr-1 cursor-pointer p-1 opacity-70 hover:opacity-100'
            onClick={() => setIsShowActivityHistoryPopup(false)}
          >
            <CloseIcon className='h-[20px] w-[20px]' />
          </div>
        </div>
        <Divider />
        <div className='block max-h-main-popup overflow-auto px-6 py-4'>
          {activities.length === 0 && isLoading && <div>Loading...</div>}
          {activities.length > 0 && (
            <div className='flex w-full flex-col gap-3'>
              {activities.map((activity) => (
                <ActivityContainer key={activity.id} activity={activity} />
              ))}
            </div>
          )}
          {error && <div>Error: {error.message}</div>}
          <div ref={scrollRef} className='h-[1px] w-full' />
          {isFetchingNextPage && <div>Loading more...</div>}
        </div>
      </div>
    </div>,
    document.body
  )
}
