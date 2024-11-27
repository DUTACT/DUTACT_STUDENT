import { createPortal } from 'react-dom'
import CloseIcon from 'src/assets/icons/i-close.svg?react'
import Divider from 'src/components/Divider'
import RejectImage from 'src/assets/img/reject.jpg'

interface RejectedReasonProps {
  eventName: string
  reason?: string
  setIsShowRejectedReason: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RejectedReason({ eventName, reason, setIsShowRejectedReason }: RejectedReasonProps) {
  return createPortal(
    <div
      className='fixed left-0 right-0 top-0 z-20 flex h-[100vh] w-[100vw] items-center justify-center bg-overlay'
      onClick={(e) => {
        e.stopPropagation()
        setIsShowRejectedReason(false)
      }}
    >
      <div
        className='h-fit max-h-popup w-[600px] max-w-popup overflow-hidden rounded-lg bg-neutral-0 shadow-custom'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex h-header-popup items-center justify-between px-6'>
          <div className='text-base font-medium text-neutral-7'>Lý do bị từ chối</div>
          <div
            className='-mr-1 cursor-pointer p-1 opacity-70 hover:opacity-100'
            onClick={() => setIsShowRejectedReason(false)}
          >
            <CloseIcon className='h-[20px] w-[20px]' />
          </div>
        </div>
        <Divider />
        <div className='flex max-h-main-popup gap-2 overflow-auto px-6 py-4'>
          <div className='flex items-center justify-center'>
            <img src={RejectImage} alt='reject' className='h-[100px] w-[100px] min-w-[100px]' />
          </div>
          <div className='flex flex-col justify-center gap-2'>
            <div>
              Sự kiện: <span className='font-medium'>{eventName}</span>
            </div>
            <div>
              Lý do bị từ chối: <span className='font-medium text-semantic-cancelled'>{reason}</span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
