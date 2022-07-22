import './feed.css'
import Share from '../share/Share'
import Post from '../post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTimelinePosts } from '../../redux/actions/postAction'
import { useParams } from 'react-router-dom'

const Feed = () => {
  const dispatch = useDispatch()
  const user  = useSelector((state) => state.authReducer.authData)
  let { posts, loading } = useSelector((state) => state.postReducer)
  const params = useParams()

  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  }, [dispatch, user._id])

  if (!posts) return "Nothing to see here"
  if (params.id) posts = posts.filter((post) => post.userId === params.id)

  return (
    <div className='feed'>
      <div className="feed-wrapper">
        {user._id === params.id && <Share />}
      {loading 
        ? "Fetching posts..."
        : posts.map((post, id) => {
        return <Post post={post} id={id} />
      })}
      </div>
    </div>
  )
}

export default Feed
