import { toast } from 'react-toastify'
import { useEventId } from '../../hooks/useEventId'
import { usePosts } from '../../hooks/usePosts'
import PostContainer from 'src/pages/DetailEvent/components/PostContainer'
import { OrganizerInformation } from 'src/types/event.type'
import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

interface PostListProps {
  organizer: OrganizerInformation
}

export default function PostList({ organizer }: PostListProps) {
  const eventId = useEventId()
  const { posts, error, isLoading } = usePosts(eventId)
  const [searchParams] = useSearchParams()
  const postId = searchParams.get('postId') ? parseInt(searchParams.get('postId') || '0', 10) : 0
  const postRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    if (postId && posts.length > 0) {
      const postElement = postRefs.current[postId]
      if (postElement) {
        postElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [postId, posts])

  if (error) {
    toast.error(error.message)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (posts.length === 0) {
    return <div>Chưa có bài đăng nào</div>
  } else {
    return (
      <div className='flex flex-col gap-3'>
        {posts.map((post) => (
          <div
            key={post.id}
            ref={(el) => {
              postRefs.current[post.id] = el
            }}
          >
            <PostContainer post={post} organizer={organizer} />
          </div>
        ))}
      </div>
    )
  }
}
