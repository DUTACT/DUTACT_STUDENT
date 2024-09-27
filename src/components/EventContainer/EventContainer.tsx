import TimeIcon from 'src/assets/icons/i-time.svg?react'
import DeadlineIcon from 'src/assets/icons/i-deadline.svg?react'
import HeartIcon from 'src/assets/icons/i-heart.svg?react'
import HeartActiveIcon from 'src/assets/icons/i-heart-active.svg?react'
import FollowIcon from 'src/assets/icons/i-follow.svg?react'
import FollowActiveIcon from 'src/assets/icons/i-follow-active.svg?react'
import UserAddIcon from 'src/assets/icons/i-user-add.svg?react'
import UserAddActiveIcon from 'src/assets/icons/i-user-add-active.svg?react'
import UserAddSecondaryIcon from 'src/assets/icons/i-user-add-secondary.svg?react'

export default function EventContainer() {
  return (
    <div className='flex min-h-[100px] w-full flex-col gap-y-2 rounded-lg border border-neutral-2 bg-white p-4 shadow-sm'>
      <div className='flex w-full gap-x-2'>
        <div className='relative h-[40px] w-[40px] min-w-[40px]'>
          <img
            src='https://images.unsplash.com/photo-1592355591640-4e3e558c6940?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='avatar'
            className='absolute left-0 top-0 mx-auto h-full w-full rounded-full border-[1px] border-gray-200 object-cover'
          />
        </div>
        <div className='flex flex-col'>
          <div className='text-sm font-semibold text-neutral-8'>Trường Đại học Bách khoa Đà Nẵng</div>
          <div className='text-xs font-light text-neutral-6'>32 phút trước</div>
        </div>
      </div>
      <div className='text-sm font-normal text-title-text'>
        Sự kiện: <span className='text-sm font-semibold'>DEV DAY DANANG 2023 </span>
      </div>
      <div className='flex items-center gap-1 text-xs font-normal text-body-text-2'>
        <TimeIcon className='h-[14px] w-[14px]' />
        <span className='min-w-[100px]'>Thời gian diễn ra: </span>
        <span className='ml-1'>18/9/2024 - 19/9/2024</span>
      </div>
      <div className='flex items-center gap-1 text-xs font-normal text-body-text-2'>
        <DeadlineIcon className='h-[14px] w-[14px]' />
        <span className='min-w-[100px]'>Thời gian đăng ký: </span>
        <span className='ml-1'>14/9/2024 - 17/9/2024</span>
      </div>
      <p className='break-word flex whitespace-pre-line text-xs text-body-text'>
        {`💥DevDay Da Nang 2023: Sẵn sàng là sự kiện có quy mô lớn nhất dành cho Cộng đồng công nghệ thông tin Đà Nẵng từ
        trước đến nay💥\n💥DevDay Da Nang 2023: Sẵn sàng là sự kiện có quy mô lớn nhất dành cho Cộng đồng công nghệ thông tin Đà Nẵng từ
        trước đến nay💥\n💥DevDay Da Nang 2023: Sẵn sàng là sự kiện có quy mô lớn nhất dành cho Cộng đồng công nghệ thông tin Đà Nẵng từ
        trước đến nay💥\n💥DevDay Da Nang 2023: Sẵn sàng là sự kiện có quy mô lớn nhất dành cho Cộng đồng công nghệ thông tin Đà Nẵng từ
        trước đến nay💥\n💥DevDay Da Nang 2023: Sẵn sàng là sự kiện có quy mô lớn nhất dành cho Cộng đồng công nghệ thông tin Đà Nẵng từ
        trước đến nay💥`}
      </p>
      <div className='aspect-w-16 aspect-h-9 relative w-full'>
        <img
          src='https://images.unsplash.com/photo-1592355591640-4e3e558c6940?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='cover-image'
          className='absolute left-0 top-0 mx-auto h-full w-full rounded-lg object-cover'
        />
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <div className='flex items-center gap-1 rounded-full bg-transparent px-2 py-1 text-body-text-2 hover:cursor-pointer hover:bg-neutral-2'>
            <HeartActiveIcon className='h-[16px] w-[16px]' />
            <span className='text-xs font-normal'>123 lượt thích</span>
          </div>
          <div className='flex items-center gap-1 rounded-full bg-transparent px-2 py-1 text-body-text-2 hover:cursor-pointer hover:bg-neutral-2'>
            <FollowActiveIcon className='h-[16px] w-[16px]' />
            <span className='text-xs font-normal'>123 lượt theo dõi</span>
          </div>
          <div className='flex items-center gap-1 rounded-full bg-transparent px-2 py-1 text-body-text-2 hover:cursor-pointer hover:bg-neutral-2'>
            <UserAddActiveIcon className='h-[16px] w-[16px]' />
            <span className='text-xs font-normal'>30 lượt đăng ký</span>
          </div>
        </div>
        <div className='flex items-center gap-1 rounded-md bg-semantic-secondary-background px-6 py-2 opacity-90 hover:cursor-pointer hover:opacity-100'>
          <UserAddSecondaryIcon className='h-[16px] w-[16px]' />
          <span className='text-xs font-medium text-semantic-secondary'>Đăng ký</span>
        </div>
      </div>
    </div>
  )
}
