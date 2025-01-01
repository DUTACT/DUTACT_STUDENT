import { createPortal } from 'react-dom'
import Divider from 'src/components/Divider'
import CloseIcon from 'src/assets/icons/i-close.svg?react'
import DUTLogo from 'src/assets/img/dut-logo.jpg'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import { useForm, useWatch } from 'react-hook-form'
import { CoverPhotoData, FeedbackBody } from 'src/types/feedback.type'
import { useEventId } from '../../hooks/useEventId'
import { useDetailEvent } from '../../hooks/useDetailEvent'
import { useFeedbacks } from '../../hooks/useFeedbacks'
import { toast } from 'react-toastify'
import { SUCCESS_MESSAGE } from 'src/constants/message'
import { cn } from 'src/lib/tailwind/utils'
import { useFeedback } from '../../hooks/useFeedback'
import { useEffect, useState } from 'react'
import DraggableImages from 'src/components/DraggableImages'

interface CreateOrUpdateFeedbackPopupProps {
  setIsShowCreateOrUpdateFeedbackPopup: React.Dispatch<React.SetStateAction<boolean>>
  updatedFeedbackId?: number
}

type FormData = Partial<FeedbackBody> & {
  coverPhotoArray?: Array<CoverPhotoData>
}

export default function CreateOrUpdateFeedbackPopup({
  setIsShowCreateOrUpdateFeedbackPopup,
  updatedFeedbackId
}: CreateOrUpdateFeedbackPopupProps) {
  const eventId = useEventId()
  const { event } = useDetailEvent(eventId)
  const {
    createFeedbackMutationResult: { mutate: mutateCreateFeedback, isPending: isCreatingFeedbackPending }
  } = useFeedbacks()
  const { feedback, editFeedbackMutationResult } = updatedFeedbackId
    ? useFeedback(updatedFeedbackId)
    : { feedback: undefined, editFeedbackMutationResult: undefined }

  const [removedCoverPhoto, setRemovedCoverPhoto] = useState<boolean>(false)

  const { control, handleSubmit, setValue, reset } = useForm<FormData>({
    defaultValues: {
      eventId,
      content: '',
      coverPhotoArray: updatedFeedbackId
        ? feedback?.coverPhotoUrls.map((coverPhotoUrl) => ({
            type: 'url',
            url: coverPhotoUrl
          })) || []
        : undefined
    }
  })

  const content = useWatch({ control, name: 'content' })

  useEffect(() => {
    if (updatedFeedbackId && feedback) {
      setValue('content', feedback.content)
    } else {
      console.log('reset')
      reset()
    }
  }, [feedback, updatedFeedbackId, setValue])

  useEffect(() => {
    setRemovedCoverPhoto(false)
  }, [setIsShowCreateOrUpdateFeedbackPopup])

  const onSubmit = handleSubmit((data) => {
    if (data.coverPhotoArray) {
      console.log('data', data.coverPhotoArray)
      if (data.coverPhotoArray.length > 0) {
        const keepCoverPhotoUrls: string[] = []
        const newCoverPhotos: File[] = []
        data.coverPhotoArray.forEach((photo) => {
          if (photo.type === 'file') {
            newCoverPhotos.push(photo.file as File)
          } else {
            keepCoverPhotoUrls.push(photo.url as string)
          }
        })
        data.keepCoverPhotoUrls = keepCoverPhotoUrls
        data.coverPhotos = newCoverPhotos
      }
      delete data.coverPhotoArray
    }
    if (updatedFeedbackId) {
      if (!data.coverPhoto) {
        delete data.coverPhoto
      }
      editFeedbackMutationResult &&
        editFeedbackMutationResult.mutate(
          { ...data, deleteCoverPhoto: removedCoverPhoto },
          {
            onSuccess: () => {
              toast.success(SUCCESS_MESSAGE.UPDATE_FEEDBACK)
              setIsShowCreateOrUpdateFeedbackPopup(false)
            },
            onError: (error) => {
              toast.error(error.message)
            }
          }
        )
    } else {
      if (!data.coverPhoto) {
        delete data.coverPhoto
      }
      if (data.deleteCoverPhoto === undefined) {
        delete data.deleteCoverPhoto
      }
      mutateCreateFeedback(data as Partial<FeedbackBody>, {
        onSuccess: () => {
          toast.success(SUCCESS_MESSAGE.CREATE_FEEDBACK)
          setIsShowCreateOrUpdateFeedbackPopup(false)
        },
        onError: (error) => {
          toast.error(error.message)
        }
      })
    }
  })

  return createPortal(
    <div
      className='fixed left-0 right-0 top-0 z-10 flex h-[100vh] w-[100vw] items-center justify-center bg-overlay'
      onClick={() => setIsShowCreateOrUpdateFeedbackPopup(false)}
    >
      <div
        className='h-fit max-h-popup w-[600px] max-w-popup overflow-hidden rounded-lg bg-neutral-0 shadow-custom'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex h-header-popup items-center justify-between px-6'>
          <div className='text-base font-medium text-neutral-7'>
            {updatedFeedbackId ? 'Chỉnh sửa cảm nghĩ' : 'Cảm nghĩ về sự kiện'}
          </div>
          <div
            className='-mr-1 cursor-pointer p-1 opacity-70 hover:opacity-100'
            onClick={() => setIsShowCreateOrUpdateFeedbackPopup(false)}
          >
            <CloseIcon className='h-[20px] w-[20px]' />
          </div>
        </div>
        <Divider />
        <div className='block max-h-main-popup overflow-auto px-6 py-4'>
          <div className='flex w-full flex-1 items-start gap-2'>
            <div className='min-h-logo-md w-logo-md relative h-logo-md min-w-logo-md'>
              <img
                className='absolute left-0 top-0 mx-auto h-full w-full rounded-full border-[1px] border-gray-200 object-cover'
                src={DUTLogo}
                alt='dut-logo'
              />
            </div>
            <div className='block flex-1'>
              <div className='line-clamp-1 text-sm font-semibold text-neutral-7'>Sinh viên</div>
              <Input
                name='content'
                control={control}
                variant='textarea'
                placeholder='Cảm nghĩ về sự kiện...'
                classNameWrapper='mt-1 w-full min-h-fit'
                classNameInput='mt-0 h-auto min-h-fit w-full resize-none overflow-hidden rounded-none border-none p-0 text-sm focus:outline-transparent'
                autoResize
              />
              <DraggableImages
                name='coverPhotoArray'
                control={control}
                showIsRequired={false}
                classNameWrapper='text-sm w-full flex-1'
              />
            </div>
          </div>
        </div>
        <div className='flex h-footer-popup items-center justify-between px-6 text-sm'>
          {event && (
            <div className='flex items-center gap-1 text-neutral-5'>
              <span className='min-w-fit'>Sự kiện:</span>
              <span className='line-clamp-1 font-semibold'>{event.name}</span>
            </div>
          )}
          <Button
            title='Đăng'
            type='submit'
            onClick={onSubmit}
            classButton='w-fit rounded-lg border-neutral-5 bg-neutral-0 px-4 py-[6px] text-base font-medium text-neutral-7 hover:border-neutral-5'
            classButtonDisabled='cursor-not-allowed opacity-40'
            disabled={!content || isCreatingFeedbackPending || editFeedbackMutationResult?.isPending}
            classWrapperLoading={cn('', {
              block: isCreatingFeedbackPending || editFeedbackMutationResult?.isPending
            })}
            classLoadingIndicator='text-neutral-7 fill-neutral-7'
          />
        </div>
      </div>
    </div>,
    document.body
  )
}
