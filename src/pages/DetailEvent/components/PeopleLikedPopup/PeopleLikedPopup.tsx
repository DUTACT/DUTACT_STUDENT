import React from 'react'
import { createPortal } from 'react-dom'
import CloseIcon from 'src/assets/icons/i-close.svg?react'
import Divider from 'src/components/Divider'
import { usePostLikes } from '../../hooks/usePostLikes'
import { useFeedbackLikes } from '../../hooks/useFeedbackLikes'

interface PeopleLikedPopupProps {
  id: number
  type: 'post' | 'feedback'
  setIsShowPopup: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PeopleLikedPopup({ id, type, setIsShowPopup }: PeopleLikedPopupProps) {
  const { likes } = type === 'post' ? usePostLikes(id) : useFeedbackLikes(id)
  return createPortal(
    <div
      className='fixed left-0 right-0 top-0 z-20 flex h-[100vh] w-[100vw] items-center justify-center bg-overlay'
      onClick={(e) => {
        e.stopPropagation()
        setIsShowPopup(false)
      }}
    >
      <div
        className='h-fit max-h-popup w-[600px] max-w-popup overflow-hidden rounded-lg bg-neutral-0 shadow-custom'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex h-header-popup items-center justify-between px-6'>
          <div className='text-base font-medium text-neutral-7'>{likes.length} lượt thích</div>
          <div className='-mr-1 cursor-pointer p-1 opacity-70 hover:opacity-100' onClick={() => setIsShowPopup(false)}>
            <CloseIcon className='h-[20px] w-[20px]' />
          </div>
        </div>
        <Divider />
        <div className='flex max-h-main-popup min-h-[300px] flex-col gap-2 overflow-auto px-6 py-4'>
          {likes.map((likeInfo, idx) => (
            <>
              <div className='flex items-center gap-2'>
                <div className='relative h-[44px] min-w-[44px] rounded-full border border-neutral-4'>
                  <img
                    src={likeInfo.avatarUrl}
                    className='absolute left-0 top-0 mx-auto h-full w-full rounded-full object-cover'
                    alt='avatar'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <div className='font-medium text-neutral-7'>{likeInfo.fullName}</div>
                  <div className='text-sm text-neutral-5'>MSSV: {likeInfo.email.split('@')[0]}</div>
                </div>
              </div>
              {idx < likes.length - 1 && <Divider />}
            </>
          ))}
        </div>
      </div>
    </div>,
    document.body
  )
}
