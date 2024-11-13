import { Post } from 'src/types/post.type'
import DUTLogo from 'src/assets/img/dut-logo.jpg'
import { OrganizerInformation } from 'src/types/event.type'
import { timeAgo } from 'src/utils/datetime'
import { DATE_TIME_FORMATS } from 'src/constants/common'
import HeartIcon from 'src/assets/icons/i-heart.svg?react'
import HeartActiveIcon from 'src/assets/icons/i-heart-active.svg?react'

interface PostContainerProps {
  post: Post
  organizer: OrganizerInformation
}

export default function PostContainer({ post, organizer }: PostContainerProps) {
  return (
    <div className='flex min-h-[100px] w-full flex-col gap-y-2 rounded-lg border border-neutral-2 bg-white p-4 shadow-sm'>
      <div className='flex w-full gap-x-2'>
        <div className='relative h-[40px] w-[40px] min-w-[40px]'>
          <img
            src={organizer.avatarUrl || DUTLogo}
            alt='avatar'
            className='absolute left-0 top-0 mx-auto h-full w-full rounded-full border-[1px] border-gray-200 object-cover'
          />
        </div>
        <div className='flex flex-col'>
          <div className='text-md font-semibold text-neutral-8'>{organizer.name}</div>
          <div className='text-xs font-light text-neutral-6'>{timeAgo(post.postedAt, DATE_TIME_FORMATS.ISO)}</div>
        </div>
      </div>

      <p className='break-word flex whitespace-pre-line text-sm text-body-text'>{post.content}</p>
      <div className='aspect-h-9 aspect-w-16 relative w-full'>
        <img
          src={post.coverPhotoUrl}
          alt='cover-image'
          className='absolute left-0 top-0 mx-auto h-full w-full rounded-lg object-cover'
        />
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <div className='flex items-center gap-1 rounded-full bg-transparent px-2 py-1 text-body-text-2 hover:cursor-pointer hover:bg-neutral-2'>
            <HeartActiveIcon className='h-[16px] w-[16px]' />
            <span className='select-none text-sm font-normal'>123</span>
          </div>
        </div>
      </div>
    </div>
  )
}
