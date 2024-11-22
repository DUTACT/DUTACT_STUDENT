import { useProfile } from 'src/hooks/useProfile'
import DUTLogo from 'src/assets/img/dut-logo.jpg'
import TelephoneIcon from 'src/assets/icons/i-telephone.svg?react'
import AddressIcon from 'src/assets/icons/i-address-card.svg?react'
import FacultyIcon from 'src/assets/icons/i-faculty.svg?react'
import ClassIcon from 'src/assets/icons/i-class.svg?react'

export default function Profile() {
  const { profile } = useProfile()

  return (
    <div className='relative flex h-full w-full max-w-page flex-col items-center bg-neutral-1'>
      <header className='flex h-header-page items-center justify-between'>
        <div className='text-md font-semibold'>Thông tin cá nhân</div>
      </header>
      <main className='flex w-full flex-grow flex-col gap-4 rounded-xl border border-neutral-3 bg-neutral-0 p-6 shadow-sm'>
        <div className='flex items-start gap-3'>
          <div className='flex flex-1 flex-col'>
            <div className='text-xl font-medium text-neutral-7'>{profile?.fullName}</div>
            <div className='mb-3 mt-1 text-sm font-light text-neutral-5'>{profile?.studentEmail}</div>
            {profile?.faculty && (
              <div className='mt-[6px] flex items-center gap-2'>
                <FacultyIcon className='h-[20px] w-[20px]' />
                <span className='text-sm font-normal text-neutral-6'>Khoa {profile?.faculty}</span>
              </div>
            )}
            {profile?.className && (
              <div className='mt-[6px] flex items-center gap-2'>
                <ClassIcon className='h-[20px] w-[20px]' />
                <span className='text-sm font-normal text-neutral-6'>Lớp {profile.className}</span>
              </div>
            )}
            {profile?.address && (
              <div className='mt-[6px] flex items-center gap-2'>
                <AddressIcon className='h-[20px] w-[20px]' />
                <span className='text-sm font-normal text-neutral-6'>{profile.address}</span>
              </div>
            )}
            {profile?.phone && (
              <div className='mt-[6px] flex items-center gap-2'>
                <TelephoneIcon className='h-[20px] w-[20px]' />
                <span className='text-sm font-normal text-neutral-6'>{profile.phone}</span>
              </div>
            )}
          </div>
          <div className='relative h-[120px] w-[120px] rounded-full border-[2px] border-neutral-4'>
            <img
              className='absolute left-0 top-0 mx-auto h-full w-full rounded-full border-[1px] border-gray-200 object-cover'
              src={profile?.avatarUrl || DUTLogo}
              alt='dut-logo'
            />
          </div>
        </div>
      </main>
    </div>
  )
}
