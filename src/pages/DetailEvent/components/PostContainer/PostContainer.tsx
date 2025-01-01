import { Post } from 'src/types/post.type'
import DUTLogo from 'src/assets/img/dut-logo.jpg'
import { OrganizerInformation } from 'src/types/event.type'
import { timeAgo } from 'src/utils/datetime'
import { DATE_TIME_FORMATS } from 'src/constants/common'
import HeartIcon from 'src/assets/icons/i-heart.svg?react'
import HeartActiveIcon from 'src/assets/icons/i-heart-active.svg?react'
import { usePosts } from 'src/pages/DetailEvent/hooks/usePosts'
import { useState } from 'react'
import PeopleLikedPopup from '../PeopleLikedPopup'
import ImageSlider from 'src/components/ImageSlider'

interface PostContainerProps {
  post: Post
  organizer: OrganizerInformation
}

export default function PostContainer({ post, organizer }: PostContainerProps) {
  const [isShowLikes, setIsShowLikes] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [isShowImageSlider, setIsShowImageSlider] = useState<boolean>(false)
  const {
    onLikePost: { mutate: likePost },
    onUnlikePost: { mutate: unlikePost }
  } = usePosts(post.event.id)

  const handleLikePost = () => {
    likePost(post.id)
  }

  const handleUnlikePost = () => {
    unlikePost(post.id)
  }

  const handleShowImageSlider = (image: string) => {
    setSelectedImage(image)
    setIsShowImageSlider(true)
  }

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
      {post.coverPhotoUrls.length > 0 && (
        <div
          className='relative block w-full rounded-lg border border-neutral-4 p-1'
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div className='flex w-full flex-col gap-[2px] overflow-hidden rounded-md'>
            <div className='block w-full'>
              <div className='flex w-full flex-row gap-[2px]'>
                {(post.coverPhotoUrls.length <= 3 ? post.coverPhotoUrls : post.coverPhotoUrls.slice(0, 2)).map(
                  (image, index) => (
                    <div
                      key={index}
                      className='relative block w-full hover:cursor-pointer'
                      onClick={() => handleShowImageSlider(image)}
                    >
                      <div className='aspect-h-9 aspect-w-16 relative block min-h-[150px] w-full overflow-hidden'>
                        <img
                          src={image}
                          alt={`Uploaded image ${index + 1}`}
                          className='absolute left-0 top-0 mx-auto h-full w-full object-cover'
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            {post.coverPhotoUrls.length >= 4 && (
              <div className='block w-full'>
                <div className='flex w-full flex-row gap-[2px]'>
                  {post.coverPhotoUrls.slice(2, 5).map((image, index) => (
                    <div
                      key={index}
                      className='relative block w-full hover:cursor-pointer'
                      onClick={() => handleShowImageSlider(image)}
                    >
                      <div className='aspect-h-9 aspect-w-16 relative block min-h-[150px] w-full overflow-hidden'>
                        <img
                          src={image}
                          alt={`Uploaded image ${index + 1}`}
                          className='absolute left-0 top-0 mx-auto h-full w-full object-cover'
                        />
                      </div>
                      {post.coverPhotoUrls.length > 5 && index === 2 && (
                        <div
                          className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-neutral-6/60 text-4xl font-medium tracking-wider text-neutral-3 hover:cursor-pointer'
                          onClick={() => handleShowImageSlider(image)}
                        >
                          +{post.coverPhotoUrls.length - 5}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className='flex w-full items-center justify-between'>
        <div className='flex w-full items-center justify-between gap-1'>
          <div className='flex items-center gap-1 rounded-full bg-transparent px-2 py-1 text-body-text-2 hover:cursor-pointer'>
            {post.likedAt && <HeartActiveIcon className='h-[16px] w-[16px]' onClick={handleUnlikePost} />}
            {!post.likedAt && <HeartIcon className='h-[16px] w-[16px]' onClick={handleLikePost} />}
            <span
              className='select-none text-sm font-normal hover:cursor-pointer hover:underline hover:underline-offset-2'
              onClick={() => setIsShowLikes(true)}
            >
              {post.likedNumber} lượt thích
            </span>
          </div>
        </div>
      </div>
      {isShowLikes && <PeopleLikedPopup id={post.id} type='post' setIsShowPopup={setIsShowLikes} />}
      {isShowImageSlider && (
        <ImageSlider
          imageList={post.coverPhotoUrls}
          currentImage={selectedImage}
          onClose={() => setIsShowImageSlider(false)}
        />
      )}
    </div>
  )
}
