import Feed from '../../components/feed/Feed'
import Leftbar from '../../components/leftbar/Leftbar'
import Rightbar from '../../components/rightbar/Rightbar'
import Topbar from '../../components/topbar/Topbar'
import { useSelector } from 'react-redux'
import './profile.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

const Profile = () => {
  const currentUser  = useSelector((state) => state.authReducer.authData)
  const [profileUser, setProfileUser] = useState({})
  const profileUserId = useParams().id
  const isCurrentUser = profileUserId === currentUser._id
  const user = isCurrentUser ? currentUser : profileUser
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    if (profileUserId === currentUser._id) {
      return
    }
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${profileUserId}`)
      setProfileUser(res.data)
    }
    fetchUser()
  }, [profileUserId, currentUser])

  // pass prop to feed as 'feedUserId' instead of 'userId' to avoid potential naming conflicts
  return (
    <>
      <Topbar />
      <div className="profile">
        <Leftbar />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img className='profile-cover-image' src={user.coverPicture ? PF + user.coverPicture : PF + 'default-cover.jpeg'} alt="" />
              <img className='profile-user-image' src={user.profilePicture ? PF + user.profilePicture : PF + 'default-profile.png'} alt="" />
            </div>
            <div className="profile-info">
              <h4 className='profile-info-name'>{user.username}</h4>
              <span className='profile-info-description'>{user.description}</span>
            </div>
          </div>
          <div className="profile-right-bottom">
            <Feed feedUserId={profileUserId} />
            <Rightbar profileUser={user} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
