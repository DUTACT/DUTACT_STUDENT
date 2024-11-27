import CheckInIcon from 'src/assets/icons/i-check-in.svg?react'
import RejectIcon from 'src/assets/icons/i-reject-warning.svg?react'
import { RegisteredEventTag } from 'src/types/event.type'

interface RegisteredEventPopoverProps {
  tags: RegisteredEventTag[]
  onClosePopover: () => void
  setIsShowCheckInHistory: React.Dispatch<React.SetStateAction<boolean>>
  setIsShowRejectedReason: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RegisteredEventPopover({
  tags,
  onClosePopover,
  setIsShowCheckInHistory,
  setIsShowRejectedReason
}: RegisteredEventPopoverProps) {
  return (
    <div className='overflow-hidden rounded-md border border-neutral-3 shadow-custom'>
      <div
        className='flex cursor-pointer items-center gap-3 bg-neutral-0 py-2 pl-2 pr-6 hover:bg-neutral-2'
        onClick={(e) => {
          e.stopPropagation()
          setIsShowCheckInHistory(true)
          onClosePopover()
        }}
      >
        <CheckInIcon className='h-[16px] w-[16px]' />
        <span className='text-sm text-neutral-6'>Lịch sử điểm danh</span>
      </div>
      {tags.includes('notParticipated') && (
        <div
          className='flex cursor-pointer items-center gap-3 bg-neutral-0 py-2 pl-2 pr-6 hover:bg-neutral-2'
          onClick={(e) => {
            e.stopPropagation()
            setIsShowRejectedReason(true)
            onClosePopover()
          }}
        >
          <RejectIcon className='h-[16px] w-[16px]' />
          <span className='text-sm text-semantic-cancelled'>Xem lý do từ chối</span>
        </div>
      )}
    </div>
  )
}
