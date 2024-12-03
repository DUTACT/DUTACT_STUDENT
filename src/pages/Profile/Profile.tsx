import { useProfile } from 'src/hooks/useProfile'
import TelephoneIcon from 'src/assets/icons/i-telephone.svg?react'
import AddressIcon from 'src/assets/icons/i-address-card.svg?react'
import FacultyIcon from 'src/assets/icons/i-faculty.svg?react'
import ClassIcon from 'src/assets/icons/i-class.svg?react'
import RewindTime from 'src/assets/icons/i-rewind-time.svg?react'
import Avatar from './components/Avatar'
import Button from 'src/components/Button'
import UpdateProfilePopup from './components/UpdateProfilePopup'
import { useState } from 'react'
import ChangePasswordPopup from './components/ChangePasswordPopup'
import RegisteredEvents from './components/RegisteredEvents'
import FollowedEvents from './components/FollowedEvents'
import ActivityProofs from './components/ActivityProofs'
import { cn } from 'src/lib/tailwind/utils'
import ActivityHistoryPopup from './components/ActivityHistoryPopup/ActivityHistoryPopup'

interface Tab {
  id: string
  label: string
  component: React.ComponentType
}

const TABS: Tab[] = [
  { id: 'registeredEvents', label: 'Sự kiện đã đăng ký', component: RegisteredEvents },
  { id: 'followedEvents', label: 'Sự kiện đã theo dõi', component: FollowedEvents },
  { id: 'activityProofs', label: 'Minh chứng hoạt động', component: ActivityProofs }
]

export default function Profile() {
  const [isShowUpdateProfilePopup, setIsShowUpdateProfilePopup] = useState<boolean>(false)
  const [isShowChangePasswordPopup, setIsShowChangePasswordPopup] = useState<boolean>(false)
  const [isShowActivityHistoryPopup, setIsShowActivityHistoryPopup] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('registeredEvents')

  const { profile } = useProfile()

  const ActiveComponent = TABS.find((tab) => tab.id === activeTab)?.component

  return (
    <div className='relative flex h-full w-full max-w-page flex-col items-center bg-neutral-1'>
      <header className='flex h-header-page items-center justify-between'>
        <div className='text-md font-semibold'>Thông tin cá nhân</div>
      </header>
      <main className='flex w-full flex-grow flex-col gap-4 rounded-xl border border-neutral-3 bg-neutral-0 p-6 shadow-sm'>
        <div className='flex items-start gap-3'>
          <div className='flex flex-1 flex-col'>
            <div className='text-xl font-medium text-neutral-7'>{profile?.name}</div>
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
            <div className='mt-4 flex items-center gap-2'>
              <Button
                title='Cập nhật thông tin'
                classButton='bg-neutral-0 hover:bg-neutral-1 border border-neutral-5 hover:border-neutral-5 max-w-[150px] px-2 py-1'
                classTitle='text-sm font-medium'
                onClick={() => setIsShowUpdateProfilePopup(true)}
              />
              <Button
                title='Đổi mật khẩu'
                classButton='bg-neutral-0 hover:bg-neutral-1 border border-neutral-5 hover:border-neutral-5 max-w-[150px] px-2 py-1'
                classTitle='text-sm font-medium'
                onClick={() => setIsShowChangePasswordPopup(true)}
              />
            </div>
            <div
              className='group mt-4 flex items-center gap-1 text-sm text-neutral-6 hover:cursor-pointer hover:opacity-80'
              onClick={() => setIsShowActivityHistoryPopup(true)}
            >
              <RewindTime className='h-[20px] w-[20px]' />
              <div>Xem lịch sử hoạt động</div>
            </div>
          </div>
          <Avatar avatarUrl={profile?.avatarUrl} />
        </div>
        <div className='mt-2 flex w-full flex-col gap-3'>
          <nav className='flex w-full gap-0 border-b-[1px]'>
            {TABS.map((tab) => (
              <div
                key={tab.id}
                className={cn('flex-1 p-3 text-center text-sm', {
                  'border-b-2 border-semantic-secondary font-medium text-semantic-secondary hover:cursor-default':
                    tab.id === activeTab,
                  'font-normal text-neutral-7 hover:cursor-pointer': tab.id !== activeTab
                })}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </div>
            ))}
          </nav>
        </div>
        {ActiveComponent && <ActiveComponent />}
      </main>
      {isShowUpdateProfilePopup && <UpdateProfilePopup setIsShowUpdateProfilePopup={setIsShowUpdateProfilePopup} />}
      {isShowChangePasswordPopup && <ChangePasswordPopup setIsShowChangePasswordPopup={setIsShowChangePasswordPopup} />}
      {isShowActivityHistoryPopup && (
        <ActivityHistoryPopup setIsShowActivityHistoryPopup={setIsShowActivityHistoryPopup} />
      )}
    </div>
  )
}
