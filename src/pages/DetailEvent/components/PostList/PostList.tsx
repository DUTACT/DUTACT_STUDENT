import { toast } from 'react-toastify'
import { useEventId } from '../../hooks/useEventId'
import { usePosts } from '../../hooks/usePosts'
import PostContainer from 'src/components/PostContainer'
import { OrganizerInformation } from 'src/types/event.type'

interface PostListProps {
  organizer: OrganizerInformation
}

export default function PostList({ organizer }: PostListProps) {
  const eventId = useEventId()
  const { posts, error, isLoading } = usePosts(eventId)

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
          <PostContainer key={post.id} post={post} organizer={organizer} />
        ))}
      </div>
    )
  }
}
