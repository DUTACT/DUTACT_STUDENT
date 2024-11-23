import DUTLogo from 'src/assets/img/dut-logo.jpg'
import CameraIcon from 'src/assets/icons/i-camera.svg?react'
import { useRef } from 'react'
import { CONFIG } from 'src/constants/config'
import { toast } from 'react-toastify'
import { useProfile } from 'src/hooks/useProfile'

interface AvatarProps {
  avatarUrl?: string | null
}

export default function Avatar({ avatarUrl }: AvatarProps) {
  const {
    onUpdateProfile: { mutate: updateProfile }
  } = useProfile()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const openSelectFilePopup = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]

    if (fileFromLocal) {
      if (fileFromLocal.size >= CONFIG.MAX_SIZE_UPLOAD_IMAGE || !fileFromLocal.type.includes('image')) {
        toast.error('Dung lượng file tối đa 5 MB. Định dạng: .JPG, .JPEG, .PNG', {
          position: 'top-center'
        })
      } else {
        updateProfile({ avatar: fileFromLocal })
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className='relative h-[120px] w-[120px] rounded-full border-[2px] border-neutral-4'>
      <img
        className='absolute left-0 top-0 mx-auto h-full w-full rounded-full border-[1px] border-gray-200 object-cover'
        src={avatarUrl || DUTLogo}
        alt='dut-logo'
      />
      <div
        className='absolute bottom-1 right-1 flex items-center justify-center rounded-full bg-neutral-7/70 p-[6px] hover:cursor-pointer hover:bg-neutral-7/90'
        onClick={openSelectFilePopup}
      >
        <CameraIcon className='h-[20px] w-[20px]' />
      </div>
      <input ref={fileInputRef} className='hidden' type='file' accept='.jpg,.jpeg,.png' onChange={handleFile} />
    </div>
  )
}
