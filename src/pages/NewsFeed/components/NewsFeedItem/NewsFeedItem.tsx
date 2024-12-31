import { type NewsFeedItem as NewsFeedIemType } from 'src/types/newsfeed.type'
import DUTLogo from 'src/assets/img/dut-logo.jpg'
import { timeAgo } from 'src/utils/datetime'
import { DATE_TIME_FORMATS } from 'src/constants/common'
import HeartIcon from 'src/assets/icons/i-heart.svg?react'
import HeartActiveIcon from 'src/assets/icons/i-heart-active.svg?react'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/routes/path'
import { useNewsFeeds } from '../../hooks/useNewsFeeds'
import { useState } from 'react'
import PeopleLikedPopup from 'src/pages/DetailEvent/components/PeopleLikedPopup'

interface NewsFeedItemProps {
  newsFeed: NewsFeedIemType
}

export default function NewsFeedItem({ newsFeed }: NewsFeedItemProps) {
  const navigate = useNavigate()
  const [isShowLikes, setIsShowLikes] = useState<boolean>(false)

  const {
    onLikeNewsFeed: { mutate: likeNewsFeed },
    onUnlikeNewsFeed: { mutate: unlikeNewsFeed }
  } = useNewsFeeds()

  const handleLikeNewsFeed = () => {
    likeNewsFeed({ id: newsFeed.id, type: newsFeed.type })
  }

  const handleUnlikeNewsFeed = () => {
    unlikeNewsFeed({ id: newsFeed.id, type: newsFeed.type })
  }

  return (
    <div className='flex min-h-[100px] w-full flex-col gap-y-2 rounded-lg border border-neutral-2 bg-white p-4 shadow-sm'>
      <div className='flex w-full gap-x-2'>
        <div className='relative h-[40px] w-[40px] min-w-[40px]'>
          <img
            src={(newsFeed.type === 'post' ? newsFeed.organizer.avatarUrl : newsFeed.student.avatarUrl) || DUTLogo}
            alt='avatar'
            className='absolute left-0 top-0 mx-auto h-full w-full rounded-full border-[1px] border-gray-200 object-cover'
          />
        </div>
        <div className='flex flex-col'>
          <div className='text-md font-semibold text-neutral-8'>
            {newsFeed.type === 'post' ? newsFeed.organizer.name : newsFeed.student.name}
          </div>
          <div className='text-xs font-light text-neutral-6 hover:cursor-pointer'>
            {timeAgo(newsFeed.postedAt, DATE_TIME_FORMATS.ISO)}
          </div>
        </div>
      </div>
      <div
        className='text-sm font-normal text-title-text hover:cursor-pointer'
        onClick={() => navigate(path.detailEvent.link(newsFeed.event.id))}
      >
        Sự kiện: <span className='text-sm font-semibold'>{newsFeed.event.name}</span>
      </div>
      <p className='break-word flex whitespace-pre-line text-sm text-body-text'>{newsFeed.content}</p>
      {newsFeed.coverPhotoUrl && (
        <div className='aspect-h-9 aspect-w-16 relative w-full'>
          <img
            src={newsFeed.coverPhotoUrl}
            alt='cover-image'
            className='absolute left-0 top-0 mx-auto h-full w-full rounded-lg object-cover'
          />
        </div>
      )}
      <div className='flex w-full items-center justify-between'>
        <div className='flex w-full items-center justify-between gap-1'>
          <div className='flex items-center gap-1 rounded-full bg-transparent px-2 py-1 text-body-text-2 hover:cursor-pointer'>
            {newsFeed.likedAt && <HeartActiveIcon className='h-[16px] w-[16px]' onClick={handleUnlikeNewsFeed} />}
            {!newsFeed.likedAt && <HeartIcon className='h-[16px] w-[16px]' onClick={handleLikeNewsFeed} />}
            <span
              className='select-none text-sm font-normal hover:cursor-pointer hover:underline hover:underline-offset-2'
              onClick={() => setIsShowLikes(true)}
            >
              {newsFeed.likedNumber} lượt thích
            </span>
          </div>
        </div>
      </div>
      {isShowLikes && <PeopleLikedPopup id={newsFeed.id} type={newsFeed.type} setIsShowPopup={setIsShowLikes} />}
    </div>
  )
}
