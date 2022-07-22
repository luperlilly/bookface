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
  const user  = useSelector((state) => state.authReducer.authData)
  const [profileUser, setProfileUser] = useState({})
  const userId = useParams().id
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${userId}`)
      setProfileUser(res.data)
    }
    fetchUser()
  }, [userId])

  // pass prop to feed as 'feedUserId' instead of 'userId' to avoid potential naming conflicts
  return (
    <>
      <Topbar />
      <div className="profile">
        <Leftbar />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img className='profile-cover-image' src={profileUser.coverPicture ? PF + profileUser.coverPicture : PF + 'default-cover.jpeg'} alt="" />
              <img className='profile-user-image' src={profileUser.profilePicture ? PF + profileUser.profilePicture : PF + 'default-profile.png'} alt="" />
            </div>
            <div className="profile-info">
              <h4 className='profile-info-name'>{profileUser.username}</h4>
              <span className='profile-info-description'>{profileUser.description}</span>
            </div>
          </div>
          <div className="profile-right-bottom">
            <Feed feedUserId={userId} />
            <Rightbar profileUser={profileUser} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
