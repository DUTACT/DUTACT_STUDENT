import { useEffect, useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import moment from 'moment'
import { DATE_TIME_FORMATS } from 'src/constants/common'
import { RegisteredEvent } from 'src/types/event.type'
import DUTLogo from 'src/assets/img/dut-logo.jpg'
import DotIcon from 'src/assets/icons/i-dot.svg?react'
import Tag from 'src/components/Tag'
import { EVENT_STATUS_COLOR_CLASSES, REGISTERED_EVENT_TAG_LABEL } from 'src/constants/event'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/routes/path'
import MoreIcon from 'src/assets/icons/i-white-three-dot-horizontal.svg?react'
import RegisteredEventPopover from '../RegisteredEventPopover'
import CheckInHistoryPopup from '../CheckInHistoryPopup/CheckInHistoryPopup'
import RejectedReasonPopup from '../RejectedReasonPopup'

interface RegisteredEventContainerProps {
  isFollowedEvent?: boolean
  registeredEvent: RegisteredEvent
}

export default function RegisteredEventContainer({
  isFollowedEvent = false,
  registeredEvent
}: RegisteredEventContainerProps) {
  const navigate = useNavigate()

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)

  const popoverRef = useRef<HTMLDivElement | null>(null)
  const moreIconRef = useRef<HTMLDivElement | null>(null)

  const [isShowCheckInHistory, setIsShowCheckInHistory] = useState<boolean>(false)
  const [isShowRejectedReason, setIsShowRejectedReason] = useState<boolean>(false)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      { name: 'offset', options: { offset: [0, 8] } },
      {
        name: 'preventOverflow',
        options: {
          boundary: 'clippingParents',
          padding: 8
        }
      },
      {
        name: 'flip',
        options: {
          flipVariations: true
        }
      }
    ]
  })

  const onClosePopover = () => {
    setIsPopoverOpen(false)
    setReferenceElement(null)
    setPopperElement(null)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        moreIconRef.current &&
        !moreIconRef.current.contains(e.target as Node)
      ) {
        setIsPopoverOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div
      className='group relative h-full overflow-hidden rounded-lg border border-neutral-3 shadow-custom hover:cursor-pointer'
      onClick={() => navigate(path.detailEvent.link(registeredEvent.event.id))}
    >
      {!isFollowedEvent && (
        <>
          <div
            className='absolute right-2 top-2 z-10 rounded-full bg-neutral-9/80 p-2'
            onClick={(e) => {
              e.stopPropagation()
              setIsPopoverOpen((prev) => !prev)
            }}
            ref={moreIconRef}
          >
            <MoreIcon className='h-[16px] w-[16px]' />
          </div>

          {isPopoverOpen && (
            <div
              ref={popoverRef}
              style={{
                ...styles.popper,
                zIndex: 9999,
                position: 'absolute',
                top: '2rem',
                left: undefined,
                right: '1rem',
                width: 'fit-content'
              }}
              {...attributes.popper}
            >
              <RegisteredEventPopover
                tags={registeredEvent.tags}
                onClosePopover={onClosePopover}
                setIsShowCheckInHistory={setIsShowCheckInHistory}
                setIsShowRejectedReason={setIsShowRejectedReason}
              />
            </div>
          )}
        </>
      )}

      <div className='aspect-h-3 aspect-w-8 w-full'>
        <img src={registeredEvent.event.coverPhotoUrl} alt='ảnh sự kiện' className='object-cover' />
      </div>
      <div className='flex h-full flex-col gap-1 bg-neutral-0 px-4 py-2 group-hover:bg-neutral-2'>
        <div className='flex flex-wrap items-center gap-2'>
          {registeredEvent.tags.map((tag) => (
            <Tag
              key={tag}
              status={{ type: tag, label: REGISTERED_EVENT_TAG_LABEL[tag] }}
              statusClasses={EVENT_STATUS_COLOR_CLASSES}
            />
          ))}
        </div>
        <div className='flex items-center gap-1 text-sm font-medium text-body-text-2'>
          {moment(registeredEvent.event.startAt).format(DATE_TIME_FORMATS.DATE_TIME_COMMON)} -{' '}
          {moment(registeredEvent.event.endAt).format(DATE_TIME_FORMATS.DATE_TIME_COMMON)}
        </div>
        <div className='line-clamp-2 text-base font-semibold text-title-text'>{registeredEvent.event.name}</div>
        <div className='flex w-full items-center gap-x-1'>
          <div className='relative h-[24px] w-[24px] min-w-[24px]'>
            <img
              src={registeredEvent.event.organizer.avatarUrl || DUTLogo}
              alt='avatar'
              className='absolute left-0 top-0 mx-auto h-full w-full rounded-full border-[1px] border-gray-200 object-cover'
            />
          </div>
          <div className='line-clamp-1 text-sm font-medium text-neutral-5'>{registeredEvent.event.organizer.name}</div>
        </div>
        <div className='mt-1 flex items-center text-[0.8rem] text-neutral-6'>
          {registeredEvent.event.followerNumber > 0 && (
            <div>
              <span className='font-medium'>{registeredEvent.event.registerNumber}</span> người theo dõi
            </div>
          )}
          {registeredEvent.event.followerNumber > 0 && registeredEvent.event.registerNumber > 0 && (
            <DotIcon className='h-[16px] w-[16px]' />
          )}
          {registeredEvent.event.registerNumber > 0 && (
            <div>
              <span className='font-medium'>{registeredEvent.event.registerNumber}</span> người đã đăng ký
            </div>
          )}
        </div>
      </div>
      {isShowCheckInHistory && (
        <CheckInHistoryPopup setIsShowCheckInHistory={setIsShowCheckInHistory} registeredEvent={registeredEvent} />
      )}
      {isShowRejectedReason && (
        <RejectedReasonPopup
          setIsShowRejectedReason={setIsShowRejectedReason}
          eventName={registeredEvent.event.name}
          reason={registeredEvent.certificateStatus?.reason}
        />
      )}
    </div>
  )
}
