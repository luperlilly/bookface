import './post.css'
import { Users } from '../../dummyData'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom'
import { likePost } from '../../redux/api/postRequest'

const Post = ({ post }) => {
  const user = useSelector((state) => state.authReducer.authData)
  const [postUser, setPostUser] = useState({})
  const [likes, setLikes] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id))
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${post.userId}`)
      setPostUser(res.data)
    }
    fetchUser()
  }, [post.userId])

  const likeHandler = () => {
    likePost(post._id, user._id)
    setIsLiked(!isLiked)
    isLiked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }

  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
          <Link to={`/profile/${postUser._id}`}>
            <img className='post-profile-image' src={postUser.profilePicture ? PF + postUser.profilePicture : PF + 'default-profile.png'} alt="" />
          </Link>
            <span className="post-username">{postUser.username}</span>
            <span className="post-date"><TimeAgo date={post.createdAt} /></span>
          </div>
          <div className="post-top-right">
            <MoreVertIcon />
          </div>
        </div>
        <div className="post-center">
          <span className="post-text">{post?.content}</span>
          <img className='post-image' src={post.img ? PF + post.img : ''} alt="" />
        </div>
        <div className="post-bottom">
          <div className="post-bottom-left">
            <img className='like-icon' src={`${PF}like.png`} onClick={likeHandler} alt="" />
            <img className='like-icon' src={`${PF}heart.png`} onClick={likeHandler} alt="" />
            <span className="post-like-counter">{likes}</span>
          </div>
          <div className="post-bottom-right">
            <span className="post-comment-text">{post.comments} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
