import moment from 'moment'
import { createPortal } from 'react-dom'
import CloseIcon from 'src/assets/icons/i-close.svg?react'
import Divider from 'src/components/Divider'
import { DATE_TIME_FORMATS } from 'src/constants/common'
import { RegisteredEvent } from 'src/types/event.type'

interface CheckInHistoryPopupProps {
  registeredEvent: RegisteredEvent
  setIsShowCheckInHistory: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CheckInHistoryPopup({ registeredEvent, setIsShowCheckInHistory }: CheckInHistoryPopupProps) {
  return createPortal(
    <div
      className='fixed left-0 right-0 top-0 z-20 flex h-[100vh] w-[100vw] items-center justify-center bg-overlay'
      onClick={(e) => {
        e.stopPropagation()
        setIsShowCheckInHistory(false)
      }}
    >
      <div
        className='h-fit max-h-popup w-[600px] max-w-popup overflow-hidden rounded-lg bg-neutral-0 shadow-custom'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex h-header-popup items-center justify-between px-6'>
          <div className='text-base font-medium text-neutral-7'>Lịch sử điểm danh</div>
          <div
            className='-mr-1 cursor-pointer p-1 opacity-70 hover:opacity-100'
            onClick={() => setIsShowCheckInHistory(false)}
          >
            <CloseIcon className='h-[20px] w-[20px]' />
          </div>
        </div>
        <Divider />
        <div className='flex max-h-main-popup flex-col gap-2 overflow-auto px-6 py-4'>
          {registeredEvent?.checkIns.concat(registeredEvent?.checkIns).map((checkIn) => (
            <div className='w-full rounded-lg bg-neutral-2 px-4 py-3'>
              {moment(checkIn.checkInTime).format(DATE_TIME_FORMATS.DATE_TIME_COMMON)} - Quét mã{' '}
              <span className='font-medium'>{checkIn.checkInCode.title}</span> thành công
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  )
}
