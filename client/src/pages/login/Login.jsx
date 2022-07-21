import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logIn } from '../../redux/actions/authAction'
import './login.css'

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(logIn(data))
  }

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
            <input type="email" placeholder="Email" className="login-input" name='email' onChange={handleChange} value={data.email} />
            <input type="password" placeholder="Password" className="login-input" name='password' onChange={handleChange} value={data.password} />
            <button className="login-button" type="submit">Log in</button>
            <span className="login-forgot">Forgot password?</span>
            <button onClick={() => navigate('/register')} className="login-register-button">Create a new account</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
