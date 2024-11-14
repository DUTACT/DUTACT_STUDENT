import Popover from 'src/components/Popover'
import { usePopper } from 'react-popper'
import { Fragment, useEffect, useState } from 'react'
import FeedbackMenuPopover from './FeedbackMenuPopover'
import CreateOrUpdateFeedbackPopup from '../CreateOrUpdateFeedbackPopup'
import MoreIcon from 'src/assets/icons/i-more.svg?react'
import { useDispatch } from 'react-redux'
import { clearModal, setModalProperties } from 'src/redux/slices/modalConfirm'
import DeleteIcon from 'src/assets/icons/i-delete-warning.svg?react'
import { useFeedbacks } from '../../hooks/useFeedbacks'

interface FeedbackMenuProps {
  feedbackId: number
}

export default function FeedbackMenu({ feedbackId }: FeedbackMenuProps) {
  const dispatch = useDispatch()
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
  const [isShowUpdateFeedbackPopup, setIsShowUpdateFeedbackPopup] = useState<boolean>(false)
  const [isShowDeleteFeedbackModalConfirm, setIsShowDeleteFeedbackModalConfirm] = useState<boolean>(false)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [{ name: 'offset', options: { offset: [0, 8] } }]
  })

  const onClosePopover = () => {
    setIsPopoverOpen(false)
    setReferenceElement(null)
    setPopperElement(null)
  }

  const {
    deleteFeedbackMutationResult: { mutate: mutateDeleteFeedback }
  } = useFeedbacks()

  useEffect(() => {
    if (isShowDeleteFeedbackModalConfirm) {
      dispatch(
        setModalProperties({
          isShow: true,
          title: 'Xóa cảm nghĩ của bạn',
          question:
            'Bạn có chắc chắn muốn xóa cảm nghĩ này của bạn không? Bạn và mọi người sẽ không còn nhìn thấy cảm nghĩ này ở bất cứ đâu nữa.',
          actionConfirm: () => {
            mutateDeleteFeedback(feedbackId)
            setIsShowDeleteFeedbackModalConfirm(false)
            dispatch(clearModal())
          },
          actionCancel: () => {
            dispatch(clearModal())
            setIsShowDeleteFeedbackModalConfirm(false)
          },
          titleConfirm: 'Xóa',
          titleCancel: 'Quay lại',
          isWarning: true,
          iconComponent: <DeleteIcon className='h-[20px] w-[20px]' />
        })
      )
    }
  }, [isShowDeleteFeedbackModalConfirm])

  return (
    <Fragment>
      <Popover
        isOpen={isPopoverOpen}
        content={
          <div ref={setPopperElement} style={{ ...styles.popper, zIndex: 9999 }} {...attributes.popper}>
            <FeedbackMenuPopover
              onClosePopover={onClosePopover}
              setIsShowUpdateFeedbackPopup={setIsShowUpdateFeedbackPopup}
              setIsShowDeleteFeedbackModalConfirm={setIsShowDeleteFeedbackModalConfirm}
            />
          </div>
        }
        onClose={() => setIsPopoverOpen(false)}
      >
        <div ref={setReferenceElement} onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
          <MoreIcon className='h-[24px] w-[24px] rounded-md p-1 hover:cursor-pointer hover:bg-neutral-2' />
        </div>
      </Popover>
      {isShowUpdateFeedbackPopup && (
        <CreateOrUpdateFeedbackPopup
          updatedFeedbackId={feedbackId}
          setIsShowCreateOrUpdateFeedbackPopup={setIsShowUpdateFeedbackPopup}
        />
      )}
    </Fragment>
  )
}
