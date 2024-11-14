import EditIcon from 'src/assets/icons/i-edit.svg?react'
import DeleteIcon from 'src/assets/icons/i-delete-warning.svg?react'

interface FeedbackMenuPopoverProps {
  onClosePopover: () => void
  setIsShowUpdateFeedbackPopup: React.Dispatch<React.SetStateAction<boolean>>
  setIsShowDeleteFeedbackModalConfirm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FeedbackMenuPopover({
  onClosePopover,
  setIsShowUpdateFeedbackPopup,
  setIsShowDeleteFeedbackModalConfirm
}: FeedbackMenuPopoverProps) {
  return (
    <div className='overflow-hidden rounded-md border border-neutral-3 shadow-custom'>
      <div
        className='flex cursor-pointer items-center gap-3 bg-neutral-0 py-2 pl-2 pr-6 hover:bg-neutral-2'
        onClick={() => {
          setIsShowUpdateFeedbackPopup(true)
          onClosePopover()
        }}
      >
        <EditIcon className='h-[16px] w-[16px]' />
        <span className='text-sm font-medium text-neutral-6'>Chỉnh sửa cảm nghĩ</span>
      </div>
      <div
        className='flex cursor-pointer items-center gap-3 bg-neutral-0 py-2 pl-2 pr-6 hover:bg-neutral-2'
        onClick={() => {
          setIsShowDeleteFeedbackModalConfirm(true)
          onClosePopover()
        }}
      >
        <DeleteIcon className='h-[16px] w-[16px]' />
        <span className='text-sm font-medium text-semantic-cancelled'>Xóa cảm nghĩ</span>
      </div>
    </div>
  )
}
