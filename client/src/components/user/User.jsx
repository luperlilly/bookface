import './user.css'
import { Link } from 'react-router-dom'

const User = ({ person }) => {
  const PF = '/images/'

  return (
    <Link to={`../profile/${person._id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className='user'>
        <img className='user-image' src={person.profilePicture ? PF + person.profilePicture : PF + 'default-profile.png'} alt="" />
        <span className="user-name">{person.username}</span>
      </div>
    </Link>
  )
}

export default User