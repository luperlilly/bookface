import './share.css'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import LabelIcon from '@mui/icons-material/Label'
import RoomIcon from '@mui/icons-material/Room'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import CancelIcon from '@mui/icons-material/Cancel'
import { useDispatch, useSelector } from 'react-redux'
import { useRef, useState } from 'react'
import { uploadImage, uploadPost } from '../../redux/actions/uploadAction'

const Share = () => {
  const user = useSelector((state) => state.authReducer.authData)
  const loading = useSelector((state) => state.postReducer.loading)
  const [image, setImage] = useState(null)
  const imageRef = useRef()
  const content = useRef()
  const dispatch = useDispatch()
  const PF = '/images/'

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]
      setImage({image: URL.createObjectURL(img)})
      setImage(img)
    }    
  }

  const reset = () => {
    setImage(null)
    content.current.value = ""
  }

  const handleSubmit = (e) => {
    e.preventDefault()
 
    const newPost = {
      userId: user._id,
      content: content.current.value
    }

    if (image) {
      const data = new FormData()
      const fileName = Date.now() + image.name
      data.append("name", fileName)
      data.append("file", image)
      newPost.img = fileName
      console.log(newPost)

      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(uploadPost(newPost))
    reset()
  }

  const capitalise = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  return (
    <div className="share">
      <div className="share-wrapper">
        <div className="share-top">
          <img className='share-profile-image' src={user.profilePicture ? PF + user.profilePicture : PF + 'default-profile.png'} alt="" />
          <input placeholder={`What's on your mind, ${capitalise(user.username)}?`} className='share-input' ref={content} required />
        </div>
        <hr className='share-hr' />
        <div className="share-bottom">
          <div className="share-options">
            <div className="share-option" onClick={ () => imageRef.current.click() }>
              <PermMediaIcon htmlColor='tomato' className='share-icon' />
              <span className='share-option-text'>Photo or Video</span>
            </div>
            <div className="share-option">
              <LabelIcon htmlColor='blue' className='share-icon' />
              <span className='share-option-text'>Tag</span>
            </div>
            <div className="share-option">
              <RoomIcon htmlColor='green' className='share-icon' />
              <span className='share-option-text'>Location</span>
            </div>
            <div className="share-option">
              <EmojiEmotionsIcon htmlColor='gold' className='share-icon' />
              <span className='share-option-text'>Feelings</span>
            </div>
          </div>
          <button className="share-button" onClick={handleSubmit} disabled={loading} >
            { loading ? "Uploading..." : "Share" }
          </button>
          <div style={{display: "none"}}>
            <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>
        {image && (
        <div className="preview-image">
          <CancelIcon onClick={ () => setImage(null) } />
          <img src={URL.createObjectURL(image)} alt="" />
        </div>
      )}
      </div>
    </div>
  )
}

export default Share
