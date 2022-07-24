import './rightbar.css'
import Online from '../online/Online'
import { followUser, unfollowUser } from '../../redux/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import EditProfileModal from '../editProfileModal/EditProfileModal'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const Rightbar = ({ profileUser }) => {
  const user = useSelector((state) => state.authReducer.authData)
  const [modalOpened, setModalOpened] = useState(false)
  const [profileUserFriends, setProfileUserFriends] = useState([])
  const dispatch = useDispatch()
  const params = useParams()
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const following = profileUser && user.following.includes(params.id)

  const handleFollow = () => {
    following ?
    dispatch(unfollowUser(profileUser._id, user))
    : dispatch(followUser(profileUser._id, user))
  }

  useEffect(() => {
    const fetchProfileUserFriends = async () => {
      const res = await axios.get(`/api/users/${params.id}/friends`)
      setProfileUserFriends(res.data)
    }
    fetchProfileUserFriends()
  }, [params.id])

  const HomeRightbar = () => {
    return(
      <>
        <div className="birthday-container">
          <img className="birthday-image" src={PF + 'gift.png'} alt="" />
          <span className="birthday-text">
            <b>Rey McSriff</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img className="rightbar-ad" src={PF + 'ad.jpeg'} alt="" />
        <h4 className="rightbar-title">Online friends</h4>
        <ul className="rightbar-friend-list">
          {user.following.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {

    return(
      <>
        { user._id !== profileUser._id && (
            <button className="rightbar-follow-button" onClick={handleFollow}>
              { following ? 'Unfollow' : 'Follow' }
              { following ? <RemoveIcon /> : <AddIcon /> }
            </button>
        )}
        <h4 className='rightbar-title'>User information</h4>
        {user._id === profileUser._id && <button className="edit-profile-button" onClick={() => setModalOpened(true)}>Edit profile</button>}
        <EditProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user} />
        <div className="rightbar-info">
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">City:</span>
            <span className="rightbar-info-value">{profileUser.city}</span>
          </div>
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">From:</span>
            <span className="rightbar-info-value">{profileUser.from}</span>
          </div>
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">Relationship:</span>
            <span className="rightbar-info-value">{profileUser.relationship}</span>
          </div>
        </div>
        <h4 className='rightbar-title'>User friends</h4>
        <div className="rightbar-followings">
          {profileUserFriends.map((friend) => (
            <div className="rightbar-following">
            <img src={friend.profilePicture ? PF + friend.profilePicture : PF + 'default-profile.png'} alt="" className="rightbar-following-image" />
            <span className="rightbar-following-name">{friend.username}</span>
          </div>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbar-wrapper">
        { profileUser ? <ProfileRightbar /> : <HomeRightbar /> }
      </div>
    </div>
  )
}

export default Rightbar
