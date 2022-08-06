import './close-friend.css'

const CloseFriend = ({ user }) => {
  const PF = '/images/'
  
  return (
    <li className="leftbar-friend">
      <img className='leftbar-friend-image' src={`${PF}default-profile.png`} alt="" />
      <span className="leftbar-friend-name">{user.username}</span>
    </li>
  )
}

export default CloseFriend

