import './leftbar.css'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import ChatIcon from '@mui/icons-material/Chat'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import GroupIcon from '@mui/icons-material/Group'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import EventIcon from '@mui/icons-material/Event'
import SchoolIcon from '@mui/icons-material/School'
import CloseFriend from '../closeFriend/CloseFriend'
import { Users } from "../../dummyData"
import { getAllUsers } from '../../redux/api/userRequest'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import User from '../user/User'

const Leftbar = () => {
  const user = useSelector((state) => state.authReducer.authData)
  const [users, setUsers] = useState([])
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await getAllUsers()
      setUsers(data)
    }
    fetchUsers()
  }, [])

  return (
    <div className='leftbar'>
      <div className='leftbar-wrapper'>
        <ul className='leftbar-list'>
          <li className="leftbar-list-item">
            <RssFeedIcon className='leftbar-icon' />
            <span className="leftbar-list-item-text">Feed</span>
          </li>
          <li className="leftbar-list-item">
            <ChatIcon className='leftbar-icon' />
            <span className="leftbar-list-item-text">Chats</span>
          </li>
          <li className="leftbar-list-item">
            <PlayCircleFilledIcon className='leftbar-icon' />
            <span className="leftbar-list-item-text">Videos</span>
          </li>
          <li className="leftbar-list-item">
            <GroupIcon className='leftbar-icon' />
            <span className="leftbar-list-item-text">Groups</span>
          </li>
          <li className="leftbar-list-item">
            <BookmarkIcon className='leftbar-icon' />
            <span className="leftbar-list-item-text">Bookmarks</span>
          </li>
          <li className="leftbar-list-item">
            <HelpOutlineIcon className='leftbar-icon' />
            <span className="leftbar-list-item-text">Questions</span>
          </li>
          <li className="leftbar-list-item">
            <WorkOutlineIcon className='leftbar-icon' />
            <span className="leftbar-list-item-text">Jobs</span>
          </li>
          <li className="leftbar-list-item">
            <EventIcon className='leftbar-icon' />
            <span className="leftbar-list-item-text">Events</span>
          </li>
          <li className="leftbar-list-item">
            <SchoolIcon className='leftbar-icon' />
            <span className="leftbar-list-item-text">Courses</span>
          </li>
        </ul>
        <button className="leftbar-button">Show more</button>
        <hr className='leftbar-hr' />
        <span className='leftbar-suggestions'>People you may know...</span>
        <ul className="leftbar-friend-list">
          {users.filter((u) => u._id !== user._id).map((u) => (
            <User key={u.id} person={u} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Leftbar 
