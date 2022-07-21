import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../../redux/actions/authAction'
import './register.css'

const Register = () => {
  const [data, setData] = useState({ username: "", email: "", password: "", confirmpassword: "" })
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector((state) => state.authReducer.loading)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    data.password === data.confirmpassword ? dispatch(signUp(data)) : setPasswordsMatch(false)
    navigate('/')
  }

  // const resetForm = () => {
  //   setPasswordsMatch(true)
  //   setData({
  //     firstname: "", 
  //     lastname: "", 
  //     username: "", 
  //     email: "", 
  //     password: "", 
  //     confirmpassword: "" 
  //   })
  // }

  return (
    <div className='login'>
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className='login-logo'>Bookface</h3>
          <span className="login-description">
            A book of faces for your browsing pleasure.
          </span>
        </div>
        <div className="login-right">
          <form className="login-box" onSubmit={handleSubmit}>
            <input placeholder="Username" className="login-input" name='username' onChange={handleChange} value={data.username} />
            <input type="email" placeholder="Email" className="login-input" name='email' onChange={handleChange} value={data.email} />
            <input type="password" placeholder="Password" className="login-input" name='password' onChange={handleChange} value={data.password} />
            <input type="password" placeholder="Confirm password" className="login-input" name='confirmpassword' onChange={handleChange} value={data.confirmpassword} />

            <span style={{ display: passwordsMatch ? "none" : "block", color: "red", fontSize: "12px", alignSelf: "flex-end", marginRight: "5px" }}>
            * Passwords do not match
            </span>

            <button className="login-button" type="submit" disabled={loading}>{loading ? 'Loading...' : 'Sign up'}</button>
            <button onClick={() => navigate('/login')} className="login-register-button">Already have an account?</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register 
