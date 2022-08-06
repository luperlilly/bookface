import { useEffect, useState } from 'react'
import './online.css'
import axios from 'axios'

const Online = ({ user }) => {
  const [onlineUser, setOnlineUser] = useState({})
  const PF = '/images/'

  useEffect(() => {
    const fetchOnlineUser = async () => {
      const res = await axios.get(`/api/users/${user}`)
      setOnlineUser(res.data)
    }
    fetchOnlineUser()
  }, [user.userId])

  return (
    <li className="rightbar-friend">
      <div className="rightbar-profile-image-container">
        <img src={onlineUser.profilePicture ? PF + onlineUser.profilePicture : PF + 'default-profile.png'} alt="" className="rightbar-profile-image" />
        <span className="rightbar-online"></span>
      </div>
      <span className="rightbar-username">{onlineUser.username}</span>
    </li>
  )
}

export default Online
