import { useState } from 'react'
import './register.css'

const Register = () => {
  const [data, setData] = useState({ username: "", email: "", password: "", confirmpassword: "" })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
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
          <div className="login-box">
            <input placeholder="Username" className="login-input" name='username' onChange={handleChange} />
            <input type="email" placeholder="Email" className="login-input" name='email' onChange={handleChange} />
            <input type="password" placeholder="Password" className="login-input" name='password' onChange={handleChange} />
            <input type="password" placeholder="Confirm password" className="login-input" name='confirmpassword' onChange={handleChange} />
            <button className="login-button">Sign up</button>
            <button className="login-register-button">Already have an account?</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register 
